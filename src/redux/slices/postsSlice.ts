import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { PostCommentReplyType, PostCommentType, PostType } from '../../types/posts'
import { faker } from '@faker-js/faker'
import produce from "immer"
import { WritableDraft } from 'immer/dist/internal'

type PostsSliceInitialStateType = {
    discoverPosts: PostType[],
    nearbyPosts: PostType[],
}

const PostsSliceInitialState: PostsSliceInitialStateType = {
    discoverPosts: [],
    nearbyPosts: [],
}
export const postsSlice = createSlice({
    name: 'posts',
    initialState: PostsSliceInitialState,
    reducers: {
        addPosts: (state, action: PayloadAction<{ type: 'DiscoverPosts' | 'NearbyPosts', payload: PostType[] }>) => {
            if (action.payload.type === 'DiscoverPosts') {
                state.discoverPosts = [...state.discoverPosts, ...action.payload.payload]
            }
            if (action.payload.type === 'NearbyPosts') {
                state.nearbyPosts = [...state.nearbyPosts, ...action.payload.payload]
            }
        },
        setPosts: (state, action: PayloadAction<{ type: 'DiscoverPosts' | 'NearbyPosts', payload: PostType[] }>) => {
            if (action.payload.type === 'DiscoverPosts') {
                state.discoverPosts = action.payload.payload
            }
            if (action.payload.type === 'NearbyPosts') {
                state.nearbyPosts = action.payload.payload
            }
        },
        savePost: (state, action: PayloadAction<{ saved: boolean, post_id: string }>) => {
            const { saved, post_id } = action.payload
            if (state.discoverPosts.find(each => each.id === post_id)) {
                state.discoverPosts = state.discoverPosts.map(each => {
                    return {
                        ...each,
                        collected: each.id === post_id ? saved : each.collected
                    }
                })
                return
            }
            if (state.nearbyPosts.find(each => each.id === post_id)) {
                state.nearbyPosts = state.nearbyPosts.map(each => {
                    return {
                        ...each,
                        collected: each.id === post_id ? saved : each.collected
                    }
                })
                return
            }
        },
        addPostComment: (state, action: PayloadAction<{ post_id: string, comment_content: string }>) => {
            const { post_id, comment_content } = action.payload
            if (state.discoverPosts.find(each => each.id === post_id)) {
                state.discoverPosts = produce(state.discoverPosts, draft => {
                    const post = draft.find(each => each.id === post_id) as PostType
                    post.comments = [{
                        time: faker.date.recent().toDateString(),
                        auther_id: 'you',
                        auther_name: 'react-nativer ( yourself )',
                        id: faker.random.alpha(20) + comment_content,
                        content: comment_content,
                        location: 'vancouver',
                        like_count: 0,
                        is_liked: false,
                        auther_image_url: faker.image.people(500, 500, false),
                        replys: []
                    }, ...post.comments]
                })
            }
            if (state.nearbyPosts.find(each => each.id === post_id)) {
                state.nearbyPosts = produce(state.nearbyPosts, draft => {
                    const post = draft.find(each => each.id === post_id) as PostType
                    post.comments = [{
                        time: faker.date.recent().toDateString(),
                        auther_id: 'you',
                        auther_name: 'react-nativer ( yourself )',
                        id: faker.random.alpha(20) + comment_content,
                        content: comment_content,
                        location: 'vancouver',
                        like_count: 0,
                        is_liked: false,
                        auther_image_url: faker.image.people(500, 500, false),
                        replys: []
                    }, ...post.comments]
                })
            }
        },
        setCommentIsLiked : (state, action: PayloadAction<{ post_id: string, comment_id: string, is_liked: boolean }>) => {
            const {post_id, comment_id, is_liked} = action.payload
            if (state.discoverPosts.find(each => each.id === post_id)) {
                state.discoverPosts = produce(state.discoverPosts, draft => {
                    const post = draft.find(each => each.id === post_id);
                    const comment = post?.comments.find(eachComment => eachComment.id === comment_id) as WritableDraft<PostCommentType>
                    comment.is_liked = !comment.is_liked
                    if (is_liked) {
                        comment.like_count++
                    } else {
                        comment.like_count--
                    }
                })
            }
            if (state.nearbyPosts.find(each => each.id === post_id)) {
                state.nearbyPosts = produce(state.nearbyPosts, draft => {
                    const post = draft.find(each => each.id === post_id);
                    const comment = post?.comments.find(eachComment => eachComment.id === comment_id) as WritableDraft<PostCommentType>
                    comment.is_liked = !comment.is_liked
                    if (is_liked) {
                        comment.like_count++
                    } else {
                        comment.like_count--
                    }
                })
            }
        },
        setCommentReplyIsLiked : (state, action: PayloadAction<{ post_id: string, comment_id: string, reply_id: string, is_liked: boolean }>) => {
            const {post_id, comment_id, is_liked, reply_id} = action.payload
            if (state.discoverPosts.find(each => each.id === post_id)) {
                state.discoverPosts = produce(state.discoverPosts, draft => {
                    const post = draft.find(each => each.id === post_id);
                    const comment = post?.comments.find(eachComment => eachComment.id === comment_id) as WritableDraft<PostCommentType>
                    const reply = comment.replys.find(each => each.id === reply_id) as WritableDraft<PostCommentReplyType>
                    reply.is_liked = !reply.is_liked
                    if (is_liked) {
                        reply.like_count++
                    } else {
                        reply.like_count--
                    }
                })
            }
            if (state.nearbyPosts.find(each => each.id === post_id)) {
                state.nearbyPosts = produce(state.nearbyPosts, draft => {
                    const post = draft.find(each => each.id === post_id);
                    const comment = post?.comments.find(eachComment => eachComment.id === comment_id) as WritableDraft<PostCommentType>
                    comment.is_liked = !comment.is_liked
                    const reply = comment.replys.find(each => each.id === reply_id) as WritableDraft<PostCommentReplyType>
                    reply.is_liked = !reply.is_liked
                    if (is_liked) {
                        reply.like_count++
                    } else {
                        reply.like_count--
                    }
                })
            }
        }
    },
})

export const { addPosts, setPosts, savePost, addPostComment, setCommentIsLiked, setCommentReplyIsLiked } = postsSlice.actions
export const selectPostsDiscover = (state: RootState) => state.postsSlice.discoverPosts
export const selectPostsNearby = (state: RootState) => state.postsSlice.nearbyPosts
export default postsSlice.reducer