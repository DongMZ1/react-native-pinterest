import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Pressable, ScrollView, View, Image, Animated, TextInput, Keyboard, Text } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { Asset, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { selectKeyboard, setModalContent } from '../../redux/slices/utilitySlice'
export const CreatePost = () => {
    const navigation = useNavigation()
    const headerHeight = 50
    const footerHeight = 50
    const dispatch = useAppDispatch();
    const [photos, setPhoto] = useState<Asset[]>([]);
    const [opacities, setopacities] = useState<Animated.Value[]>([])
    const [title, settitle] = useState('')
    const [content, setcontent] = useState('')
    const keyboardHeight = useAppSelector(selectKeyboard).keyboardheight
    const [viewHeight, setviewHeight] = useState(0)
    const scrollHeight = viewHeight - keyboardHeight - headerHeight - footerHeight
    const currentScrollHeight = useRef(new Animated.Value(scrollHeight)).current

    useEffect(() => {
        Animated.timing(currentScrollHeight, { toValue: scrollHeight, useNativeDriver: false, duration: 150 }).start()
    }, [scrollHeight])

    const handleChoosePhoto = () => {
        launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 0,
            quality: 1
        }, (response) => {
            // console.log(response);
            if (response.assets) {
                setPhoto(photos ? [...photos, ...response.assets] : response.assets);
                const newOPs = response.assets.map(each => new Animated.Value(0))
                setopacities(opacities => opacities.concat(newOPs))
                newOPs.forEach(each => {
                    Animated.timing(each, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: false
                    }).start()
                })
            }
        });
    };

    const submit = () => {
        if (photos.length === 0) {
            dispatch(setModalContent({content :'At least A Photo Is Required!', alert: true}))
            return
        }
        if(!title){
            dispatch(setModalContent({content: 'Title Is Required!', alert: true}))
            return
        }
        if(!content){
            dispatch(setModalContent({content: 'Content Is Required!', alert: true}))
            return
        }
        dispatch(setModalContent({content:'Posted!'}))
        navigation.goBack()
    }


    const deletePhoto = (key: number) => {
        if (opacities?.[key]) {
            Animated.timing(opacities[key], { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
                setopacities(opacities => opacities.filter((item, index) => index !== key))
                const newPhotes = photos.filter((item, index) => index !== key)
                setPhoto(newPhotes)
            })
        }
    }
    return <View style={{ flex: 1 }} onLayout={event => {
        const { width, height } = event.nativeEvent.layout;
        setviewHeight(height)
    }}>
        <View style={{ height: headerHeight }}>
            <Pressable onPress={() => navigation.goBack()} style={{ width: '20%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <AntIcon name="back" size={24} color="black" />
            </Pressable>
        </View>
        <Animated.View style={{ height: currentScrollHeight }}>
            <ScrollView style={{ flex: 1 }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ height: 160 }} contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                    {
                        photos?.map((each, key) => <Animated.View style={{ width: 140, height: 140, marginRight: 10, position: 'relative', opacity: opacities[key] }}><Image source={{ uri: each.uri }} style={{ width: 140, height: 140 }} borderRadius={20} /><Pressable style={{ height: 25, width: 25, borderRadius: 15, backgroundColor: 'white', position: 'absolute', right: 10, top: 10 }} onPress={() => deletePhoto(key)}><EntypoIcon name='circle-with-cross' size={25} /></Pressable></Animated.View>)
                    }
                    <Pressable onPress={handleChoosePhoto} style={{ width: 140, height: 140, backgroundColor: 'lightgrey', borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><AntIcon name='pluscircle' size={25} color={'grey'} /></Pressable>
                </ScrollView>
                <TextInput
                    value={title}
                    onChangeText={text => settitle(text)}
                    placeholder='Please Enter A Title'
                    style={{ borderRadius: 10, backgroundColor: 'azure', height: 40, marginHorizontal: 10, paddingHorizontal: 20 }} />
                <TextInput
                    value={content}
                    onChangeText={text => setcontent(text)}
                    placeholder='Please Enter Main Title'
                    multiline
                    style={{ borderRadius: 10, backgroundColor: 'azure', marginHorizontal: 10, marginTop: 10, paddingHorizontal: 20, height: 200, paddingTop: 15 }} />
            </ScrollView>
        </Animated.View>
        {keyboardHeight === 0 ?
            <Pressable style={{ height: footerHeight, width: '100%', paddingHorizontal: 20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} onPress={submit}><Text style={{ fontSize: 15, color: 'red' }}>CREATE POST</Text></Pressable>
            : <View style={{ height: footerHeight, width: '100%', flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={() => Keyboard.dismiss()}><Text style={{ fontSize: 15 }}>FINISH EDIT</Text></Pressable>
            </View>}
    </View>
}