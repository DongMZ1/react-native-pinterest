import { Keyboard, LayoutChangeEvent, Modal, Platform, Pressable, SafeAreaView, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './src/views/login/Login';
import { Home } from './src/views/home/Home';
import { AppRoutes } from './src/routes';
import { Provider, useDispatch } from 'react-redux';
import { store, useAppSelector } from './src/redux/store';
import { useEffect } from 'react';
import { authService } from './src/service/authService/authService';
import { selectAuthIsLogin } from './src/redux/slices/authSlice';
import { PostDetail } from './src/views/postDetail/PostDetail';
import { selectModalContentString, setKeyboardH, setModalContent, setSafeAreaViewDimension } from './src/redux/slices/utilitySlice';
function App() {
    const isLogin = useAppSelector(selectAuthIsLogin)
    const modalContent = useAppSelector(selectModalContentString)
    const dispatch = useDispatch()
    useEffect(() => {
        authService.persistUserSession()
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            event => {
                const { height } = event.endCoordinates;
                dispatch(setKeyboardH(height - 34));
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                dispatch(setKeyboardH(0));
            }
        );

        // Remove listeners on component unmount
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [])

    useEffect(() => {
        if(modalContent){
            setTimeout(() => dispatch(setModalContent('')), 1500)
        }
    }, [modalContent])
    const onSafeAreaLayout = (event: LayoutChangeEvent) => {
        const { height, width } = event.nativeEvent.layout;
        dispatch(setSafeAreaViewDimension({ height, width }))
    };
    return (
        <SafeAreaView style={{ flex: 1}} onLayout={onSafeAreaLayout}>
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
            <Modal animationType="slide"
                transparent={true}
                style={{width: '100%', height: '100%'}}    
                visible={modalContent !== ''}
            >
                <Pressable style={{height: '100%', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <View style={{width: '70%', minHeight: 100, flexDirection:'row', justifyContent:'center', backgroundColor:'white', borderRadius: 50, alignItems:'center'}}><Text style={{fontSize: 14}}>{modalContent}</Text></View>
                </Pressable>
            </Modal>
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

function setKeyboardHeight(height: number): any {
    throw new Error('Function not implemented.');
}
