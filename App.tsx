import { Keyboard, LayoutChangeEvent, Modal, Platform, Pressable, SafeAreaView, Text, View } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginDisplay } from './src/views/login/LoginDisplay';
import { HomeDisplay } from './src/views/home/HomeDisplay';
import { AppRoutes } from './src/routes';
import { Provider, useDispatch } from 'react-redux';
import { store, useAppSelector } from './src/redux/store';
import { useEffect } from 'react';
import { authService } from './src/service/authService/authService';
import { selectAuthIsLogin } from './src/redux/slices/authSlice';
import { PostDetailDisplay } from './src/views/postDetail/PostDetailDisplay';
import { selectModalContentString, setKeyboardH, setModalContent, setSafeAreaViewDimension } from './src/redux/slices/utilitySlice';
import { SearchDisplay } from './src/views/search/SearchDisplay';
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
                            }} name='Home'>{() => <HomeDisplay />}</AppRoutes.Screen>
                            <AppRoutes.Screen name='PostDetail'>{() => <PostDetailDisplay />}</AppRoutes.Screen>
                            <AppRoutes.Screen options={{
                                gestureEnabled: false,
                            }} name='Search'>{() => <SearchDisplay />}</AppRoutes.Screen>
                        </>
                        :
                        <AppRoutes.Screen name='Login'>{() => <LoginDisplay />}</AppRoutes.Screen>

                    }
                </AppRoutes.Navigator>
            </NavigationContainer>
            <Modal 
                animationType='fade'
                style={{width: '100%', height: '100%'}}    
                transparent={true}
                visible={modalContent !== ''}
            >
                <Pressable style={{height: '100%', width: '100%', flexDirection:'row', justifyContent:'center', alignItems:'center', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    <View style={{minWidth: '50%', minHeight: 50, flexDirection:'row', justifyContent:'center', backgroundColor:'white', borderRadius: 20, alignItems:'center'}}><Text style={{fontSize: 14}}>{modalContent}</Text></View>
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
