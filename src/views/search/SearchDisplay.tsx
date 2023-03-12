import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useRef, useState } from "react"
import { Keyboard, Pressable, ScrollView, TextInput, TouchableWithoutFeedback, View, Text } from "react-native"
import AntIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import OutsidePressHandler from 'react-native-outside-press';
import { AppRoutesType } from "../../routes"
import { useAppSelector } from "../../redux/store"
import { selectSafeAreaViewDimension } from "../../redux/slices/utilitySlice"
export const SearchDisplay = () => {
    const navigation = useNavigation()
    const routes = useRoute<RouteProp<AppRoutesType, 'Search'>>()
    const screenWidth = useAppSelector(selectSafeAreaViewDimension).width
    const [content, setcontent] = useState('')
    const [newContent, setnewContent] = useState('')
    const [filterList, setfilterList] = useState<string[]>([])
    const [showFilter, setshowFilter] = useState(false)
    return <>
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', paddingVertical: 10 }}>
                <Pressable onPress={() => navigation.goBack()} style={{ width: '15%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <AntIcon name="back" size={24} color="black" />
                </Pressable>
                <View style={{ flex: 1, height: 40, backgroundColor: 'lavenderblush', borderRadius: 40, paddingHorizontal: 15, marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
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
                        style={{ flex: 1 }}
                        onChangeText={v => setnewContent(v)}
                    />
                    {content.length > 0 ? <Pressable onPress={() => {
                        setcontent('')
                        setnewContent('')
                    }}><Entypo name="cross" size={25} /></Pressable> : null}
                </View>
                <OutsidePressHandler style={{width: '100%'}} onOutsidePress={() => setshowFilter(false)} disabled={false}>
                <View style={{ height: 40, paddingTop: 10, width: '100%', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                    <Pressable 
                    onPress={() => setshowFilter(state => !state)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: filterList.length > 0 ? 'red' : 'grey' }}>Filter</Text><MaterialIcon size={20} name={filterList.length > 0 ? "filter-check" : "filter"} color={filterList.length > 0 ? 'red' : 'grey'}></MaterialIcon></Pressable>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}><Text style={{ color: filterList.length > 0 ? 'red' : 'grey' }}>Sort By</Text><FontAwesomeIcon style={{ marginLeft: 5 }} size={20} color={'grey'} name="sort"></FontAwesomeIcon></View>
                </View>
                { showFilter &&
                        <View style={{ width: screenWidth, height: 200, backgroundColor: 'red' }}></View>
                    
                }
                </OutsidePressHandler>
            </View>
            <ScrollView style={{ flex: 1 }}>

            </ScrollView>
        </View>
    </>
}