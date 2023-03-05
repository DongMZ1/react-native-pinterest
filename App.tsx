import { SafeAreaView, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/views/login/Login';
import { Home } from './src/views/home/Home';
import { AppRoutes } from './src/routes';
import { Provider } from 'react-redux';
import { store, useAppSelector } from './src/redux/store';
import { useEffect } from 'react';
import { authService } from './src/service/authService/authService';
import { selectAuthIsLogin } from './src/redux/slices/authSlice';
import { PostDetail } from './src/views/postDetail/PostDetail';
function App() {
    const isLogin = useAppSelector(selectAuthIsLogin)
    useEffect(() => {
        authService.persistUserSession()
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'white' } }}>
                <AppRoutes.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login' >
                    {isLogin ?
                        <>
                            <AppRoutes.Screen options={{
                                gestureEnabled: false,
                            }} name='Home'>{() => <Home />}</AppRoutes.Screen>
                            <AppRoutes.Screen name='PostDetail'>{() => <PostDetail />}</AppRoutes.Screen>
                            <AppRoutes.Screen options={{
                                gestureEnabled: false,
                            }} name='Saved'>{() => <View></View>}</AppRoutes.Screen>
                        </>
                        :
                        <AppRoutes.Screen name='Login'>{() => <Login />}</AppRoutes.Screen>

                    }
                </AppRoutes.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

export default function Main() {
    return (
        <>
            <Provider store={store}>
                <App />
            </Provider>
        </>
    )
}