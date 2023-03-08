import {View} from 'react-native'
import {useState} from 'react'
import { PostCommentType } from '../../../../types/posts'
export type LoadMorePropsType<T> = {
    items: T[]
    renderItem : (item : T) => JSX.Element,
}
export const LoadMore = <T,>({items, renderItem}: LoadMorePropsType<T>) => {
    return <View></View>
}
