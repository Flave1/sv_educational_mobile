import React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Ionicons from "react-native-vector-icons/Ionicons"
import CustomText from "../layouts/CustomText";
import { ScrollView } from "react-native-gesture-handler";
import CircleBox from "../layouts/circle-box";
import { screens } from "../../screen-routes/navigation";
import { connect } from "react-redux";
const SessionClassProperties = (props: any) => {
    const [selected, setSelected] = React.useState(props.activeScreen);
    React.useEffect(() => {
        setSelected(props.activeScreen);
    });

    const sessionClass = {
        value: props.currentClass?.params?.sessionClassId,
        text: props.currentClass?.params?.sessionClass,
        lookUpId: props.currentClass?.params?.classLookupId
    };

    return (
        <>
            <ScrollView horizontal={true} style={[{ height: '100%' }]}
                contentContainerStyle={[props.contentContainerStyle]}>
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.home.name,
                            params: null
                        })
                    }} icon={<MaterialIcons name="home" color="white" size={30} />} text={<CustomText title={'Home'} />} />
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.name,
                            params: { sessionClass: sessionClass }
                        })
                    }} icon={<MaterialIcons name="assessment" color="white" size={30} />} text={<CustomText title={'Assessment'} />} />
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.attendance.name,
                            params: { sessionClass: sessionClass }
                        })
                    }} icon={<MaterialIcons name="app-registration" color="white" size={30} />} text={<CustomText title={'Attendance'} />} />
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.studentnote.name,
                            params: { sessionClass: sessionClass }
                        })
                    }}
                    icon={<MaterialCommunityIcons name="bookshelf" color="white" size={30} />} text={<CustomText title={'Student Notes'} />} />
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.classnote.name,
                            params: { sessionClass: sessionClass }
                        })
                    }}
                    icon={<MaterialIcons name="library-books" color="white" size={30} />} text={<CustomText title={'Class Notes'} />} />
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.classStudents.name,
                            params: { sessionClass: sessionClass }
                        })
                    }}
                    icon={<FontAwesome5 name="users" color="white" size={30} />} text={<CustomText title={'Students'} />} />
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.classGroup.name,
                            params: { sessionClass: sessionClass }
                        })
                    }}
                    icon={<FontAwesome5 name="user-friends" color="white" size={30} />} text={<CustomText title={'Groups'} />} />
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.classSubjects.name,
                            params: { sessionClass: sessionClass }
                        })
                    }} icon={<MaterialIcons name="subject" color="white" size={30} />} text={<CustomText title={'Subjects'} />} />
                <CircleBox
                    onPress={() => {
                        props.navigation.navigate({
                            name: screens.scenes.mainapp.scenes.tutor.screens.classInfo.name,
                            params: { sessionClass: sessionClass }
                        })
                    }}
                    icon={<Ionicons name="information-circle-outline" color="white" size={30} />} text={<CustomText title={'Class Info'} />} />
            </ScrollView>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        appState: state.appState,
        currentClass: state.classPropsState.currentClass
    }
}


export default connect(mapStateToProps, null)(SessionClassProperties);