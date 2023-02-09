import React, { useState, useEffect } from "react";
import { Badge, HStack, Pressable, Stack } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SelectItem } from "../../../../models/select-item";
import { getAssessmentStudents, getStudentFeedback } from "../../../../store/actions/assessment-actions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomText from "../../layouts/CustomText";
import BottomUpView from "../../layouts/bottom-up";
import Entypo from "react-native-vector-icons/Entypo";
import { screens } from "../../../../screen-routes/navigation";
const StudentHomeAssessmentDetail = ({ dispatch, state, backgroundColor, persistedUser, navigation, route }: any) => {
    const [homeAsessmentFeedbackId] = useState<string>(route.params.homeAsessmentFeedbackId);
    const [showBottomUpComponent, setBottomUpComponent] = useState<boolean>(false);
    const { feedback, assessment, students } = state.assessmentState;
    const [sessionClass] = useState<SelectItem>(route.params.sessionClass);


    useEffect(() => {
        students.length > 0 && setBottomUpComponent(true)
    }, [students])

    console.log('feedback', feedback);
    console.log('homeAsessmentFeedbackId', homeAsessmentFeedbackId);

    useEffect(() => {
        getStudentFeedback(persistedUser.baseUrlSuffix, homeAsessmentFeedbackId)(dispatch)
    }, [homeAsessmentFeedbackId])

    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            <ScrollView>
                <Stack spacing={10} style={{ flex: 1, margin: 10, }}>
                    <Stack style={{ flex: 0 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={20} />} title={'-' + sessionClass?.text + ' Assessment'} />
                            <HStack style={{ width: 100, justifyContent: 'center' }}>
                                <CustomText title={students?.length} />
                                <Pressable onPress={() => {
                                    getAssessmentStudents(assessment.homeAssessmentId, sessionClass.value, persistedUser.baseUrlSuffix)(dispatch)
                                }}>
                                    <CustomText title={<FontAwesome5 name="users" size={20} />} />
                                </Pressable>
                            </HStack>
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
                                <HStack>
                                    <Text style={style.label}>Student Name: </Text>
                                    <CustomText style={style.text} title={feedback?.studentName} />
                                </HStack>
                            </Stack>
                            <Stack style={{ borderColor: 'grey', borderWidth: 1, flex: 1, borderRadius: 10, minHeight: 400 }}>
                                <CustomText title={feedback?.content} />
                            </Stack>
                            <CustomText style={style.label} title="Comment" />
                            <Stack style={{ borderColor: 'grey', borderWidth: 1, flex: 1, borderRadius: 10, minHeight: 90 }}>
                                <CustomText title={feedback?.comment} />
                            </Stack>

                        </Stack>


                    </Stack>

                </Stack>
            </ScrollView>
            {/* <BottomUpView backgroundColor={backgroundColor} show={showBottomUpComponent} setBottomUpComponent={setBottomUpComponent}>
                <ScrollView>
                    <Stack>
                        <HStack spacing={10}>
                            <Stack style={{ flex: 5 }}><Text style={style.label}>Student Name</Text></Stack>
                            <Stack style={{ flex: 3 }}><Text style={style.label}>Status</Text></Stack>
                            <Stack style={{ flex: 2 }}><Text style={style.label}>Score</Text></Stack>
                        </HStack>
                        {
                            students?.map((item: any, idx: any) => {
                                return (
                                    <HStack overflow="scroll" style={{ overflow: 'scroll' }} spacing={0} key={idx}>
                                        <Stack style={{ flex: 5 }}><CustomText style={style.text} title={item.studentName} /></Stack>
                                        <Stack style={{ flex: 3 }}>
                                            <CustomText
                                                style={style.text}
                                                title={item.status == "not started" ?
                                                    <Badge color="red" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
                                                    : item.status === "submitted" ? <Badge color="green" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} /> : item.status} /></Stack>
                                        <Stack style={{ flex: 1 }}><CustomText style={style.text} title={item.score} /></Stack>
                                        <Stack style={{ flex: 1 }}>
                                            <Pressable
                                                onPress={() => {
                                                    setBottomUpComponent(false)
                                                    navigation.navigate({
                                                        name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.detail.screens.feedback.name,
                                                        params: {
                                                            sessionClass: sessionClass,
                                                            homeAsessmentFeedbackId: item.homeAsessmentFeedbackId
                                                        }
                                                    })
                                                }}>
                                                <CustomText style={style.text} title={<Entypo name="eye" size={30} />} />
                                            </Pressable>
                                        </Stack>
                                    </HStack>
                                )
                            })
                        }
                    </Stack>
                </ScrollView>
            </BottomUpView> */}



        </ProtectedTeacher>

    );
};


const style = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold'
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap' }
})


export default StudentHomeAssessmentDetail;