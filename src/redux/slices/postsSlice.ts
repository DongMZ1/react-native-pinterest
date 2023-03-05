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
    },
})

export const { addPosts, setPosts } = postsSlice.actions
export const selectPostsDiscover = (state :RootState) => state.postsSlice.discoverPosts
export const selectPostsNearby = (state: RootState) => state.postsSlice.nearbyPosts
export default postsSlice.reducer