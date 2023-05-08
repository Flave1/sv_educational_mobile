import React, { useState } from "react";
import { Pressable, View } from "react-native";
import ProtectedTeacher from "../authentication/protected-teacher";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { GetDashboardData } from "../../store/actions/dasboard-actions";
import { screens } from "../../screen-routes/navigation";
import { ScrollView } from "react-native-gesture-handler";
import { AuhtService } from "../../services/AuthService";
import SquareBox from "../layouts/sqaure-box";
import TeacherAnnouncementBox from "../layouts/teacher-announcement-box";
import { HStack, Stack } from "@react-native-material/core";
const TeacherDashboard = ({ dispatch, state, backgroundColor, navigation }: any) => {

    const { dashboard } = state.dasboardState;
    React.useEffect(() => {
        AuhtService.IsUserAuthenticated().then((loggedIn: Boolean) => {
            if (!loggedIn) {
                navigation.navigate(screens.scenes.auth.screens.signin.name);
                return
            } else
                GetDashboardData()(dispatch)
        })
    }, []);
    const [params, setParams] = useState({});

    const handleClick = (item: any) => {
        const param = {
            name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.name,
            params: item
        }
        setParams(param);
        navigation.navigate(param);
    }


    return (
        <ProtectedTeacher backgroundColor={backgroundColor} currentScreen="Dashboard" params={params}>
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
                                                handleClick(item);
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