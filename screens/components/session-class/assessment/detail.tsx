import React, { useState, useEffect, useMemo, useRef } from "react";
import { HStack, Pressable, Stack } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectItem } from "../../../../models/select-item";
import { getStudentAssessment, getSingleHomeAssessment } from "../../../../store/actions/assessment-actions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomText from "../../layouts/CustomText";
import BottomUpComponent from "../../layouts/bottom-up-component";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import RenderHtml from 'react-native-render-html';
import { HomeAssessmentFeedbackList } from "./home-assessment-feedback-list";
const AssessmentDetail = ({ dispatch, state, backgroundColor, persistedUser, navigation, route }: any) => {
    const [type] = useState<string>('home-assessment');
    const [sessionClass] = useState<SelectItem>(route.params.sessionClass.name);
    const [sessionClassSubject] = useState<SelectItem>(route.params.sessionClassSubject.name);
    const [group] = useState<SelectItem>(route.params.group.name);
    const [homeAssessmentId] = useState<string>(route.params.HomeAssessmentId);
    const { assessment, students } = state.assessmentState;

    
    useEffect(() => {
        homeAssessmentId && getSingleHomeAssessment(homeAssessmentId, sessionClass.value)(dispatch)
    }, [homeAssessmentId])

    // MODAL##############MODAL
    const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const snapPoints = useMemo(() => ["90%"], []);
    const [modalActionState, setModalActionState] = useState(false);
    const openOrCloseModal = (shouldOpenModal: boolean) => {
        setModalActionState(shouldOpenModal)
        if (shouldOpenModal && bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        } else if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.close();
        }
    };
    // MODAL#############MODAL
    return (
        <ProtectedTeacher backgroundColor={backgroundColor} currentScreen="Assessment">
            <BottomSheetModalProvider>
                <ScrollView>
                    <Stack spacing={10} style={{ flex: 1, margin: 10, }}>
                        <Stack style={{ flex: 0 }}>
                            <HStack style={{ alignItems: 'center' }}>
                                <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={20} />} title={'-' + sessionClass.text + ' Assessment'} />
                                <Pressable onPress={() => {
                                    getStudentAssessment(homeAssessmentId, sessionClass.value, openOrCloseModal)(dispatch)
                                }} style={{ width: 100, justifyContent: 'center' }}>
                                    <HStack>
                                        <CustomText title={assessment?.studentCount} />
                                        <View>
                                            <CustomText title={<FontAwesome5 name="users" size={20} />} />
                                        </View>
                                    </HStack>
                                </Pressable>
                                <CustomText title={<MaterialIcons name="zoom-out-map" size={20} />} />
                            </HStack>
                        </Stack>

                        <Stack spacing={10} style={{ height: '60%' }}>

                            <Stack spacing={5}>
                                <Stack>
                                    <HStack>
                                        <Text style={style.label}>Title: </Text> <CustomText style={{ textTransform: 'capitalize', fontWeight: 'bold' }} title={assessment?.title} />
                                    </HStack>
                                    <HStack>
                                        <Text style={style.label}>Subject: </Text>
                                        <CustomText style={style.text} title={assessment?.sessionClassSubjectName} />
                                    </HStack>
                                    <HStack>
                                        <Text style={style.label}>Submition Date: </Text>
                                        <CustomText style={style.text} title={assessment?.dateDeadLine} />
                                    </HStack>
                                </Stack>
                                <Stack style={{
                                    padding: 5,
                                    borderColor: 'grey',
                                    borderWidth: 1, flex: 1,
                                    borderRadius: 10,
                                    minHeight: 400
                                }}>
                                    <ScrollView style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                        padding: 3
                                    }} >
                                        {
                                            assessment?.content &&
                                            <RenderHtml
                                                source={{ html: assessment.content }}
                                                contentWidth={200}
                                            />
                                        }
                                    </ScrollView>
                                </Stack>
                                <CustomText style={style.label} title="Comment" />
                                <Stack style={{
                                    borderColor: 'grey',
                                    borderWidth: 1,
                                    flex: 1,
                                    borderRadius: 10,
                                    minHeight: 90,
                                    padding: 10
                                }}>
                                    <ScrollView style={{
                                        flex: 1,
                                        backgroundColor: 'white',
                                        borderRadius: 5,
                                        padding: 3
                                    }} >
                                        {
                                            assessment?.comment &&
                                            <RenderHtml
                                                source={{ html: assessment.comment }}
                                                contentWidth={200}
                                            />
                                        }
                                    </ScrollView>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </ScrollView>
                <BottomUpComponent
                    bottomSheetModalRef={bottomSheetModalRef}
                    snapPoints={snapPoints}
                    openOrCloseModal={openOrCloseModal}>
                    <HomeAssessmentFeedbackList
                        students={students}
                        openOrCloseModal={openOrCloseModal}
                        navigation={navigation}
                        sessionClass={sessionClass}
                        dispatch={dispatch}/>
                </BottomUpComponent>


            </BottomSheetModalProvider>
        </ProtectedTeacher>

    );
};


const style = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold'
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap', color: 'black' },
})


export default AssessmentDetail;