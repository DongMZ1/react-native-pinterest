import { useState } from "react"
import { useImageAspectRatio } from "../../../utility/hooks/useImageAspectRatio"
import { Image, ImageProps, ImageStyle, ImageURISource, StyleProp, View, Text, ActivityIndicator, ViewStyle } from 'react-native'
type ScaledImageProps = Omit<ImageProps, 'source' | 'style'> & {
    source: ImageURISource,
    style?: StyleProp<ImageStyle>
    containerStyle ?: StyleProp<ViewStyle>
    showLoading?: boolean
}

export const ScaledImage = (props: ScaledImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const onLoad = () => {
        setIsLoading(false);
    };
    const { style, showLoading, source, containerStyle, ...others } = props
    const aspectRatio = useImageAspectRatio((source)['uri'] ? (source)['uri'] : '')
    return <View style={containerStyle}>
        {isLoading && showLoading && <ActivityIndicator />}
        <Image source={source} onLoad={onLoad} progressiveRenderingEnabled style={[style, { aspectRatio ,width: '100%' }]} {...others} ></Image>
    </View>
}