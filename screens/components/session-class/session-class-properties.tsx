import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"


import { screens } from "../../../screen-routes/navigation";
import CustomText from "../layouts/CustomText";
import { ScrollView } from "react-native-gesture-handler";
import CircleBox from "../layouts/circle-box";
const SessionClassProperties = ({ hide, activeScreen = 1, contentContainerStyle = null, selectItem , navigation}: any) => {
    const [selected, setSelected] = React.useState(activeScreen);
    React.useEffect(() => {
        setSelected(activeScreen);
    });
    
    return (
        <>
            <ScrollView horizontal={true} style={[{ height: '100%' }]} contentContainerStyle={[contentContainerStyle]}>
                <CircleBox
                    onPress={() => {
                        navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.home.name,
                            params: null
                        })
                    }} icon={<MaterialIcons name="home" color="white" size={30} />} text={<CustomText title={'Home'} />} />
                <CircleBox
                    onPress={() => {
                        navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.name,
                            params: selectItem
                        })
                    }} icon={<MaterialIcons name="assessment" color="white" size={30} />} text={<CustomText title={'Assessment'} />} />
                <CircleBox icon={<MaterialIcons name="app-registration" color="white" size={30} />} text={<CustomText title={'Attendance'} />} />
                <CircleBox icon={<MaterialCommunityIcons name="bookshelf" color="white" size={30} />} text={<CustomText title={'Student Notes'} />} />
                <CircleBox icon={<MaterialIcons name="library-books" color="white" size={30} />} text={<CustomText title={'Class Notes'} />} />
                <CircleBox icon={<FontAwesome5 name="users" color="white" size={30} />} text={<CustomText title={'Students'} />} />
                <CircleBox icon={<FontAwesome5 name="user-friends" color="white" size={30} />} text={<CustomText title={'Groups'} />} />
                <CircleBox icon={<MaterialIcons name="subject" color="white" size={30} />} text={<CustomText title={'Subjects'} />} />
                <CircleBox icon={<Ionicons name="information-circle-outline" color="white" size={30} />} text={<CustomText title={'Class Info'} />} />
            </ScrollView>
        </>
    )
}
export default SessionClassProperties;