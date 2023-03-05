import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { AntDesign } from '@expo/vector-icons';
import { AppRoutesType } from "../../routes"
import { Pressable, ScrollView, View, Text, TextInput, KeyboardAvoidingView } from "react-native"
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectPostsDiscover, selectPostsNearby, setPosts } from "../../redux/slices/postsSlice";
import { Carousel } from "../../shared/UIComponent/Carousel/Carousel";
import { ScaledImage } from "../../shared/UIComponent/ScaledImage/ScaledImage";
import { StarToSave } from "../../shared/UIComponent/StarToSave/StarToSave";
import { Entypo } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import { useSwipe } from "../../utility/hooks/useSwipe";


export const PostDetail = () => {
    const id = useRoute<RouteProp<AppRoutesType, "PostDetail">>().params.post_id
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const discoverPosts = useAppSelector(selectPostsDiscover)
    const nearbyPosts = useAppSelector(selectPostsNearby)
    const selectedPost = [...discoverPosts, ...nearbyPosts].find(each => each.id === id)
    const { onTouchStart, onTouchEnd } = useSwipe(undefined, () => navigation.goBack(), 5)

    const [postComment, setpostComment] = useState('')
    const [isFocusKeyboardAvoidView, setisFocusKeyboardAvoidView] = useState(false)
    const textInputRef = useRef<TextInput>(null)

    useEffect(() => {
        if(isFocusKeyboardAvoidView){
            textInputRef.current?.focus()
        }
    }, [isFocusKeyboardAvoidView])

    const savePost = (saved: boolean) => {
        if (discoverPosts.find(each => each.id === id)) {
            const newDiscoverPosts = discoverPosts.map(each => {
                return {
                    ...each,
                    collected: each.id === id ? saved : each.collected
                }
            })
            dispatch(setPosts({
                type: 'DiscoverPosts',
                payload: newDiscoverPosts
            }))
            return
        }
        if (nearbyPosts.find(each => each.id === id)) {
            const newNearbyPosts = nearbyPosts.map(each => {
                return {
                    ...each,
                    collected: each.id === id ? saved : each.collected
                }
            })
            dispatch(setPosts({
                type: 'NearbyPosts',
                payload: newNearbyPosts
            }))
            return
        }
    }
    return <>
        <View style={{ width: '100%', height: 60, flexDirection: 'row' }}>
            <Pressable onPress={() => navigation.goBack()} style={{ width: '15%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <AntDesign name="back" size={24} color="black" />
            </Pressable>
            <View style={{ width: '10%', flexDirection: 'row', alignItems: 'center' }}>
                <ScaledImage source={{ uri: selectedPost?.auther_image_url }} containerStyle={{ width: 30 }} style={{ borderRadius: 15 }}></ScaledImage>
            </View>
            <View style={{ width: '55%', flexDirection: 'column', justifyContent: 'center' }} >
                <Text style={{ fontSize: 14 }}>{selectedPost?.auther_name}</Text>
                <Text style={{ fontSize: 12, color: 'grey' }}><Entypo name="location-pin" size={14} color="grey" />{selectedPost?.location}</Text>
            </View>
            <View style={{ width: '20%', flexDirection: 'row', alignItems: 'center' }}><StarToSave size={25} onPress={(saved) => savePost(saved)} isSaved={selectedPost?.collected ? true : false} /></View>
        </View>
        <ScrollView scrollEnabled style={{ flex: 1 }}>
            {
                selectedPost && <View><Carousel images={selectedPost.images} /></View>
            }
            <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{paddingHorizontal: 15}}>
                <Text style={{ fontSize: 20, fontWeight: '600', paddingVertical: 15 }}>{selectedPost?.title}</Text>
                <Text style={{ fontSize: 14,}}>{selectedPost?.content}</Text>
                <Text style={{ fontSize: 12, paddingVertical: 15, color: 'grey' }}>Edit : {selectedPost?.time}</Text>
                <View style={{height: 1, backgroundColor: 'lightgray', marginBottom: 15}}></View>
                <Pressable onPress={() => {
                    setisFocusKeyboardAvoidView(true)
                }} style={{height: 40, flexDirection:'row', alignItems:'center', paddingHorizontal: 15, backgroundColor:'lavenderblush', borderRadius: 15, width: '100%', marginTop: 5}}><Text style={{color: 'lightgrey'}}>Share Your Opinion</Text></Pressable>
            </View>
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50}>
            <View style={{ height: 40, paddingHorizontal: 10, paddingTop: 3, flexDirection: 'row'}}>
                <TextInput 
                onFocus={() => setisFocusKeyboardAvoidView(true)} 
                onBlur={() => setisFocusKeyboardAvoidView(false)} 
                ref={textInputRef} placeholder="Share Your Opinion" 
                value={postComment} 
                onChangeText={v => setpostComment(v)} 
                style={{ backgroundColor:'lavenderblush', borderRadius: 15, height: '100%', flex: 1, paddingHorizontal: 15 }} />
                <View style={{flex: 0.2}}></View>
            </View>
        </KeyboardAvoidingView>
    </>
}