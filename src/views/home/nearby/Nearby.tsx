import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Pressable, ScrollView, RefreshControl } from 'react-native'
import { HomeRoutesType } from '../../../routes/homeRoutes/homeRoutes';
import { useCallback, useEffect, useState } from 'react';
import { getAllPosts } from '../../../service/postService/postService';
import { debounce } from '../../../utility/helpers/debounce-throttle';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { addPosts, selectPostsNearby, setPosts } from '../../../redux/slices/postsSlice';
import { ScaledImage } from '../../../shared/UIComponent/ScaledImage/ScaledImage';
import { AntDesign } from '@expo/vector-icons'
import { StarToSave } from '../../../shared/UIComponent/StarToSave/StarToSave';
export const Nearby = () => {
    const dispatch = useAppDispatch()
    const nearbyPosts = useAppSelector(selectPostsNearby)
    const navigation = useNavigation()
    const [pageNum, setpageNum] = useState(0)
    const [loadingRefresh, setloadingRefresh] = useState(false)
    useEffect(() => {
        if (nearbyPosts.length === 0) {
            //if there is no post on this page, then fetch the first 10 post
            getNextPostsPage()
        }
    }, [])

    //as React will always rerender after data changes, use memeory function to memoried
    const getDebouncedNextPostsPage = useCallback(debounce(() => getNextPostsPage(), 300), [pageNum])
    const getNextPostsPage = async () => {
        try {
            const res = await getAllPosts({ pageNum, type: 'nightLife' })
            dispatch(addPosts({ type: 'NearbyPosts', payload: res }))
            setpageNum(state => state++)
        } catch (e) {
            console.log('Get Posts Fail', e)
        }
    }

    const resetPosts = async () => {
        setloadingRefresh(true)
        const res = await getAllPosts({ pageNum, type: 'nightLife' })
        dispatch(setPosts({ type: 'NearbyPosts', payload: res }))
        setloadingRefresh(false)
    }

    const savePost = (saved: boolean, post_id: string) => {
        const newNearbyPosts = nearbyPosts.map(each => {
            return {
                ...each,
                collected: each.id === post_id ? saved : each.collected
            }
        })
        dispatch(setPosts({
            type: 'NearbyPosts',
            payload: newNearbyPosts
        }))
    }


    return nearbyPosts.length > 0 ? <ScrollView
        onScroll={(e) => {
            if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height > e.nativeEvent.contentSize.height * 0.8) {
                getDebouncedNextPostsPage()
            }
        }}
        contentContainerStyle={{ flexGrow: 1, flexDirection: 'row' }}
        scrollEventThrottle={50}
        refreshControl={<RefreshControl refreshing={loadingRefresh} onRefresh={resetPosts} />}
        style={{ backgroundColor: 'azure' }}
    >
        {[0, 1].map(eachColNumber => 
        <View key={eachColNumber} style={{ width: '50%' }}>{nearbyPosts.map((item, key) => {
            //two colume layout by check the divident, rendering the flex row arrangment
            if (key % 2 === eachColNumber) {
                return null
            }
            return <View key={item.id} style={{ borderRadius: 10, backgroundColor: 'white', padding: 4, margin: 4 }}>
                {item.images.length > 0 && <Pressable style={{ width: '100%' }} onPress={() => {
                    navigation.navigate('PostDetail', {post_id: item.id})
                }}><ScaledImage showLoading source={{ uri: item.images[0] }} borderTopLeftRadius={10} borderTopRightRadius={10} /></Pressable>}
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Text onPress={() => {
                        navigation.navigate('PostDetail', {post_id: item.id})
                    }} numberOfLines={2} style={{ fontSize: 14, paddingHorizontal: 12, paddingTop: 2, width: '100%', fontFamily: 'Arial' }}>{item.title}</Text>
                    <View style={{ width: '25%', flexDirection: 'row', alignItems:'center', justifyContent: 'center' }}>
                        <ScaledImage source={{ uri: item.auther_image_url }} containerStyle={{width: 25}} style={{borderRadius: 15 }}></ScaledImage>
                    </View>
                    <Text style={{ width: '55%', fontSize: 12, color: 'grey' }} numberOfLines={2}>{item.distance_from_user} km</Text>
                    <StarToSave style={{width: '20%'}} onPress={(saved) => savePost(saved, item.id)} isSaved={item.collected} />
                </View>
            </View>
            })}
        </View>)}
    </ScrollView> : <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', height: '100%', }}><Text>Loading...</Text></View>
}