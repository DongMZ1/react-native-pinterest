import { useNavigation } from '@react-navigation/native'
import { useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, Pressable, ScrollView, View, Image, Animated } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { Asset, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import EntypoIcon from 'react-native-vector-icons/Entypo'
export const CreatePost = () => {
    const navigation = useNavigation()
    const [photos, setPhoto] = useState<Asset[]>([]);
    const [opacities, setopacities] = useState<Animated.Value[]>([])

    const handleChoosePhoto = () => {
        launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 0,
            quality: 1
        }, (response) => {
            // console.log(response);
            if (response.assets) {
                setPhoto(photos ? [...photos, ...response.assets] : response.assets);
                setopacities([...opacities, ...response.assets.map(each => new Animated.Value(1))])
            }
        });
    };


    const deletePhoto = (key: number) => {
        if (opacities?.[key]) {
            Animated.timing(opacities[key], { toValue: 0, duration: 500, useNativeDriver: true }).start(() => {
                setopacities(opacities => opacities.filter((item, index) => index !== key))
                const newPhotes = photos.filter((item, index) => index !== key)
                setPhoto(newPhotes)
            })
        }
    }
    return <><View style={{ height: 50 }}>
        <Pressable onPress={() => navigation.goBack()} style={{ width: '20%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <AntIcon name="back" size={24} color="black" />
        </Pressable>
    </View>
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={{ height: 160 }} contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}>
                    {
                        photos?.map((each, key) => <Animated.View style={{ width: 140, height: 140, marginRight: 10, position: 'relative', opacity: opacities[key] }}><Image source={{ uri: each.uri }} style={{ width: 140, height: 140 }} borderRadius={20} /><Pressable style={{ height: 25, width: 25, borderRadius: 15, backgroundColor: 'white', position: 'absolute', right: 10, top: 10 }} onPress={() => deletePhoto(key)}><EntypoIcon name='circle-with-cross' size={25} /></Pressable></Animated.View>)
                    }
                    <Pressable onPress={handleChoosePhoto} style={{ width: 140, height: 140, backgroundColor: 'lightgrey', borderRadius: 20 }}></Pressable>
                </ScrollView>
            </ScrollView>
        </KeyboardAvoidingView>
    </>
}