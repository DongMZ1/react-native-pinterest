import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useRef, useState } from "react"
import { Keyboard, Pressable, ScrollView, TextInput, TouchableWithoutFeedback, View, Text, ActivityIndicator, RefreshControl } from "react-native"
import AntIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import OutsidePressHandler from 'react-native-outside-press';
import { AppRoutesType } from "../../routes"
import { useAppSelector } from "../../redux/store"
import { selectSafeAreaViewDimension } from "../../redux/slices/utilitySlice"
import { ScaledImage } from "../../shared/UIComponent/ScaledImage/ScaledImage"
import { StarToSave } from "../../shared/UIComponent/StarToSave/StarToSave"
import { useDispatch } from "react-redux"
import { savePost, selectPostsDiscover, selectPostsNearby } from "../../redux/slices/postsSlice"
import { PostType } from "../../types/posts"

type filterType = 'SAVED' | 'ALL'
type sortType = 'NONE' | 'Number OF REPLIES' | 'TIME'
export const SearchDisplay = () => {
    const navigation = useNavigation()
    const routes = useRoute<RouteProp<AppRoutesType, 'Search'>>()
    const dispatch = useDispatch();
    const allPosts = [...useAppSelector(selectPostsDiscover), ...useAppSelector(selectPostsNearby)]
    const screenWidth = useAppSelector(selectSafeAreaViewDimension).width
    const [content, setcontent] = useState('')
    const [loading, setloading] = useState(true)
    const [newContent, setnewContent] = useState('')
    const [filter, setfilter] = useState<filterType>('ALL')
    const [sort, setsort] = useState<sortType>('NONE')
    const [showSort, setshowSort] = useState(false)
    const [showFilter, setshowFilter] = useState(false)
    const [numberOfRenderItems, setnumberOfRenderItems] = useState(10);
    const allPostsDisplay = filterSearchItems({
        items: allPosts,
        sort,
        filter,
        renderItemsLength: numberOfRenderItems
    })

    useEffect(() => {
        handleFilterChange()
    }, [filter, sort, content])

    const handleFilterChange = async () => {
        setloading(true)
        await new Promise(r => setTimeout(r, 1000))
        setloading(false)
    }
    return <>
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', paddingVertical: 10 }}>
                <Pressable onPress={() => navigation.goBack()} style={{ width: '15%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntIcon name="back" size={24} color="black" />
                </Pressable>
                <View style={{ flex: 1, height: 40, backgroundColor: 'lavenderblush', borderRadius: 40, paddingHorizontal: 15, marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        placeholder={"Search"}
                        value={newContent}
                        blurOnSubmit
                        onBlur={() => {
                            setnewContent(content)
                        }}
                        keyboardType="web-search"
                        onSubmitEditing={(e) => {
                            setcontent(newContent)
                        }}
                        style={{ flex: 1 }}
                        onChangeText={v => setnewContent(v)}
                    />
                    {content.length > 0 ? <Pressable onPress={() => {
                        setcontent('')
                        setnewContent('')
                    }}><Entypo name="cross" size={25} /></Pressable> : null}
                </View>
                <OutsidePressHandler style={{ width: '100%' }} onOutsidePress={() => {
                    setshowFilter(false)
                    setshowSort(false)
                }} disabled={false}>
                    <View style={{ height: 40, paddingTop: 10, width: '100%', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                        <Pressable
                            onPress={() => {
                                setshowSort(false)
                                setshowFilter(state => !state)
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', width: 90, paddingRight: 20 }}><Text style={{ color: filter === 'SAVED' ? 'red' : 'grey' }}>Filter</Text><MaterialIcon size={20} name={filter === 'SAVED' ? "filter-check" : "filter"} color={filter === 'SAVED' ? 'red' : 'grey'}></MaterialIcon></Pressable>
                        <Pressable onPress={() => {
                            setshowFilter(false)
                            setshowSort(state => !state);
                        }} style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: sort !== 'NONE' ? 'red' : 'grey' }}>{sort === 'NONE' ? 'Sort By' : sort.replace('_', " ")}</Text><FontAwesomeIcon style={{ marginLeft: 5 }} size={20} color={sort === 'NONE' ? 'grey' : 'red'} name="sort"></FontAwesomeIcon></Pressable>
                    </View>
                    {showFilter &&
                        <View style={{ width: screenWidth, height: 100, backgroundColor: 'white' }}>
                            <Pressable onPress={() => setfilter('SAVED')} style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}><Text style={{ color: 'grey' }}>SAVED POSTS</Text>{filter === 'SAVED' && <AntIcon name='check' size={20} style={{ marginLeft: 'auto' }} color={'grey'} />}</Pressable>
                            <Pressable onPress={() => setfilter('ALL')} style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}><Text style={{ color: 'grey' }}>ALL POSTS</Text>
                                {filter === 'ALL' && <AntIcon name='check' size={20} style={{ marginLeft: 'auto' }} color={'grey'} />}
                            </Pressable>
                        </View>
                    }
                    {
                        showSort && ['NONE', 'NUMBER OF REPLIES', 'TIME'].map(each => <View key={each} style={{ width: screenWidth, height: 50, backgroundColor: 'white' }}>
                            <Pressable onPress={() => {
                                setsort(each as sortType)
                            }} style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                                <Text style={{ color: 'grey' }}>{each}</Text>
                                {sort === each && <AntIcon name='check' size={20} style={{ marginLeft: 'auto' }} color={'grey'} />}
                            </Pressable>
                        </View>
                        )
                    }
                </OutsidePressHandler>
            </View>
            {loading ? <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1, }}><ActivityIndicator /></View> : <ScrollView
                onScroll={(e) => {
                    if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height > e.nativeEvent.contentSize.height * 0.9) {

                    }
                }}
                contentContainerStyle={{ flexGrow: 1, flexDirection: 'row' }}
                scrollEventThrottle={100}
                style={{ backgroundColor: 'azure' }}
            >
                {[0, 1].map(eachColNumber =>
                    <View key={eachColNumber} style={{ width: '50%' }}>{allPostsDisplay.map((item, key) => {
                        //two colume layout by check the divident, rendering the flex row arrangment
                        if (key % 2 === eachColNumber) {
                            return null
                        }
                        return <View key={item.id} style={{ borderRadius: 10, backgroundColor: 'white', padding: 4, margin: 4 }}>
                            {item.images.length > 0 && <Pressable key={item.id} style={{ width: '100%' }} onPress={() => {
                                navigation.navigate('PostDetail', { post_id: item.id })
                            }}><ScaledImage showLoading source={{ uri: item.images[0] }} borderTopLeftRadius={10} borderTopRightRadius={10} /></Pressable>}
                            <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Text onPress={() => navigation.navigate('PostDetail', { post_id: item.id })} numberOfLines={2} style={{ fontSize: 14, paddingHorizontal: 12, paddingTop: 2, width: '100%', paddingBottom: 5, fontFamily: 'Arial' }}>{item.title}</Text>
                                <View style={{ width: '25%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <ScaledImage source={{ uri: item.auther_image_url }} containerStyle={{ width: 25 }} style={{ borderRadius: 15 }}></ScaledImage>
                                </View>
                                <Text style={{ width: '55%', fontSize: 12, color: 'grey' }} numberOfLines={2}>{item.auther_name}</Text>
                                <StarToSave style={{ width: '20%', paddingLeft: 5 }} onPress={(saved) => dispatch(savePost({
                                    saved,
                                    post_id: item.id
                                }))} isSaved={item.collected} />
                            </View>
                        </View>
                    })}
                    </View>)}
            </ScrollView>}
        </View>
    </>
}

type FilterSearchItemsPropsType = {
     items: PostType[],
     sort: sortType,
     filter: filterType,
     renderItemsLength: number
}

const filterSearchItems = ({
    items,
    sort,
    filter,
    renderItemsLength
} : FilterSearchItemsPropsType) => {
    if(sort === 'Number OF REPLIES'){
        items = items.sort((a, b) => b.comments.length - a.comments.length)
    }
    if(sort === 'TIME'){
        items = items.sort((a, b) =>  b.time > a.time ? 1 : -1)
    }
    if(filter === 'SAVED'){
        items = items.filter(each => each.collected)
    }
    return items.slice(0, renderItemsLength)
}