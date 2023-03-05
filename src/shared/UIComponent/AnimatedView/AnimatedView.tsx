import { FC, useEffect, useRef, useState } from "react"
import { Animated, StyleProp, ViewStyle } from "react-native"

type AnimatedViewProps = {
    animationType: 'Opacity'[]
    time?: number,
    children?: JSX.Element | null,
    show: boolean,
    style?: StyleProp<ViewStyle>

}
export const AnimatedView = ({ animationType, children, time = 3000, show, style }: AnimatedViewProps) => {
    const timeRef = useRef(new Animated.Value(0)).current
    const [showView, setshowView] = useState(show);
    useEffect(() => {
        if (show) {
            setshowView(show)
            Animated.timing(timeRef, { toValue: 1, useNativeDriver: true, duration: time }).start()
        } else {
            Animated.timing(timeRef, { toValue: 0, useNativeDriver: true, duration: time }).start(({ finished }) => {
                if (finished) { setshowView(false) }
            })
        }
    }, [show])
    return showView ? <Animated.View style={[style, animationType.includes('Opacity') && { opacity: timeRef }]}>
        {children}
    </Animated.View> : null
}