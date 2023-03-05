import { Animated, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View, ViewToken } from 'react-native';
import React, { useRef, useState } from 'react';
import { ScaledImage } from '../ScaledImage/ScaledImage';
import { useNavigation } from '@react-navigation/native';
import Pagination from './Pagination';

type CarouselPropType = {
    images: string[]
}

const width = Dimensions.get('screen').width
export const Carousel = ({ images }: CarouselPropType) => {
    const navigation = useNavigation()
    const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
        if(event.nativeEvent.contentOffset.x < -20){
            navigation.goBack()
        }
    };

    const handleOnViewableItemsChanged = useRef(({ viewableItems }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => {
        // console.log('viewableItems', viewableItems);
        setIndex(viewableItems[0]?.index as number);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 200,
    }).current;

    return (
          <>
            <FlatList
                data={images}
                renderItem={({ item }) => <ScaledImage showLoading containerStyle={{width}} source={{ uri: item }} />}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <Pagination data={images} scrollX={scrollX} index={index} />
            </>
    );
};
