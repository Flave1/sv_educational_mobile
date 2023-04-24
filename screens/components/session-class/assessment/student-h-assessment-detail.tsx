import React, { useState, useEffect, useMemo, useRef } from "react";
import { Divider, HStack, Pressable, Stack } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectItem } from "../../../../models/select-item";
import { getStudentAssessment, getStudentFeedback, scoreAssessment } from "../../../../store/actions/assessment-actions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomText from "../../layouts/CustomText";
import RenderHtml from 'react-native-render-html';
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import Entypo from "react-native-vector-icons/Entypo";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import BottomUpComponent from "../../layouts/bottom-up-component";
import { HomeAssessmentFeedbackList } from "./home-assessment-feedback-list";
import { AttachmentList } from "../../layouts/attachment-list";
import CustomTextInput from "../../layouts/CustomTextInput";
import CustomTextArea from "../../layouts/CustomTextArea";
import { AppPurple } from "../../../../tools/color";
import CustomButton from "../../layouts/CustomButton";
const StudentHomeAssessmentDetail = ({ dispatch, state, backgroundColor, navigation, route }: any) => {
    const [homeAsessmentFeedbackId, setHomeAsessmentFeedbackId] = useState<string>(route.params.homeAsessmentFeedbackId);
    const { feedback, assessment, students } = state.assessmentState;
    const [sessionClass] = useState<SelectItem>(route.params.sessionClass.sessionClass);
    const [teacherFeedback, setTeacherFeedback] = useState({ score: 0, comment: 'reviewed' });

    console.log('sessionClass', sessionClass);


    useEffect(() => {
        homeAsessmentFeedbackId && getStudentFeedback(homeAsessmentFeedbackId)(dispatch)
    }, [homeAsessmentFeedbackId])



    useEffect(() => {
        if (feedback) {
            const payload = {
                score: feedback?.score,
                comment: feedback?.comment
            };
            setTeacherFeedback(payload);
        }
    }, [feedback])


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
        <ProtectedTeacher backgroundColor={backgroundColor} currentScreen="Assessment">
            <BottomSheetModalProvider>
                <ScrollView>
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
                                        getStudentAssessment(assessment.homeAssessmentId, sessionClass.value, openOrCloseModal)(dispatch)
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

                                <Text style={{ marginTop: 20 }}>Score Student</Text>
                                <Divider style={{ backgroundColor: 'grey' }} />
                                <Stack spacing={10}>
                                    <Stack style={{ flex: 1, marginTop: 5 }}>
                                        <CustomTextArea
                                            placeholder='Enter feedback comment'
                                            autoCapitalize='none'
                                            keyboardAppearance='dark'
                                            returnKeyType='go'
                                            returnKeyLabel='go'
                                            height={100}
                                            defaultValue={teacherFeedback.comment}
                                            onChange={(e: any) => {
                                                teacherFeedback.comment = e.nativeEvent.text;
                                                setTeacherFeedback(teacherFeedback);
                                            }}
                                        />
                                    </Stack>
                                    <HStack spacing={10} style={{ marginBottom: 20 }}>
                                        <View style={{ width: '50%' }}>
                                            <CustomTextInput
                                                placeholder='Score'
                                                autoCapitalize='none'
                                                keyboardAppearance='dark'
                                                keyboardType='numeric'
                                                returnKeyType='go'
                                                returnKeyLabel='go'
                                                defaultValue={teacherFeedback.score}
                                                onChange={(e: any) => {
                                                    teacherFeedback.score = Number(e.nativeEvent.text);
                                                    setTeacherFeedback(teacherFeedback);
                                                }}
                                            />
                                        </View>
                                        <View style={{ width: '40%', justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <CustomButton
                                                backgroundColor={AppPurple}
                                                title="Submit" onPress={() => {
                                                    scoreAssessment(
                                                        homeAsessmentFeedbackId,
                                                        teacherFeedback.score,
                                                        teacherFeedback.comment,
                                                        assessment.homeAssessmentId,
                                                        sessionClass.value,
                                                        openOrCloseModal
                                                    )(dispatch)
                                                }}
                                            />
                                        </View>
                                    </HStack>

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
                        dispatch={dispatch}
                        sessionClass={sessionClass}
                        navigation={navigation} />
                </BottomUpComponent>

                <BottomUpComponent
                    bottomSheetModalRef={studentAttachmentModalRef}
                    snapPoints={studentAttachmentSnapPoints}
                    openOrCloseModal={openOrCloseStudentAttachmentModal}>
                    <AttachmentList
                        attachments={feedback?.files}
                        openOrCloseStudentAttachmentModal={openOrCloseStudentAttachmentModal} />
                </BottomUpComponent>

            </BottomSheetModalProvider>
        </ProtectedTeacher>

    );
};


const style = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold', padding: 3
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap', color: 'black', padding: 3 }
})


export default StudentHomeAssessmentDetail;

