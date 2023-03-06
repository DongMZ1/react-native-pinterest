import { faker } from "@faker-js/faker"
import { PostType } from "../types/posts"
export const getAllPostsApi = async ({ pageNum, type, filter }: { pageNum: number, filter?: { key: string, value: string }[], type: 'fasion' | 'nightLife' }): Promise<PostType[]> => {
    let queryString = new URLSearchParams()
    if (filter && filter.length) {
        filter.map(f => {
            queryString.append(f.key, f.value)
        })
    }
    await new Promise(r => setTimeout(r, 300))
    const posts: PostType[] = new Array(10).fill("").map(each => {
        return {
            title: faker.commerce.productName(),
            time: faker.date.recent(20).toDateString(),
            content: faker.lorem.sentences(30),
            images: new Array(10).fill("").map(each => type === 'fasion' ? faker.image.fashion(480, 640, true) : faker.image.nightlife(480, 640, true)),
            id: faker.random.alpha(20),
            auther_name: faker.name.fullName(),
            auther_id: faker.random.alpha(20),
            auther_image_url: faker.image.people(500, 500, true),
            location: faker.address.city(),
            collected: false,
            distance_from_user: Math.trunc(Math.random() * 100),
            comments: new Array(Math.floor(Math.random() * 100)).fill("").map(e => {
                return {
                    time: faker.date.recent(10).toDateString(),
                    auther_id: faker.random.alpha(20),
                    auther_name: faker.name.fullName(),
                    id: faker.random.alpha(20),
                    content: faker.lorem.sentences(1),
                    location: faker.address.cityName(),
                    like_count: Math.floor(Math.random() * 1000),
                    is_liked: false,
                    auther_image_url: faker.image.people(500, 500, true),
                    replys: []
                }
            })
        }
    })
    return posts
}