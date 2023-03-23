import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box, HStack, Pressable, Stack } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "../../layouts/CustomText";
import CustomDropdownInput from "../../layouts/CustomDropdownInput";
import { ScrollView, View, Alert } from "react-native";
import HomeAssessmentBox from "./home-assessemnt-box";
import { GetClassGroups, GetClassSubjects, GetTutorClasses } from "../../../../store/actions/class-properties-actions";
import { SelectItem } from "../../../../models/select-item";
import { deleteHomeAssessment, GetAssessments, getHomeAssessmentScoreRecords, open_closeHomeAssessment } from "../../../../store/actions/assessment-actions";
import { HomeAssessment } from "../../../../models/class-properties/home-assessment";
import { ClassSubjects } from "../../../../models/class-properties/class-subjects";
import Feather from 'react-native-vector-icons/Feather'
import ListComponent from "../../layouts/list-component";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { screens } from "../../../../screen-routes/navigation";
import { setErrorToastState } from "../../../../store/actions/app-state-actions";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomUpComponent from "../../layouts/bottom-up-component";
import { HomeAssessmentScoreRecord } from "../models/assessment";
import { HomeAssessmentScoreRecordList } from "./home-assessment-scorerecord-list";
import { Fab } from "native-base";
// import { openOrCloseModal } from "../../../../tools/open-close-modal";
const AssessmentIndex = ({ dispatch, state, backgroundColor, navigation, route }: any) => {
    const { classSubjects, classGroup } = state.classPropsState;
    const { assessments, assessmentTypes, score_reocrds } = state.assessmentState;

    const [type, setType] = useState<string>('home-assessment');
    const [sessionClass, setClass] = useState<SelectItem>(route.params);
    const [sessionClassSubject, setSubject] = useState<SelectItem>(new SelectItem());
    const [group, setGroup] = useState<SelectItem>({ value: 'all-students', text: 'All Students' });
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [selectItemId, setSelectedItem] = useState<string>('')
    const [assessmentStatus, setSelectedAssessmentStatus] = useState<string>("");
    const [homeAssessmentScoreRecorList, setHomeAssessmentScoreRecorList] = useState<HomeAssessmentScoreRecord>();


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

    useEffect(() => {
        setHomeAssessmentScoreRecorList(score_reocrds)
    }, [score_reocrds])

    const allStudentGrp = {
        groupId: "all-students",
        groupName: "All Students",
    }

    const snapPoints = useMemo(() => ["90%"], []);
    const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const [modalActionState, setModalActionState] = useState(false);
    const openOrCloseModal = (shouldOpenModal: boolean, assessmentStatus: string) => {
        setSelectedAssessmentStatus(assessmentStatus)
        setModalActionState(shouldOpenModal)
        if (shouldOpenModal && bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        } else if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.close();
        }
    };

    const ScoreRecordBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const [scoreRecordModalActionState, setScoreRecordModalActionState] = useState(false);
    const openOrCloseScoreRecordModalActionStateModal = (shouldOpenModal: boolean) => {
        setModalActionState(shouldOpenModal)
        if (shouldOpenModal && ScoreRecordBottomSheetModalRef.current) {
            ScoreRecordBottomSheetModalRef.current.present();
        } else if (ScoreRecordBottomSheetModalRef.current) {
            ScoreRecordBottomSheetModalRef.current.close();
        }
    };

    const showDialog = () => {
        Alert.alert(
            'Delete Assessment',
            'Are you sure you want to delete this assessment ?',
            [
                {
                    text: 'CANCEL',
                    onPress: () => { '' },
                },
                {
                    text: 'YES',
                    onPress: () => {
                        openOrCloseModal(false, "");
                        deleteHomeAssessment(selectItemId, sessionClass.value, sessionClassSubject.value, group.value)(dispatch);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const params = {
        HomeAssessmentId: selectItemId,
        sessionClass: { name: sessionClass },
        sessionClassSubject: { name: sessionClassSubject },
        group: { name: group },
        refreshCount: 1
    }

    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            <BottomSheetModalProvider>
                <Stack spacing={10} style={{ flex: 1 }} onTouchStart={() => {
                    openOrCloseModal(false, "");
                    openOrCloseScoreRecordModalActionStateModal(false);
                }
                }>
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
                                        setErrorToastState('Class must be selected')(dispatch);
                                        return;
                                    }
                                    if (!sessionClassSubject.value) {
                                        setErrorToastState('Subject must be selected')(dispatch);
                                        return;
                                    }
                                    if (!group.value) {
                                        setErrorToastState('Class  group must be selected')(dispatch);
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
                                assessments.map((item: HomeAssessment, idx: number) => {
                                    return (
                                        <Pressable
                                            key={idx}
                                            onTouchStart={() => {
                                                setSelectedItem(item.homeAssessmentId)
                                                openOrCloseModal(!modalActionState, item.status)
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

                <BottomUpComponent bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} openOrCloseModal={openOrCloseModal}>
                    <Stack>
                        <ListComponent text={'View/detail'} icon={<Feather name="file-plus" size={20} />} onPress={() => {
                            openOrCloseModal(false, "")
                            navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.detail.name,
                                params: params
                            })
                        }} />
                        <ListComponent text={'Edit'} icon={<AntDesign name="edit" size={20} />} onPress={() => {
                            openOrCloseModal(false, "")
                            navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.create.name,
                                params: params
                            })
                        }} />
                        <ListComponent
                            text={assessmentStatus === "close" ? 'Close assessment' : 'Open assessment'}
                            icon={<Entypo name={assessmentStatus === "close" ? "eye-with-line" : "eye"} size={20} />}
                            onPress={() => {
                                openOrCloseModal(false, "")
                                open_closeHomeAssessment(selectItemId, sessionClass.value, sessionClassSubject.value, group.value)(dispatch);
                            }} />
                        <ListComponent text={'Delete'} icon={<Ionicons name="trash-bin" size={20} />}
                            onPress={() => showDialog()} />
                        <ListComponent text={'Score Record'} icon={<Ionicons name="list-circle" size={20} />}
                            onPress={() => {
                                openOrCloseModal(false, "")
                                getHomeAssessmentScoreRecords(selectItemId, openOrCloseScoreRecordModalActionStateModal)(dispatch);
                            }} />
                    </Stack>
                </BottomUpComponent>

                <BottomUpComponent bottomSheetModalRef={ScoreRecordBottomSheetModalRef} snapPoints={snapPoints} openOrCloseModal={openOrCloseScoreRecordModalActionStateModal}>
                    <HomeAssessmentScoreRecordList students={homeAssessmentScoreRecorList} homeAssessmentId={selectItemId} dispatch={dispatch} openOrCloseModal={openOrCloseScoreRecordModalActionStateModal}/>
                </BottomUpComponent>
            </BottomSheetModalProvider>
        </ProtectedTeacher>

    );
};



export default AssessmentIndex;