import { faker } from "@faker-js/faker";
import { getAllPostsApi } from "../../api/postAPI"
import { v4 as uuidv4 } from 'uuid';
export const getAllPosts = async ({ pageNum, filter, type }: { pageNum: number; filter?: { key: string; value: string; }[] | undefined; type: 'fasion' | 'nightLife'}) => {
    const res = await getAllPostsApi({ pageNum, filter, type })
    return res
}

export const createPost = async ({title, content, images}: {
    title: string,
    content: string,
    images: string[]
}) => {
    const post = {
        title: title,
        date: faker.date.recent(),
        content: content,
        images,
        id: uuidv4(),
        auther_name: faker.name.fullName(),
        auther_id: uuidv4(),
        auther_image_url: faker.image.people(500, 500, true),
        location: faker.address.city(),
        collected: false,
        distance_from_user: Math.trunc(Math.random() * 100),
        comments: []
    }
}

