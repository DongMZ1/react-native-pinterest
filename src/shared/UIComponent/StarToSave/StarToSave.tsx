import AntDesign from 'react-native-vector-icons/AntDesign'
import { useEffect, useRef } from 'react'
import {Animated, Easing, GestureResponderEvent, StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native'
import useIsFirstRender from '../../../utility/hooks/useIsFirstRendering'
type StartToSaveProps = {
    isSaved: boolean,
    onPress?: (v : boolean) => void,
    style?: StyleProp<ViewStyle>,
    size?: number
}
export const StarToSave = ({style, onPress, isSaved, size} : StartToSaveProps) => {
    const isFirstRendering = useIsFirstRender()
    const scale = useRef(new Animated.Value(1)).current
    const onButtonPress = () => {
        onPress && onPress(!isSaved)
    }
    useEffect(() => {
        if(!isFirstRendering && isSaved){
            //if it s not first rendering, and user just save the star, we give it an animation
            Animated.sequence([
                Animated.timing(scale, { toValue: 1.3, duration: 100, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1.3, duration: 100, useNativeDriver: true }),
                Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true })
              ]).start()
        }
    }, [isSaved])
    return <TouchableOpacity style={style} onPress={() => onButtonPress()}><Animated.View style={[{ transform: [{scale}]}]}><AntDesign style={{ paddingLeft: 5 }} name={isSaved ? "star" : "staro"} size={ size ? size : 20} color={isSaved ? "red" : "grey"} /></Animated.View></TouchableOpacity>
}