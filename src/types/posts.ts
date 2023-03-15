export type PostCommentReplyType = {
    time: string,
    auther_id: string,
    auther_name: string
    id: string
    content: string,
    location: string,
    auther_image_url: string,
    like_count: number,
    is_liked: boolean,
    reply_to_auther_name?: string
}
export type PostCommentType = {
    time: string,
    auther_id: string,
    auther_name: string
    id: string
    content: string,
    location: string,
    auther_image_url: string,
    like_count: number,
    is_liked: boolean,
    replys: PostCommentReplyType[]
}

export type PostType = {
    date: Date,
    auther_name: string,
    title: string,
    content: string,
    images: string[]
    id: string,
    auther_id: string,
    auther_image_url: string,
    collected: boolean,
    comments: PostCommentType[],
    distance_from_user: number,
    location: string
}