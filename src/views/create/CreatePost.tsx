import { useNavigation } from '@react-navigation/native'
import {Pressable, View} from 'react-native'
export const CreatePost = () => {
    const navigation = useNavigation()
    return <Pressable onPress={() => navigation.goBack()} style={{backgroundColor: 'red', flex: 1}}>
    </Pressable>
}