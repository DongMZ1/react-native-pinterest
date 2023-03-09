import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { AppRoutesType } from "../../routes"
import { Pressable, ScrollView, View, Text, TextInput, KeyboardAvoidingView, Animated } from "react-native"
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { addPostComment, savePost, selectPostsDiscover, selectPostsNearby, setCommentIsLiked, setPosts } from "../../redux/slices/postsSlice";
import { Carousel } from "../../shared/UIComponent/Carousel/Carousel";
import { ScaledImage } from "../../shared/UIComponent/ScaledImage/ScaledImage";
import { StarToSave } from "../../shared/UIComponent/StarToSave/StarToSave";
import { useEffect, useRef, useState } from "react";
import { useSwipe } from "../../utility/hooks/useSwipe";
import AntIcon from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import useIsFirstRender from "../../utility/hooks/useIsFirstRendering";
import { faker } from "@faker-js/faker";
import { selectKeyboard, selectSafeAreaViewDimension } from "../../redux/slices/utilitySlice";
import produce from "immer"
import { PostCommentType, PostType } from "../../types/posts";
import { WritableDraft } from "immer/dist/internal";
import { LoadMore } from "./component/LoadMore/LoadMore";

export const PostDetail = () => {
    const id = useRoute<RouteProp<AppRoutesType, "PostDetail">>().params.post_id
    const navigation = useNavigation()
    const dispatch = useAppDispatch()
    const discoverPosts = useAppSelector(selectPostsDiscover)
    const nearbyPosts = useAppSelector(selectPostsNearby)
    const headerHeight = 60
    const footerHeight = 50
    const keyboardHeight = useAppSelector(selectKeyboard).keyboardheight
    const scrollHeight = 763 - keyboardHeight - headerHeight - footerHeight
    const currentScrollHeight = useRef(new Animated.Value(scrollHeight)).current
    const selectedPost = [...discoverPosts, ...nearbyPosts].find(each => each.id === id)
    const { onTouchStart, onTouchEnd } = useSwipe(undefined, () => navigation.goBack(), 5)
    const [commentsDisplayIndex, setcommentsDisplayIndex] = useState(10)
    const [commentID, setcommentID] = useState('')
    const [replyID, setreplyID] = useState('')

    const [postComment, setpostComment] = useState('')
    const textInputRef = useRef<TextInput>(null)

    useEffect(() => {
        Animated.timing(currentScrollHeight, { toValue: scrollHeight, useNativeDriver: false, duration: 150 }).start()
    }, [scrollHeight])

    const addPostCommentContent = () => {
        if (postComment) {
            dispatch(addPostComment({
                post_id: selectedPost?.id!,
                comment_content: postComment
            }))
        }
        setcommentID('')
        setpostComment('')
        textInputRef.current?.blur()
    }

    const flipCommentLike = (isLike: boolean, commentID: string) => {
        if (commentID) {
            dispatch(setCommentIsLiked({
                is_liked: isLike,
                post_id: selectedPost?.id!,
                comment_id: commentID
            }))
        }
    }
    return <View style={{ flex: 1 }} onLayout={event => {
        const { width, height } = event.nativeEvent.layout;
        console.log(width, height)
    }}>
        <View style={{ width: '100%', height: headerHeight, flexDirection: 'row' }}>
            <Pressable onPress={() => navigation.goBack()} style={{ width: '15%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <AntIcon name="back" size={24} color="black" />
            </Pressable>
            <View style={{ width: '10%', flexDirection: 'row', alignItems: 'center' }}>
                <ScaledImage source={{ uri: selectedPost?.auther_image_url }} containerStyle={{ width: 30 }} style={{ borderRadius: 15 }}></ScaledImage>
            </View>
            <View style={{ width: '55%', flexDirection: 'column', justifyContent: 'center' }} >
                <Text style={{ fontSize: 14 }}>{selectedPost?.auther_name}</Text>
                <Text style={{ fontSize: 12, color: 'grey' }}><Entypo name="location-pin" size={14} color="grey" />{selectedPost?.location}</Text>
            </View>
            <View style={{ width: '20%', flexDirection: 'row', alignItems: 'center' }}><StarToSave size={25} onPress={(saved) => dispatch(savePost({
                saved,
                post_id: selectedPost?.id!
            }))} isSaved={selectedPost?.collected ? true : false} /></View>
        </View>
        <Animated.View style={{ height: currentScrollHeight }}>
            <ScrollView
                onScroll={(e) => {
                    if (e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height > e.nativeEvent.contentSize.height * 0.9) {
                        if (selectedPost?.comments.length && commentsDisplayIndex < selectedPost?.comments.length) {
                            setcommentsDisplayIndex(state => state + 10)
                        }
                    }
                }}
                scrollEventThrottle={20}
                scrollEnabled
                style={{ flex: 1 }}>
                {
                    selectedPost && <View><Carousel images={selectedPost.images} /></View>
                }
                <View style={{ paddingHorizontal: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: '600', paddingVertical: 15 }}>{selectedPost?.title}</Text>
                    <Text style={{ fontSize: 14, }}>{selectedPost?.content}</Text>
                    <Text style={{ fontSize: 12, paddingVertical: 15, color: 'grey' }}>Edit : {selectedPost?.time}</Text>
                    <View style={{ height: 1, backgroundColor: 'lightgray', marginBottom: 15 }}></View>
                    <Pressable onPress={() => {
                        textInputRef.current?.focus()
                    }} style={{ height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, backgroundColor: 'lavenderblush', borderRadius: 15, width: '100%', marginTop: 5 }}><Text style={{ color: 'lightgrey' }}>Share Your Opinion</Text></Pressable>
                </View>
                <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    {
                        selectedPost?.comments.slice(0, commentsDisplayIndex).map(eachComm => <View key={eachComm.id} style={{ flexDirection: 'row', paddingHorizontal: 15, flexWrap: 'wrap', borderBottomWidth: 1, borderBottomColor: 'lightcyan', }}>
                            <View style={{ width: '15%', flexDirection: 'row', alignItems: 'center' }}>
                                <ScaledImage source={{ uri: eachComm?.auther_image_url }} containerStyle={{ width: 30 }} style={{ borderRadius: 15 }}></ScaledImage>
                            </View>
                            <View style={{ width: '85%', paddingVertical: 15, flexDirection: 'row' }} >
                                <Pressable onPress={() => {
                                    setcommentID(eachComm.id);
                                    textInputRef.current?.focus()
                                }} style={{ width: '90%' }}>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>{eachComm?.auther_name}</Text>
                                    <Text style={{ fontSize: 14, paddingVertical: 5 }}>{eachComm?.content}</Text>
                                    <Text style={{ fontSize: 12, color: 'grey' }}>{eachComm.time} <Entypo name="location-pin" size={14} color="grey" />{eachComm?.location}</Text>
                                </Pressable>
                                <View style={{ width: '10%', flexDirection: 'column', alignItems: 'center', paddingTop: 10 }}>
                                    <StarToSave onPress={v => flipCommentLike(v, eachComm.id)} type="heart" isSaved={eachComm.is_liked} size={15} />
                                    {eachComm.like_count > 0 ? <Text style={{ fontSize: 10, marginTop: 10, color: eachComm.is_liked ? 'red' : 'grey' }}>{eachComm.like_count}</Text> : null}
                                </View>
                            </View>
                            <LoadMore style={{ width: '100%', paddingLeft: '15%' }} items={eachComm.replys} renderItem={reply => <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '15%', flexDirection: 'row', alignItems: 'center' }}>
                                    <ScaledImage source={{ uri: reply?.auther_image_url }} containerStyle={{ width: 30 }} style={{ borderRadius: 15 }}></ScaledImage>
                                </View>
                                <View style={{ width: '85%', paddingVertical: 15, flexDirection: 'row' }} >
                                    <Pressable onPress={() => {
                                        setcommentID(eachComm.id);
                                        setreplyID(reply.id)
                                        textInputRef.current?.focus()
                                    }} style={{ width: '90%' }}>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>{reply?.auther_name}</Text>
                                        <Text style={{ fontSize: 14, paddingVertical: 5 }}>{reply?.content}</Text>
                                        <Text style={{ fontSize: 12, color: 'grey' }}>{reply.time} <Entypo name="location-pin" size={14} color="grey" />{reply?.location}</Text>
                                    </Pressable>
                                    <View style={{ width: '10%', flexDirection: 'column', alignItems: 'center', paddingTop: 10 }}>
                                        <StarToSave onPress={(v) => { }} type="heart" isSaved={reply.is_liked} size={15} />
                                        {reply.like_count > 0 ? <Text style={{ fontSize: 10, marginTop: 10, color: reply.is_liked ? 'red' : 'grey' }}>{reply.like_count}</Text> : null}
                                    </View>
                                </View>
                            </View>} />
                        </View >)

                    }
                </View>
                {
                    selectedPost?.comments.length as number <= commentsDisplayIndex ? <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', paddingVertical: 30 }}><Text style={{ fontSize: 10, color: 'grey' }}>-- THE END --</Text></View> : null
                }
            </ScrollView >
        </Animated.View>
        <View style={{ height: footerHeight, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row' }}>
            <TextInput
                onBlur={() => {
                    setcommentID('')
                    setreplyID('')
                }}
                ref={textInputRef} placeholder={commentID ? replyID ? `Reply @${selectedPost?.comments.find(each => each.id === commentID)?.replys.find(eachReply => eachReply.id === replyID)?.auther_name}` : `Reply @${selectedPost?.comments.find(each => each.id === commentID)?.auther_name}` : "Share Your Opinion"}
                value={postComment}
                onChangeText={v => setpostComment(v)}
                style={{ backgroundColor: 'lavenderblush', borderRadius: 15, height: '100%', flex: 1, paddingHorizontal: 15 }} />
            <Pressable onPress={() => addPostCommentContent()} style={{ flex: 0.2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Feather color={'grey'} name="send" size={25}></Feather></Pressable>
        </View>
    </View>
}