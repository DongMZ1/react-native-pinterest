import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { useEffect, useRef, useState } from "react"
import { Keyboard, Pressable, ScrollView, TextInput, TouchableWithoutFeedback, View, Text, ActivityIndicator } from "react-native"
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
    const [loading, setloading] = useState(true)
    const [newContent, setnewContent] = useState('')
    const [filter, setfilter] = useState<'SAVED' | 'ALL'>('ALL')
    const [sort, setsort] = useState<'NONE' | 'Number OF REPLIES' | 'TIME'>('NONE')
    const [showSort, setshowSort] = useState(false)
    const [showFilter, setshowFilter] = useState(false)

    useEffect(() => {
        handleFilterChange()
    }, [filter, sort, content])

    const handleFilterChange = async () => {
        setloading(true)
        await new Promise(r => setTimeout(r, 1000))
        setloading(false)
    }
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
                <OutsidePressHandler style={{ width: '100%' }} onOutsidePress={() => {
                    setshowFilter(false)
                    setshowSort(false)
                }} disabled={false}>
                    <View style={{ height: 40, paddingTop: 10, width: '100%', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                        <Pressable
                            onPress={() => {
                                setshowSort(false)
                                setshowFilter(state => !state)
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center', width: 90, paddingRight: 20 }}><Text style={{ color: filter === 'SAVED' ? 'red' : 'grey' }}>Filter</Text><MaterialIcon size={20} name={filter === 'SAVED' ? "filter-check" : "filter"} color={filter === 'SAVED' ? 'red' : 'grey'}></MaterialIcon></Pressable>
                        <Pressable onPress={() => {
                            setshowFilter(false)
                            setshowSort(state => !state);
                        }} style={{ flexDirection: 'row', alignItems: 'center' }}><Text style={{ color: sort !== 'NONE' ? 'red' : 'grey' }}>{sort === 'NONE' ? 'Sort By' : sort.replace('_', " ")}</Text><FontAwesomeIcon style={{ marginLeft: 5 }} size={20} color={sort === 'NONE' ? 'grey' : 'red'} name="sort"></FontAwesomeIcon></Pressable>
                    </View>
                    {showFilter &&
                        <View style={{ width: screenWidth, height: 100, backgroundColor: 'white' }}>
                            <Pressable onPress={() => setfilter('SAVED')} style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}><Text style={{ color: 'grey' }}>SAVED POSTS</Text>{filter === 'SAVED' && <AntIcon name='check' size={20} style={{ marginLeft: 'auto' }} color={'grey'} />}</Pressable>
                            <Pressable onPress={() => setfilter('ALL')} style={{ width: '100%', height: '50%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}><Text style={{ color: 'grey' }}>ALL POSTS</Text>
                                {filter === 'ALL' && <AntIcon name='check' size={20} style={{ marginLeft: 'auto' }} color={'grey'} />}
                            </Pressable>
                        </View>
                    }
                    {
                        showSort && ['NONE', 'NUMBER OF REPLIES', 'TIME'].map(each => <View key={each} style={{ width: screenWidth, height: 50, backgroundColor: 'white' }}>
                            <Pressable onPress={() => {
                                setsort(each as "NONE" | "Number OF REPLIES" | "TIME")
                            }} style={{ width: '100%', height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: '10%' }}>
                                <Text style={{ color: 'grey' }}>{each}</Text>
                                {sort === each && <AntIcon name='check' size={20} style={{ marginLeft: 'auto' }} color={'grey'} />}
                            </Pressable>
                        </View>
                        )
                    }
                </OutsidePressHandler>
            </View>
            {loading ? <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', flex: 1, }}><ActivityIndicator /></View> :<ScrollView style={{ flex: 1 }}>

            </ScrollView>}
        </View>
    </>
}