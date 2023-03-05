import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Animated, View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

export function HomePageCustomTabBar({ state, descriptors, navigation, position } : MaterialTopTabBarProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{width: '25%'}}></View>
       <View style={{ flexDirection: 'row', width: '50%', paddingVertical: 10 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true } as any);
          }
        };
        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });
        

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <View style={{flexDirection: 'row', justifyContent: 'center', borderColor: isFocused ? 'red' : undefined, borderBottomWidth: isFocused? 2 : 0}}>
                <Animated.Text style={{ opacity, paddingBottom: 4}}>
              {label as string}
                </Animated.Text>
            </View>
          </TouchableOpacity>
        );
      })}
      </View>
      <View style={{width: '25%', flexDirection: 'row', marginBottom:5, justifyContent: 'center'}}><FontAwesome5 name="search" size={20} color="grey" /></View>
    </View>
  );
}