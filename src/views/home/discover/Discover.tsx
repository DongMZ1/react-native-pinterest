import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, FlatList, Pressable, ScrollView, NativeSyntheticEvent, NativeScrollEvent, RefreshControl } from 'react-native'
import { HomeRoutesType } from '../../../routes/homeRoutes/homeRoutes';
import { useCallback, useEffect, useState } from 'react';
import { getAllPosts } from '../../../service/postService/postService';
import { debounce } from '../../../utility/helpers/debounce-throttle';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { addPosts, savePost, selectPostsDiscover, setPosts } from '../../../redux/slices/postsSlice';
import { ScaledImage } from '../../../shared/UIComponent/ScaledImage/ScaledImage';
import { StarToSave } from '../../../shared/UIComponent/StarToSave/StarToSave';

export const Discover = () => {
    const route = useRoute<RouteProp<HomeRoutesType, 'Discover'>>()
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const discoverPosts = useAppSelector(selectPostsDiscover)
    const [pageNum, setpageNum] = useState(0)
    const [loadingRefresh, setloadingRefresh] = useState(false)
    useEffect(() => {
        if (discoverPosts.length === 0) {
            //if there is no post on this page, then fetch the first 10 post
            getNextPostsPage()
        }
    }, [])

    //as React will always rerender after data changes, use memeory function to memoried
    const getDebouncedNextPostsPage = useCallback(debounce(() => getNextPostsPage(), 300), [pageNum])
    const getNextPostsPage = async () => {
        try {
            const res = await getAllPosts({ pageNum, type: 'fasion' })
            dispatch(addPosts({ type: 'DiscoverPosts', payload: res }))
            setpageNum(state => state++)
        } catch (e) {
            console.log('Get Posts Fail', e)
        }
    }

    const resetPosts = async () => {
        setloadingRefresh(true)
        const res = await getAllPosts({ pageNum, type: 'fasion' })
        dispatch(setPosts({ type: 'DiscoverPosts', payload: res }))
        setloadingRefresh(false)
    }


    return discoverPosts.length > 0 ? <ScrollView
        onScroll={(e) => {
            if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height > e.nativeEvent.contentSize.height * 0.9) {
                getDebouncedNextPostsPage()
            }
        }}
        contentContainerStyle={{ flexGrow: 1, flexDirection: 'row' }}
        scrollEventThrottle={100}
        refreshControl={<RefreshControl refreshing={loadingRefresh} onRefresh={resetPosts} />}
        style={{ backgroundColor: 'azure' }}
    >
        {[0, 1].map(eachColNumber => 
        <View key={eachColNumber} style={{ width: '50%' }}>{discoverPosts.map((item, key) => {
            //two colume layout by check the divident, rendering the flex row arrangment
            if (key % 2 === eachColNumber) {
                return null
            }
            return <View key={item.id} style={{ borderRadius: 10, backgroundColor: 'white', padding: 4, margin: 4 }}>
                {item.images.length > 0 && <Pressable key={item.id} style={{ width: '100%' }} onPress={() => {
                    navigation.navigate('PostDetail', {post_id: item.id})
                }}><ScaledImage showLoading source={{ uri: item.images[0] }} borderTopLeftRadius={10} borderTopRightRadius={10} /></Pressable>}
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Text onPress={() => navigation.navigate('PostDetail', {post_id: item.id})} numberOfLines={2} style={{ fontSize: 14, paddingHorizontal: 12, paddingTop: 2, width: '100%', paddingBottom: 5, fontFamily: 'Arial' }}>{item.title}</Text>
                    <View style={{ width: '25%', flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                        <ScaledImage source={{ uri: item.auther_image_url }} containerStyle={{width: 25}} style={{borderRadius: 15 }}></ScaledImage>
                    </View>
                    <Text style={{ width: '55%', fontSize: 12, color: 'grey' }} numberOfLines={2}>{item.auther_name}</Text>
                    <StarToSave style={{width: '20%', paddingLeft: 5}} onPress={(saved) => dispatch(savePost({
                        saved,
                        post_id: item.id
                    }))} isSaved={item.collected} />
                </View>
            </View>
            })}
        </View>)}
    </ScrollView> : <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', height: '100%', }}><Text>Loading...</Text></View>
}