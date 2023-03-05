import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { store } from '../../redux/store';
import { updateIsLogin } from '../../redux/slices/authSlice';

export const authService = {
    persistUserSession: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                store.dispatch(updateIsLogin(true));
            }
        } catch (e) {

        }
    },
    login: async () => {
        await AsyncStorage.setItem('token', 'user-auth-token');
        store.dispatch(updateIsLogin(true));
    },
    signOut: async () => {
        await AsyncStorage.removeItem('token');
        store.dispatch(updateIsLogin(false))
    }
}