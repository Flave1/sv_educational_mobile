import { HStack, Pressable, Text } from "@react-native-material/core";
import { useColorScheme } from "react-native";
import { AppDark, TextDark, TextLight } from "../../tools/color";

const ListComponent = ({ text, icon, onPress }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Pressable onPress={onPress}>
            <HStack spacing={7} style={{ margin: 10 }}>
                <Text style={{ fontWeight: 'bold', color: TextLight }}>{icon}</Text>
                <Text style={{ fontWeight: 'bold', color: TextLight }}>{text}</Text>
            </HStack>
        </Pressable>

    )
}
export default ListComponent;