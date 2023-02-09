import { HStack } from "@react-native-material/core";
import { Text } from "react-native";
import { AppButtonColorDark } from "../../../tools/color";

const ScreenTitle = ({ icon, title }: any) => (
    <HStack style={{ backgroundColor: AppButtonColorDark, height:50, alignItems:'center',  padding: 5, borderRadius: 5, marginRight:10 }}>
        {icon}
        <Text style={{ color: 'white', fontSize: 19 }}>{title}</Text>
    </HStack>
)
export default ScreenTitle;