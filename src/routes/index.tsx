import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigatorScreenParams } from "@react-navigation/native"
import { HomeRoutesType } from "./homeRoutes/homeRoutes";


export type AppRoutesType = {
    Home: NavigatorScreenParams<HomeRoutesType>,
    PostDetail: { post_id: string },
    Login: undefined,
    Search: {saved_posts?: boolean},
    Create: undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppRoutesType { }
    }
}

export const AppRoutes = createNativeStackNavigator<AppRoutesType>();