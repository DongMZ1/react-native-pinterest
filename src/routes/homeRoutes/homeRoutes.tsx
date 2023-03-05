import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

export type HomeRoutesType = {
    Discover: undefined,
    Nearby: undefined
}

export const HomeRoutes = createMaterialTopTabNavigator<HomeRoutesType>()