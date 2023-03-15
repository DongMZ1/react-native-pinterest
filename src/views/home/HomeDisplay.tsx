import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Pressable } from 'react-native'
import { Discover } from './discover/Discover';
import { Nearby } from './nearby/Nearby';
import { AppRoutesType } from '../../routes';
import { HomeRoutes } from '../../routes/homeRoutes/homeRoutes';
import { authService } from '../../service/authService/authService';
import { MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import  AntDesign  from 'react-native-vector-icons/AntDesign'  
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { HomePageCustomTabBar } from './homePageCustomTabBar/HomePageCustomTabBar';
export const HomeDisplay = () => {
    const route = useRoute<RouteProp<AppRoutesType, "Home">>()
    const navigation = useNavigation()
    return <View style={{ flex: 1, flexDirection: 'column' }}>
        <HomeRoutes.Navigator tabBar={props => <HomePageCustomTabBar {...props} />} style={{ flexGrow: 1 }} initialRouteName='Discover'>
            <HomeRoutes.Screen name='Discover' component={Discover} />
            <HomeRoutes.Screen name='Nearby' component={Nearby} />
        </HomeRoutes.Navigator>
        <View style={{ height: 50, width: '100%', backgroundColor: 'white', borderTopWidth: 1, borderTopColor: 'grey', flexDirection: 'row' }} >
            <Pressable 
            onPress={() => {
                navigation.navigate('Search', {
                    saved_posts: true
                })
            }}
            style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Feather name="bookmark" size={20} color="grey" /><Text style={{ color: 'grey', fontSize: 12 }}>SAVED</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Create")} style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="create-outline" size={20} color="grey" /><Text style={{ color: 'grey', fontSize: 12 }}>CREATE</Text>
            </Pressable>
            <Pressable onPress={() => authService.signOut()} style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1}}><Entypo name="log-out" size={20} color="red" /><Text style={{color: 'red', fontSize: 12}}>LOG OUT</Text>
            </Pressable>
        </View>
    </View>
}