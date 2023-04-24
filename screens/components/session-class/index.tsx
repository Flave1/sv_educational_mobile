import React, { useEffect, useState } from "react";
import { Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ProtectedTeacher from "../../authentication/protected-teacher";
import SquareBox from "../layouts/sqaure-box";
import SessionClassProperties from "./session-class-properties";
import { connect } from "react-redux";
import { View } from "react-native";
import { GetClassStudents } from "../../../store/actions/class-properties-actions";
import { ClassStudents } from "../../../models/class-properties/students";
const SessionClassIndex = (props: any) => {
    const [classInfo] = useState<any>(props.route.params);
    
    useEffect(() => {
        classInfo.sessionClassId && props.getStudents(classInfo.sessionClassId, props.classStudents);
    }, [classInfo.sessionClassId])

    
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
                        <SessionClassProperties
                            hide={false}
                            contentContainerStyle={{ flex: 1, flexWrap: "wrap" }}
                            selectedClass={{ value: classInfo.sessionClassId, text: classInfo.sessionClass }}
                            navigation={props.navigation}
                        />
                    </View>
                </Stack>
            </Stack>
        </ProtectedTeacher>

    );
};

function mapStateToProps(state: any) {
    return { classStudents: state.classPropsState.classStudents };
}

function mapDispatchToProps(dispatch: any) {
    return { getStudents: (sessionClassId: string, students: ClassStudents[]) => GetClassStudents(sessionClassId, students)(dispatch) };
}



export default connect(mapStateToProps, mapDispatchToProps)(SessionClassIndex);