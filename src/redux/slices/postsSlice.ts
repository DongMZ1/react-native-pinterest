import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { PostType } from '../../types/posts'

type PostsSliceInitialStateType = {
    discoverPosts : PostType[],
    nearbyPosts: PostType[],
}

const PostsSliceInitialState : PostsSliceInitialStateType  = {
    discoverPosts : [],
    nearbyPosts: [],
}
export const postsSlice = createSlice({
    name: 'posts',
    initialState: PostsSliceInitialState,
    reducers: {
        addPosts: (state, action: PayloadAction<{type: 'DiscoverPosts' | 'NearbyPosts', payload: PostType[]}>) => {
            if(action.payload.type === 'DiscoverPosts'){
                state.discoverPosts = [...state.discoverPosts, ...action.payload.payload]
            }
            if(action.payload.type === 'NearbyPosts'){
                state.nearbyPosts = [...state.nearbyPosts, ...action.payload.payload]
            }
        },
        setPosts: (state, action: PayloadAction<{type: 'DiscoverPosts' | 'NearbyPosts', payload: PostType[]}>) => {
            if(action.payload.type === 'DiscoverPosts'){
                state.discoverPosts = action.payload.payload
            }
            if(action.payload.type === 'NearbyPosts'){
                state.nearbyPosts = action.payload.payload
            }
        },
        savePost: (state, action: PayloadAction<{saved: boolean, post_id: string}>) => {
            const {saved, post_id} = action.payload
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
        }
    },
})

export const { addPosts, setPosts, savePost } = postsSlice.actions
export const selectPostsDiscover = (state :RootState) => state.postsSlice.discoverPosts
export const selectPostsNearby = (state: RootState) => state.postsSlice.nearbyPosts
export default postsSlice.reducer