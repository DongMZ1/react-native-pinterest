import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Button, Text, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRoutesType } from '../../routes';
import { useEffect, useState } from 'react';
import { authService } from '../../service/authService/authService';
import { AppButton } from '../../shared/UIComponent/AppButton/AppButton';
import { Dimensions } from 'react-native'
import { CheckBox } from '@rneui/base';
type LoginScreenRouteProp = NativeStackScreenProps<AppRoutesType, 'Login'>;
export const Login = () => {
    const [checked, setchecked] = useState(false)
    const navigator = useNavigation()
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 40, fontWeight: "800", color: 'red' }}>Red Book</Text>
        <Text style={{ marginBottom: Dimensions.get('screen').height / 4, fontWeight: "800", color: 'red' }}>Mark My Life @</Text>
        <AppButton disabled={!checked} styles={[{ width: '60%' }]} title='One-Step Sign In' onPress={() => authService.login()} />
        <View><CheckBox style={{width: 20}} title={'Please read and accept'} checked={checked} onPress={v => setchecked(checked => !checked)} /></View>
    </View>
}