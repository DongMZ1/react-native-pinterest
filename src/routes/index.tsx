import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigatorScreenParams } from "@react-navigation/native"
import { HomeRoutesType } from "./homeRoutes/homeRoutes";


export type AppRoutesType = {
    Home: NavigatorScreenParams<HomeRoutesType>,
    PostDetail: { post_id: string },
    Saved: undefined,
    Login: undefined,
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppRoutesType { }
    }
}

export const AppRoutes = createNativeStackNavigator<AppRoutesType>();