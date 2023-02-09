import React, { useState } from "react";
import { View } from "react-native";
import ProtectedTeacher from "../authentication/protected-teacher";
import TeacherAnnouncementBox from "../components/layouts/teacher-announcement-box";
import { HStack, Pressable, Stack } from "@react-native-material/core";
import SquareBox from "../components/layouts/sqaure-box";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { GetDashboardData } from "../../store/actions/dasboard-actions";
import { screens } from "../../screen-routes/navigation";
import { ScrollView } from "react-native-gesture-handler";
const TeacherDashboard = ({ dispatch, state, backgroundColor, persistedUser, navigation }: any) => {

    const { dashboard } = state.dasboardState;
    const [refreshCount, setRefreshCount] = useState(0)
    React.useEffect(() => {
        setTimeout(() => {
            if (!persistedUser.baseUrlSuffix) {
                setRefreshCount(refreshCount + 1)
            }
        }, 3000)
    }, []);


    React.useEffect(() => {
        if (persistedUser.baseUrlSuffix) {
            GetDashboardData(persistedUser.baseUrlSuffix)(dispatch)
        }

    }, [refreshCount]);

    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 10, paddingRight: 0 }}>
                    <TeacherAnnouncementBox navigation={navigation} />
                </View>

                <Stack>
                    {
                        <HStack style={{ padding: 5, justifyContent: 'center', overflow: 'hidden', flexWrap: 'wrap', alignItems: 'center' }}>
                            {
                                dashboard?.length > 0 && dashboard.map((item: any, idx: any) => {
                                    return (
                                        <Pressable
                                            key={idx}
                                            onPress={() => {
                                                navigation.navigate({
                                                    name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.name,
                                                    params: item
                                                })
                                            }}
                                        >
                                            <SquareBox
                                                AssIcon={<MaterialIcons name="assessment" color="white" size={20} />}
                                                AssCount={item.assessmentCount}
                                                NoteIcon={<MaterialCommunityIcons name="bookshelf" color="white" size={20} />}
                                                NoteCount={item.studentNoteCount}
                                                studentCountIcon={<FontAwesome5 name="users" color="white" size={20} />}
                                                studentCount={item.studentCounts}
                                                className={item.sessionClass}
                                            />
                                        </Pressable>


                                    )
                                })
                            }

                        </HStack>
                    }
                </Stack>

            </ScrollView>
        </ProtectedTeacher>

    );
};

export default TeacherDashboard;