import { StyleSheet, Animated, View, Dimensions } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('screen');
type PaginationPropsType = {
    data: string[],
    scrollX: Animated.Value,
    index: number
}
const Pagination = ({ data, scrollX, index }: PaginationPropsType) => {
    return (
        <View style={styles.container}>
            {data.map((_, idx) => {
                const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [6, 15, 6],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2, 1, 0.1],
                    extrapolate: 'clamp',
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: ['#ccc', '#000', '#ccc'],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            styles.dot,
                            { width: dotWidth, backgroundColor },
                            // idx === index && styles.dotActive,
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginHorizontal: 3,
        backgroundColor: '#ccc',
    },
    dotActive: {
        backgroundColor: '#000',
    },
});