import React, { useState, useEffect, useMemo, useRef } from "react";
import { HStack, Pressable, Stack } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SelectItem } from "../../../../models/select-item";
import { getAssessmentStudents, getStudentFeedback } from "../../../../store/actions/assessment-actions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomText from "../../layouts/CustomText";
import RenderHtml from 'react-native-render-html';
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Entypo from "react-native-vector-icons/Entypo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomUpComponent from "../../layouts/bottom-up-component";
import { HomeAssessmentFeedbackList } from "./home-assessment-feedback-list";
import { AttachmentList } from "../../layouts/attachment-list";
const StudentHomeAssessmentDetail = ({ dispatch, state, backgroundColor, navigation, route }: any) => {
    const [homeAsessmentFeedbackId] = useState<string>(route.params.homeAsessmentFeedbackId);
    const { feedback, assessment, students } = state.assessmentState;
    const [sessionClass] = useState<SelectItem>(route.params.sessionClass);


    useEffect(() => {
        getStudentFeedback(homeAsessmentFeedbackId)(dispatch)
    }, [homeAsessmentFeedbackId])

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

    // STUDENT ATTACHMENT MODAL############## STUDENT ATTACHMENT MODAL
    const studentAttachmentModalRef = useRef<BottomSheetModalMethods>(null);
    const studentAttachmentSnapPoints = useMemo(() => ["100%"], []);

    const [studentAttachmentModalState, setStudentAttachmentModalState] = useState(false);
    const openOrCloseStudentAttachmentModal = (shouldOpenModal: boolean) => {
        setStudentAttachmentModalState(shouldOpenModal)
        if (shouldOpenModal && studentAttachmentModalRef.current) {
            studentAttachmentModalRef.current.present();
        } else if (studentAttachmentModalRef.current) {
            studentAttachmentModalRef.current.close();
        }
    };
    // STUDENT ATTACHMENT MODAL############## STUDENT ATTACHMENT MODAL

    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            <BottomSheetModalProvider>
                <ScrollView onTouchStart={() => {
                    openOrCloseModal(false);
                }
                }>
                    <Stack spacing={10} style={{ flex: 1, margin: 10, }}>
                        <Stack style={{ flex: 0 }}>
                            <HStack style={{ alignItems: 'center' }}>
                                <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={20} />} title={'-' + sessionClass?.text + ' Assessment'} />

                                <HStack style={{ width: 70, justifyContent: 'center' }}>
                                    <CustomText title={feedback?.files?.length} />
                                    <Pressable onTouchStart={() => {
                                        openOrCloseStudentAttachmentModal(!studentAttachmentModalState)
                                    }}>
                                        <CustomText title={<Entypo name="attachment" size={20} />} />
                                    </Pressable>
                                </HStack>
                                <CustomText title={<MaterialIcons name="zoom-out-map" size={20} />} />
                                <HStack style={{ width: 60, justifyContent: 'center' }}>
                                    <CustomText title={students?.length} />
                                    <Pressable onTouchStart={() => {
                                        getAssessmentStudents(assessment.homeAssessmentId, sessionClass.value, openOrCloseModal)(dispatch)
                                    }}>
                                        <CustomText title={<FontAwesome5 name="users" size={20} />} />
                                    </Pressable>
                                </HStack>
                            </HStack>
                        </Stack>

                        <Stack spacing={10} style={{ height: '60%' }}>
                            <Stack spacing={5}>
                                <Stack>
                                    <HStack>
                                        <Text style={style.label}>Student Name: </Text>
                                        <CustomText style={style.text} title={feedback?.studentName} />
                                    </HStack>
                                    <HStack>
                                        <Text style={style.label}>Submition Date: </Text>
                                        <CustomText style={style.text} title={assessment?.dateDeadLine} />
                                    </HStack>
                                    <HStack>
                                        <Text style={style.label}>Subject: </Text>
                                        <CustomText style={style.text} title={assessment?.sessionClassSubjectName} />
                                    </HStack>
                                    <HStack>
                                        <Text style={style.label}>Title: </Text> <CustomText style={style.text} title={assessment?.title} />
                                    </HStack>
                                </Stack>
                                <Stack style={{ borderColor: 'grey', borderWidth: 1, flex: 1, borderRadius: 10, minHeight: 400, padding: 5 }}>
                                    <ScrollView style={{ flex: 1 }} >
                                        {
                                            feedback?.content && <RenderHtml
                                                source={{ html: feedback.content }}
                                                contentWidth={200}
                                            />
                                        }
                                    </ScrollView>
                                </Stack>
                                <CustomText style={style.label} title="Comment" />
                                <Stack style={{ borderColor: 'grey', borderWidth: 1, flex: 1, borderRadius: 10, minHeight: 90 }}>
                                    <ScrollView style={{ flex: 1 }} >
                                        {
                                            feedback?.comment && <RenderHtml
                                                source={{ html: feedback.comment }}
                                                contentWidth={200}
                                            />
                                        }
                                    </ScrollView>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </ScrollView>
                <BottomUpComponent bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} openOrCloseModal={openOrCloseModal}>
                    <HomeAssessmentFeedbackList students={students} openOrCloseModal={openOrCloseModal} navigation={navigation} sessionClass={sessionClass} />
                </BottomUpComponent>
                <BottomUpComponent bottomSheetModalRef={studentAttachmentModalRef} snapPoints={studentAttachmentSnapPoints} openOrCloseModal={openOrCloseStudentAttachmentModal}>
                    <AttachmentList attachments={feedback?.files} openOrCloseStudentAttachmentModal={openOrCloseStudentAttachmentModal} />
                </BottomUpComponent>
            </BottomSheetModalProvider>
        </ProtectedTeacher>

    );
};


const style = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold'
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap', color: 'black', backgroundColor: '#139C85', padding: 3, borderRadius: 10 }
})


export default StudentHomeAssessmentDetail;

