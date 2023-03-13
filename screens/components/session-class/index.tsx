import React, { useState } from "react";
import { Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import ProtectedTeacher from "../../authentication/protected-teacher";
import SquareBox from "../layouts/sqaure-box";
import SessionClassProperties from "./session-class-properties";
import { View } from "react-native";
const SessionClassIndex = ({ state, backgroundColor, persistedUser, navigation, route }: any) => {
    const [classInfo] = useState<any>(route.params);
    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
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
                            selectItem={{ value: classInfo.sessionClassId, text: classInfo.sessionClass }}
                            navigation={navigation}
                        />
                    </View>

                </Stack>

            </Stack>
        </ProtectedTeacher>

    );
};

export default SessionClassIndex;