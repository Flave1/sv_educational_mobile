import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { Pressable, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { navigationRoutes } from "../../../screen-routes/navigation";
import { HStack } from "@react-native-material/core";
import CustomText from "./CustomText";
import { ScrollView } from "react-native-gesture-handler";
import FooterBox from "./footer-box";
const TeacherFooter = ({ hide, activeScreen = 1 }: any) => {
    const [selected, setSelected] = React.useState(activeScreen);
    React.useEffect(() => {
        setSelected(activeScreen);
    })
    const navigation = useNavigation();
    return (
        <>
            <HStack >
                <ScrollView horizontal={true} style={{ flex: 1 }}>
                    <FooterBox icon={<MaterialIcons name="home" color="white" size={30} />} text={<CustomText title={'Home'} />} />
                    <FooterBox icon={<MaterialIcons name="assessment" color="white" size={30} />} text={<CustomText title={'Assessment'} />} />
                    <FooterBox icon={<MaterialIcons name="app-registration" color="white" size={30} />} text={<CustomText title={'Attendance'} />} />
                    <FooterBox icon={<MaterialCommunityIcons name="bookshelf" color="white" size={30} />} text={<CustomText title={'Student notes'} />} />
                    <FooterBox icon={<MaterialIcons name="library-books" color="white" size={30} />} text={<CustomText title={'Class Notes'} />} />
                    <FooterBox icon={<FontAwesome5 name="users" color="white" size={30} />} text={<CustomText title={'Students'} />} />
                    <FooterBox icon={<FontAwesome5 name="user-friends" color="white" size={30} />} text={<CustomText title={'Groups'} />} />
                </ScrollView>

            </HStack>
        </>
    )
}
export default TeacherFooter;