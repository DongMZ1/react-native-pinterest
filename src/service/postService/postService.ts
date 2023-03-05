import { getAllPostsApi } from "../../api/postAPI"

export const getAllPosts = async ({ pageNum, filter, type }: { pageNum: number; filter?: { key: string; value: string; }[] | undefined; type: 'fasion' | 'nightLife'}) => {
    const res = await getAllPostsApi({ pageNum, filter, type })
    return res
}