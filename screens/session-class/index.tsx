import React, { useEffect, useState } from "react";
import { Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SquareBox from "../layouts/sqaure-box";
import { connect } from "react-redux";
import { ScrollView, View } from "react-native";
import { ClassStudent } from "../../models/class-properties/students";
import { GetClassStudents } from "../../store/actions/class-properties-actions";
import ProtectedTeacher from "../authentication/protected-teacher";
import CircleBox from "../layouts/circle-box";
import Ionicons from "react-native-vector-icons/Ionicons";
import { screens } from "../../screen-routes/navigation";
import CustomText from "../layouts/CustomText";
const SessionClassIndex = (props: any) => {
    const [classInfo] = useState<any>(props.route.params);
    
    useEffect(() => {
        classInfo.sessionClassId && props.getStudents(classInfo.sessionClassId);
    }, [classInfo.sessionClassId]);

    const sessionClass = { value: classInfo.sessionClassId, text: classInfo.sessionClass, lookUpId: classInfo.classLookupId };
    return (
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Assessment">
            <Stack style={{ flex: 1 }}>
                <Stack style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                    <SquareBox
                        AssIcon={<MaterialIcons name="assessment" color="white" size={15} />}
                        AssCount={classInfo.assessmentCount}
                        NoteIcon={<MaterialCommunityIcons name="bookshelf" color="white" size={15} />}
                        NoteCount={classInfo.studentNoteCount}
                        studentCountIcon={<FontAwesome5 name="users" color="white" size={15} />}
                        studentCount={classInfo.studentCounts}
                        className={classInfo.sessionClass}
                    />
                </Stack>

                <Stack style={{ marginTop: 25, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <View style={{ flex: 1, width: '80%', justifyContent: 'center', alignItems: 'center' }}>
                        <ScrollView horizontal={true} style={[{ height: '100%' }]} contentContainerStyle={{ flex: 1, flexWrap: "wrap" }}>
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
                    </View>
                </Stack>
            </Stack>
        </ProtectedTeacher>

    );
};



function mapDispatchToProps(dispatch: any) {
    return {
        getStudents: (sessionClassId: string) =>
            GetClassStudents(sessionClassId)(dispatch)
    };
}



export default connect(null, mapDispatchToProps)(SessionClassIndex);