import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { Pressable, TextInput, View } from "react-native"
import AntIcon from 'react-native-vector-icons/AntDesign'
export const SearchDisplay = () => {
    const navigation = useNavigation()
    const [content, setcontent] = useState('')
    return <>
       <View style={{ width: '100%', height: 60, flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={() => navigation.goBack()} style={{ width: '15%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <AntIcon name="back" size={24} color="black" />
            </Pressable>
            <TextInput
                placeholder={"Search"}
                value={content}
                blurOnSubmit
                keyboardType="web-search"
                onSubmitEditing={e => {
                    console.log(content)
                }}
                onChangeText={v => setcontent(v)}
                style={{ backgroundColor: 'lavenderblush', borderRadius: 15, height: 40, flex: 1, paddingHorizontal: 15, marginRight: 20 }} />
        </View>
    </>
}