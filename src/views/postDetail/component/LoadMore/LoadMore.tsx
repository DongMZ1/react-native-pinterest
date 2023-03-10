import { StyleProp, View, ViewStyle, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { PostCommentType } from '../../../../types/posts'
export type LoadMorePropsType<T> = {
    items: T[]
    renderItem: (item: T) => JSX.Element,
    style: StyleProp<ViewStyle>
}
export const LoadMore = <T,>({ items, renderItem, style }: LoadMorePropsType<T>) => {
    const [showAll, setshowAll] = useState(false)
    if (items.length === 0) {
        return null
    }
    return <View style={style}>

        {
            showAll ? items.map(each => renderItem(each)) : <>
                {renderItem(items[0])}
                {items.length > 1 ? <Pressable onPress={() => setshowAll(true)} style={{ paddingVertical: 5 }}><Text style={{fontSize: 12, color: 'grey'}}>Load {items.length - 1} More Replies</Text></Pressable> : null}
            </>
        }
    </View>
}
