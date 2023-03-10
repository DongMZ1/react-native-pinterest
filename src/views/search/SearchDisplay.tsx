import { useNavigation } from "@react-navigation/native"
import { Pressable, View } from "react-native"
import AntIcon from 'react-native-vector-icons/AntDesign'
export const SearchDisplay = () => {
    const navigation = useNavigation()
    return <>
       <View style={{ width: '100%', height: 60, flexDirection: 'row' }}>
            <Pressable onPress={() => navigation.goBack()} style={{ width: '15%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <AntIcon name="back" size={24} color="black" />
            </Pressable>
        </View>
    </>
}