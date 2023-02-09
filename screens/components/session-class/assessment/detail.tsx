import React, { useState, useEffect } from "react";
import { Badge, HStack, Pressable, Stack } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SelectItem } from "../../../../models/select-item";
import { getAssessmentStudents, getSingleHomeAssessment } from "../../../../store/actions/assessment-actions";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomText from "../../layouts/CustomText";
import BottomUpView from "../../layouts/bottom-up";
import Entypo from "react-native-vector-icons/Entypo";
import { screens } from "../../../../screen-routes/navigation";
const AssessmentDetail = ({ dispatch, state, backgroundColor, persistedUser, navigation, route }: any) => {
    const [type] = useState<string>('home-assessment');
    const [sessionClass] = useState<SelectItem>(route.params.sessionClass.name);
    const [sessionClassSubject] = useState<SelectItem>(route.params.sessionClassSubject.name);
    const [group] = useState<SelectItem>(route.params.group.name);
    const [homeAssessmentId] = useState<string>(route.params.HomeAssessmentId);
    const [showBottomUpComponent, setBottomUpComponent] = useState(false);
    const { assessment, students } = state.assessmentState;

    useEffect(() => {
        getSingleHomeAssessment(homeAssessmentId, sessionClass.value, persistedUser.baseUrlSuffix)(dispatch)
    }, [homeAssessmentId])

    useEffect(() => {
        students.length > 0 && setBottomUpComponent(true)
    }, [students])
    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            <ScrollView>
                <Stack spacing={10} style={{ flex: 1, margin: 10, }}>
                    <Stack style={{ flex: 0 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={20} />} title={'-' + sessionClass.text + ' Assessment'} />
                            <HStack style={{ width: 100, justifyContent: 'center' }}>
                                <CustomText title={assessment?.studentCount} />
                                <Pressable onPress={() => {
                                    getAssessmentStudents(homeAssessmentId, sessionClass.value, persistedUser.baseUrlSuffix)(dispatch)
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
                            </Stack>
                            <Stack style={{ borderColor: 'grey', borderWidth: 1, flex: 1, borderRadius: 10, minHeight: 400 }}>
                                <CustomText title={assessment?.content} />
                            </Stack>
                            <CustomText style={style.label} title="Comment" />
                            <Stack style={{ borderColor: 'grey', borderWidth: 1, flex: 1, borderRadius: 10, minHeight: 90 }}>
                                <CustomText title={assessment?.comment} />
                            </Stack>

                        </Stack>


                    </Stack>

                </Stack>
            </ScrollView>
            <BottomUpView backgroundColor={backgroundColor} show={showBottomUpComponent} setBottomUpComponent={setBottomUpComponent}>
                <ScrollView>
                    <Stack>
                        <HStack>
                            <Stack style={{ flex: 5 }}><Text style={style.label}>Student Name</Text></Stack>
                            <Stack style={{ flex: 3 }}><Text style={style.label}>Status</Text></Stack>
                            <Stack style={{ flex: 1 }}><Text style={style.label}>Score</Text></Stack>
                            <Stack style={{ flex: 1 }}></Stack>
                        </HStack>
                        {
                            students.map((item: any, idx: any) => {
                                return (
                                    <HStack overflow="scroll" style={{ overflow: 'scroll', marginTop:10 }}  key={idx}>
                                        <Stack style={{ flex: 5 }}><CustomText style={style.text} title={item.studentName} /></Stack>
                                        <Stack style={{ flex: 3 }}>
                                            <CustomText
                                                style={style.text}
                                                title={item.status == "not started" ?
                                                    <Badge color="red" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
                                                    : item.status === "submitted" ? <Badge color="green" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} /> : item.status} />
                                        </Stack>
                                        <Stack style={{ flex: 1 }}><CustomText style={style.text} title={item.score} />
                                        </Stack>
                                        <Stack style={{ flex: 1, display: item.homeAsessmentFeedbackId ? 'flex' : 'none' }}>
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
                                                <CustomText style={style.text} title={<Entypo name="eye" size={20} />} />
                                            </Pressable>
                                        </Stack>
                                    </HStack>
                                )
                            })
                        }
                    </Stack>
                </ScrollView>
            </BottomUpView>



        </ProtectedTeacher>

    );
};


const style = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold'
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap' }
})


export default AssessmentDetail;