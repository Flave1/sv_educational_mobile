import React, { useState, useEffect } from "react";
import { Box, HStack, Icon, Pressable, Stack, Text } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "../../layouts/CustomText";
import CustomDropdownInput from "../../layouts/CustomDropdownInput";
import { ScrollView, TouchableOpacity, View } from "react-native";
import HomeAssessmentBox from "./home-assessemnt-box";
import { GetClassGroups, GetClassSubjects, GetTutorClasses } from "../../../../store/actions/class-properties-actions";
import { SelectItem } from "../../../../models/select-item";
import { GetAssessments } from "../../../../store/actions/assessment-actions";
import { HomeAssessment } from "../../../../models/class-properties/home-assessment";
import { TutorClass } from "../../../../models/class-properties/Tutor-class";
import { ClassSubjects } from "../../../../models/class-properties/class-subjects";
import BottomUpView from "../../layouts/bottom-up";
import Feather from 'react-native-vector-icons/Feather'
import ListComponent from "../../layouts/list-component";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { screens } from "../../../../screen-routes/navigation";
import { SetErrorToastState } from "../../../../store/actions/app-state-actions";
const AssessmentIndex = ({ dispatch, state, backgroundColor, persistedUser, navigation, route }: any) => {
    const { tutorClasses, classSubjects, classGroup } = state.classPropsState;
    const { assessments, assessmentTypes } = state.assessmentState;

    const [type, setType] = useState<string>('home-assessment');
    const [sessionClass, setClass] = useState<SelectItem>(route.params);
    const [sessionClassSubject, setSubject] = useState<SelectItem>(new SelectItem());
    const [group, setGroup] = useState<SelectItem>({ value: 'all-students', text: 'All Students' });
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [showBottomUpComponent, setBottomUpComponent] = useState(false);
    const [selectItemId, setSelectedItem] = useState<string>('')

    useEffect(() => {
        if (persistedUser.baseUrlSuffix) {
            GetTutorClasses(persistedUser.baseUrlSuffix)(dispatch);
        }
    }, [])

    useEffect(() => {
        if (persistedUser.baseUrlSuffix) {
            sessionClass?.value && GetClassSubjects(persistedUser.baseUrlSuffix, sessionClass?.value)(dispatch)
        }
    }, [sessionClass?.value])

    useEffect(() => {
        if (persistedUser.baseUrlSuffix) {
            sessionClassSubject?.value && GetClassGroups(persistedUser.baseUrlSuffix, sessionClass?.value, sessionClassSubject?.value)(dispatch)
        }
    }, [sessionClassSubject?.value])

    useEffect(() => {
        if (persistedUser.baseUrlSuffix) {
            GetAssessments(persistedUser.baseUrlSuffix, sessionClass?.value, sessionClassSubject?.value, group?.value, pageNumber)(dispatch)
        }
    }, [sessionClass?.value, sessionClassSubject?.value, group?.value, pageNumber])


    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            <Stack spacing={10} style={{ flex: 1 }}>
                <Stack style={{ flex: 0, marginHorizontal: 21 }}>
                    <HStack style={{ alignItems: 'center' }}>
                        <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={25} />} title={'-' + sessionClass.text} />
                        <View style={{ width: 235 }}>
                            <CustomDropdownInput
                                data={assessmentTypes}
                                defaultButtonText="Home Assessment"
                                defaultValue={type}
                                onSelect={(selectedItem: SelectItem, index: any) => {
                                    setType(selectedItem.value)
                                }}
                                buttonTextAfterSelection={(selectedItem: SelectItem, index: any) => {
                                    return selectedItem.text
                                }}
                                rowTextForSelection={(item: SelectItem, index: any) => {
                                    return item.text
                                }}
                            />
                        </View>
                        <Pressable
                            style={{ paddingHorizontal: 10 }}
                            onPress={() => {
                                if (!sessionClass.value) {
                                    SetErrorToastState('Class must be selected')(dispatch);
                                    return;
                                }
                                if (!sessionClassSubject.value) {
                                    SetErrorToastState('Subject must be selected')(dispatch);
                                    return;
                                }
                                if (!group.value) {
                                    SetErrorToastState('Class  group must be selected')(dispatch);
                                    return;
                                }

                                navigation.navigate({
                                    name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.create.name,
                                    params: {
                                        sessionClass: { name: sessionClass },
                                        sessionClassSubject: { name: sessionClassSubject },
                                        group: { name: group }
                                    }
                                })
                            }}>
                            <CustomText title={<Ionicons size={30} name="md-add-circle" />} />
                        </Pressable>
                    </HStack>
                </Stack>
                <HStack spacing={1} style={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                    <Box w={184} h={50} >
                        <View >
                            <CustomDropdownInput data={classSubjects}
                                searchPlaceHolder="Search"
                                defaultButtonText="Select Subject"
                                disabled={sessionClass.value === ''}
                                search={true}
                                buttonTextAfterSelection={(selectedItem: ClassSubjects, index: any) => {
                                    return selectedItem.subjectName
                                }}
                                rowTextForSelection={(item: ClassSubjects, index: any) => {
                                    return item.subjectName
                                }}
                                onSelect={(selectedItem: ClassSubjects, index: any) => {
                                    setSubject({ value: selectedItem.sessionClassSubjectId, text: selectedItem.subjectName })
                                }}
                            />
                        </View>

                    </Box>
                    <Box w={184} h={50} >
                        <View >
                            <CustomDropdownInput data={classGroup}
                                searchPlaceHolder="Search"
                                defaultButtonText="All Students"
                                defaultValue={'all-students'}
                                disabled={sessionClassSubject.value === ''}
                                search={true}
                                buttonTextAfterSelection={(selectedItem: any, index: any) => {
                                    return selectedItem.groupId
                                }}
                                rowTextForSelection={(item: any, index: any) => {
                                    return item.subjectName
                                }}
                                onSelect={(selectedItem: any, index: any) => {
                                    setGroup({ value: selectedItem.groupId, text: selectedItem.groupName })
                                }}
                            />
                        </View>

                    </Box>
                </HStack>
                <ScrollView style={[{ flex: 1 }]}  >
                    <HStack style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        {
                            assessments.map((item: HomeAssessment, idx: any) => {
                                return (
                                    <Pressable
                                        key={idx}
                                        onPress={() => {
                                            setSelectedItem(item.homeAssessmentId)
                                            setBottomUpComponent(true)
                                        }}>

                                        <HomeAssessmentBox
                                            title={item.title}
                                            deadlineDate={item.dateDeadLine + ':' + item.timeDeadLine}
                                            status={item.status}
                                            group={item.sessionClassGroupName}
                                            subject={item.sessionClassSubjectName} />
                                    </Pressable>
                                )
                            })
                        }
                    </HStack>

                </ScrollView>




                <BottomUpView backgroundColor={backgroundColor} show={showBottomUpComponent} setBottomUpComponent={setBottomUpComponent}>
                    <Stack >
                        <ListComponent text={'View/detail'} icon={<Feather name="file-plus" size={20} />} onPress={() => {
                            navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.detail.name,
                                params: {
                                    HomeAssessmentId: selectItemId,
                                    sessionClass: { name: sessionClass },
                                    sessionClassSubject: { name: sessionClassSubject },
                                    group: { name: group }
                                }
                            })
                        }} />
                        <ListComponent text={'Edit'} icon={<AntDesign name="edit" size={20} />} onPress={() => console.log('pressed')} />
                        <ListComponent text={'Open'} icon={<Entypo name="eye" size={20} />} onPress={() => console.log('pressed')} />
                        <ListComponent text={'Delete'} icon={<Ionicons name="trash-bin" size={20} />} onPress={() => console.log('pressed')} />
                        <ListComponent text={'Score Record'} icon={<Ionicons name="list-circle" size={20} />} onPress={() => console.log('pressed')} />
                    </Stack>
                </BottomUpView>
            </Stack>

        </ProtectedTeacher>

    );
};



export default AssessmentIndex;