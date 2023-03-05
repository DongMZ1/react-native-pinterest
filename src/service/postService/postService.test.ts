import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllPosts } from "./postService";

beforeAll(async () => {
    //some login here to get api token
})

describe('Posts Services', () => {
    it('Can Get All Posts', async () => {
        const posts = await getAllPosts({ type:'fasion', pageNum: 0 })
        expect(posts.length).toBeGreaterThan(0)
    })
})