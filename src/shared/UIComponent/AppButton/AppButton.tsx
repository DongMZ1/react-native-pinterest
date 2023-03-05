import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native"
type AppButtonProps = {
    styles?: ViewStyle[],
    title: string,
    onPress: () => void,
    disabled?: boolean
}
export const AppButton = ({ styles = [], title, onPress, disabled }: AppButtonProps) => {
    return <TouchableOpacity disabled={disabled} onPress={onPress} style={[...styles, { backgroundColor: disabled ? '#90EE90' : 'green', padding: 10, borderRadius: 10, display: "flex", flexDirection: 'row', justifyContent: 'center', }]}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>{title}</Text>
    </TouchableOpacity>
}