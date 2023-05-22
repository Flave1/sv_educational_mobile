import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, HStack, Stack } from "@react-native-material/core";
import CustomDropdownInput from "../layouts/CustomDropdownInput";
import { View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ClassSubjects } from "../../models/class-properties/class-subjects";
import { SelectItem } from "../../models/select-item";
import ProtectedTeacher from "../authentication/protected-teacher";
import { connect } from "react-redux";
import { GetClassSubjects } from "../../store/actions/class-properties-actions";
import CustomScrollview from "../layouts/CustomScrollView";
import StudentNotesBox from "./studentnotes-box";
import BottomUpComponent from "../layouts/bottom-up-component";
import ListComponent from "../layouts/list-component";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { screens } from "../../screen-routes/navigation";
import Feather from "react-native-vector-icons/Feather";
import { setErrorToastState } from "../../store/actions/app-state-actions";
import { _paginationGetStudentnotes, getStudentnotes } from "../../store/actions/studentnote-actions";
import ScreenTitle from "../layouts/screen-title";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const StudentNoteIndex = (props: any) => {

    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [sessionClassSubject, setSubject] = useState<SelectItem>({ value: '', text: '', lookUpId: '' });
    const [selectedStatus, setStatus] = useState<SelectItem>({ value: '-1', text: 'All', lookUpId: '' });
    const [pageNumber] = useState<number>(1);
    const [selectItemId, setSelectedItem] = useState<string>('');

    
    useEffect(() => {
        sessionClass?.value && props.getSubjects(sessionClass?.value)
    }, [sessionClass?.value])


    useEffect(() => {
        sessionClass?.value && props.getAll(sessionClass?.value, sessionClassSubject.lookUpId, selectedStatus.value, pageNumber)
    }, [sessionClass?.value, sessionClassSubject.lookUpId, selectedStatus.value])


    const status = [
        { value: 0, text: 'Unreviewed' },
        { value: 1, text: 'Reviewed' },
        { value: 2, text: 'Saved' },
        { value: 3, text: 'In Progress' },
    ]


    const params = {
        HomeAssessmentId: selectItemId,
        sessionClass: sessionClass,
        sessionClassSubject: sessionClassSubject
    }

    const snapPoints = useMemo(() => ["90%"], []);
    const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const [modalActionState, setModalActionState] = useState(false);
    const openOrCloseModal = (shouldOpenModal: boolean) => {
        setModalActionState(shouldOpenModal)
        if (shouldOpenModal && bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        } else if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.close();
        }
    };

    return (
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Class Note">
            <BottomSheetModalProvider>
                <Stack spacing={10} style={{ flex: 1 }} >
                    <CustomScrollview
                        totalPages={props.totalPages}
                        pageNumber={props.pageNumber}
                        getAction={props.__getAll}
                        params={{ 'sessionClassId': sessionClass?.value, 'subjectId': sessionClassSubject.lookUpId, 'status': selectedStatus.value, pageNumber: 0 }}>
                        <HStack spacing={1} style={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                       
                            <ScreenTitle  icon={<MaterialCommunityIcons name="bookshelf" color="white" size={30} />} title={'-' + sessionClass.text + ' STUDENT NOTE'} />
                            <Box w={184} style={{marginTop:20}} >

                                <View >

                                    <CustomDropdownInput data={props.classSubjects}
                                        searchPlaceHolder="Search"
                                        height={40}
                                        defaultButtonText="Select Subject"
                                        // search={true}
                                        buttonTextAfterSelection={(selectedItem: ClassSubjects, index: any) => {
                                            return selectedItem.subjectName
                                        }}
                                        rowTextForSelection={(item: ClassSubjects, index: any) => {
                                            return item.subjectName
                                        }}
                                        onSelect={(selectedItem: ClassSubjects, index: any) => {
                                            setSubject({ value: selectedItem.sessionClassSubjectId, text: selectedItem.subjectName, lookUpId: selectedItem.subjectid })
                                        }}
                                    />
                                </View>

                            </Box>
                            <Box w={184} style={{marginTop:20, marginLeft:10}}  >
                                <View >
                                    <CustomDropdownInput data={status}
                                        searchPlaceHolder="Search"
                                        height={40}
                                        defaultButtonText="Select Status"
                                        default={0}
                                        buttonTextAfterSelection={(selectedItem: SelectItem, index: any) => {
                                            return selectedItem.text
                                        }}
                                        rowTextForSelection={(item: SelectItem, index: any) => {
                                            return item.text
                                        }}
                                        onSelect={(selectedItem: SelectItem, index: any) => {
                                            setStatus({ value: selectedItem.value, text: selectedItem.text, lookUpId: '' })
                                        }}
                                    />
                                </View>

                            </Box>
                        </HStack>

                        <HStack style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                            {
                                props.studentnotes?.map((item: any, idx: number) => {
                                    return (
                                        <StudentNotesBox
                                            item={item} key={idx}
                                            onPress={() => {
                                                setSelectedItem(item.studentNoteId)
                                                openOrCloseModal(!modalActionState)
                                            }}
                                        />
                                    )
                                })
                            }
                        </HStack>

                    </CustomScrollview>

                </Stack>

                <BottomUpComponent bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} openOrCloseModal={openOrCloseModal}>
                    <Stack>
                        <ListComponent text={'View/Details'} icon={<Feather name="info" size={20} />} onPress={() => {
                            openOrCloseModal(false);
                            props.navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.studentnote.screens.studentnoteDetails.name,
                                params: {
                                    studentNoteId: selectItemId,
                                }
                            })
                        }} />

                    </Stack>
                </BottomUpComponent>

            </BottomSheetModalProvider>
        </ProtectedTeacher>

    );
};


function mapStateToProps(state: any) {

    return {
        classSubjects: state.classPropsState.classSubjects,
        totalPages: state.studentnotesState.totalPages,
        pageNumber: state.studentnotesState.pageNumber,
        studentnotes: state.studentnotesState.studentnotes
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        getSubjects: (sessionClassId: string) => GetClassSubjects(sessionClassId)(dispatch),

        getAll: (sessionClassId: string, subjectId: string, status: number, pageNumber: number) =>
            getStudentnotes(sessionClassId, subjectId, status, pageNumber)(dispatch),

        __getAll: (params: any) => _paginationGetStudentnotes(params)(dispatch),
        setErrorToastState: (error: string) => setErrorToastState(error)(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentNoteIndex);
