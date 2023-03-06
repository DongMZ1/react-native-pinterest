export type PostCommentType = {
    time: string,
    auther_id: string,
    auther_name: string
    id: string
    content: string,
    location: string,
    auther_image_url: string,
    replys : {
        from_auther_name: string,
        from_auth_id: string,
        time: string,
        content: string,
        id: string
    }[]
}

export type PostType = {
    time: string,
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