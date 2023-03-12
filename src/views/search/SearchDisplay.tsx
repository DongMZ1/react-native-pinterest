import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useRef, useState } from "react"
import { Keyboard, Pressable, ScrollView, TextInput, TouchableWithoutFeedback, View, Text } from "react-native"
import AntIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import { AppRoutesType } from "../../routes"
export const SearchDisplay = () => {
    const navigation = useNavigation()
    const routes = useRoute<RouteProp<AppRoutesType, 'Search'>>()
    const [content, setcontent] = useState('')
    const [newContent, setnewContent] = useState('')
    const [filterList, setfilterList] = useState<string[]>([])
    return <>
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', paddingVertical: 10 }}>
                <Pressable onPress={() => navigation.goBack()} style={{ width: '15%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntIcon name="back" size={24} color="black" />
                </Pressable>
                <View style={{ width: '85%', height: 40 }}>
                    <TextInput
                        placeholder={"Search"}
                        value={newContent}
                        blurOnSubmit
                        onBlur={() => {
                            setnewContent(content)
                        }}
                        keyboardType="web-search"
                        onSubmitEditing={(e) => {
                            setcontent(newContent)
                        }}
                        onChangeText={v => setnewContent(v)}
                        style={{ backgroundColor: 'lavenderblush', borderRadius: 40, flex: 1, paddingHorizontal: 15, marginRight: 20 }} />
                </View>
                <View style={{ height: 40, paddingTop: 10, width: '100%', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: filterList.length > 0 ? 'red' : 'grey' }}>Filter</Text><MaterialIcon size={20} name={filterList.length > 0 ? "filter-check" : "filter"} color={filterList.length > 0 ? 'red' : 'grey'}></MaterialIcon></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}><Text style={{ color: filterList.length > 0 ? 'red' : 'grey' }}>Sort By</Text><FontAwesomeIcon style={{marginLeft: 5}} size={20} color={'grey'} name="sort"></FontAwesomeIcon></View>
                </View>
            </View>
            <ScrollView style={{ flex: 1}}>

            </ScrollView>
        </View>
    </>
}