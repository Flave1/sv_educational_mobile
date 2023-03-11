import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box, HStack, Pressable, Stack } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "../../layouts/CustomText";
import CustomDropdownInput from "../../layouts/CustomDropdownInput";
import { ScrollView, View } from "react-native";
import HomeAssessmentBox from "./home-assessemnt-box";
import { GetClassGroups, GetClassSubjects, GetTutorClasses } from "../../../../store/actions/class-properties-actions";
import { SelectItem } from "../../../../models/select-item";
import { GetAssessments } from "../../../../store/actions/assessment-actions";
import { HomeAssessment } from "../../../../models/class-properties/home-assessment";
import { ClassSubjects } from "../../../../models/class-properties/class-subjects";
import Feather from 'react-native-vector-icons/Feather'
import ListComponent from "../../layouts/list-component";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { screens } from "../../../../screen-routes/navigation";
import { SetErrorToastState } from "../../../../store/actions/app-state-actions";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomUpComponent from "../../layouts/bottom-up-component";
// import { openOrCloseModal } from "../../../../tools/open-close-modal";
const AssessmentIndex = ({ dispatch, state, backgroundColor, persistedUser, navigation, route }: any) => {
    const { classSubjects, classGroup } = state.classPropsState;
    const { assessments, assessmentTypes } = state.assessmentState;

    const [type, setType] = useState<string>('home-assessment');
    const [sessionClass, setClass] = useState<SelectItem>(route.params);
    const [sessionClassSubject, setSubject] = useState<SelectItem>(new SelectItem());
    const [group, setGroup] = useState<SelectItem>({ value: 'all-students', text: 'All Students' });
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [showBottomUpComponent, setBottomUpComponent] = useState(false);
    const [selectItemId, setSelectedItem] = useState<string>('')

    useEffect(() => {
        GetTutorClasses()(dispatch);
    }, [])

    useEffect(() => {
        sessionClass?.value && GetClassSubjects(sessionClass?.value)(dispatch)
    }, [sessionClass?.value])

    useEffect(() => {
        sessionClassSubject?.value && GetClassGroups(sessionClass?.value, sessionClassSubject?.value)(dispatch)
    }, [sessionClassSubject?.value])

    useEffect(() => {
        GetAssessments(sessionClass?.value, sessionClassSubject?.value, group?.value, pageNumber)(dispatch)
    }, [sessionClass?.value, sessionClassSubject?.value, group?.value, pageNumber])

    const allStudentGrp = {
        groupId: "all-students",
        groupName: "All Students",
    }



    const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const snapPoints = useMemo(() => ["90%"], []);
    const [modalActionState, setModalActionState] = useState(false);
    const openOrCloseModal = (shouldOpenModal: boolean) => {
        setModalActionState(shouldOpenModal)
        if (shouldOpenModal && bottomSheetModalRef.current) {
            // setSelectedSchool(item);
            bottomSheetModalRef.current.present();
        } else if (bottomSheetModalRef.current) {
            // setSelectedSchool(new School());
            bottomSheetModalRef.current.close();
        }
    };


    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            <BottomSheetModalProvider>
                <Stack spacing={10} style={{ flex: 1 }}>
                    <Stack style={{ flex: 0, marginHorizontal: 21 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={25} />} title={'-' + sessionClass.text} />
                            <View style={{ width: 235 }}>
                                <CustomDropdownInput
                                    data={assessmentTypes}
                                    height={40}
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
                        <Box w={184}  >
                            <View >
                                <CustomDropdownInput data={classSubjects}
                                    searchPlaceHolder="Search"
                                    height={40}
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
                        <Box w={184}  >
                            <View >
                                <CustomDropdownInput data={[allStudentGrp, ...classGroup]}
                                    searchPlaceHolder="Search"
                                    height={40}
                                    defaultButtonText="All Students"
                                    defaultValue={'all-students'}
                                    disabled={sessionClassSubject.value === ''}
                                    buttonTextAfterSelection={(selectedItem: any, index: any) => {
                                        return selectedItem.groupName
                                    }}
                                    rowTextForSelection={(item: any, index: any) => {
                                        return item.groupName
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
                                                openOrCloseModal(!modalActionState)
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

                </Stack>

                <BottomUpComponent bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints}>
                    <Stack>
                        <ListComponent text={'View/detail'} icon={<Feather name="file-plus" size={20} />} onPress={() => {
                            openOrCloseModal(false)
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
                </BottomUpComponent>
            </BottomSheetModalProvider>
        </ProtectedTeacher>

    );
};



export default AssessmentIndex;