import React, { useEffect, useState } from "react";
import { Box, HStack, Stack } from "@react-native-material/core";
import CustomDropdownInput from "../layouts/CustomDropdownInput";
import { View, Alert } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ClassSubjects } from "../../models/class-properties/class-subjects";
import { SelectItem } from "../../models/select-item";
import ProtectedTeacher from "../authentication/protected-teacher";
import { connect } from "react-redux";
import { GetClassSubjects } from "../../store/actions/class-properties-actions";
import CustomScrollview from "../layouts/CustomScrollView";
import ClassnotesBox from "./classnotes-box";
import { _paginationGetClassnotes, getClassnotes } from "../../store/actions/classnote-actions";
const ClassnoteIndex = (props: any) => {

    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [sessionClassSubject, setSubject] = useState<SelectItem>(new SelectItem());
    const [selectedStatus, setStatus] = useState<SelectItem>(new SelectItem());
    const [pageNumber] = useState<number>(1);
    const [selectItemId] = useState<string>('')

    useEffect(() => {
        sessionClass?.value && props.getSubjects(sessionClass?.value)
    }, [sessionClass?.value])


    useEffect(() => {
        sessionClass?.lookUpId && props.getAll(sessionClass?.lookUpId, sessionClassSubject.lookUpId, selectedStatus.value, pageNumber)
    }, [sessionClass?.lookUpId, sessionClassSubject.value, selectedStatus.value])


    const status = [
        { value: 0, text: 'Not Approved' },
        { value: 1, text: 'Approved' },
        { value: 2, text: 'Saved' },
        { value: 3, text: 'In Progress' },
        { value: -2, text: 'Unreviewed' }
    ]

    const showDialog = () => {
        Alert.alert(
            'Delete Class Note',
            'Are you sure you want to delete this class note ?',
            [
                {
                    text: 'CANCEL',
                    onPress: () => { '' },
                },
                {
                    text: 'YES',
                    onPress: () => {
                        // deleteHomeAssessment(selectItemId, sessionClass.value, sessionClassSubject.value, group.value)(dispatch);
                    },
                },
            ],
            { cancelable: false }
        );
    };


    const params = {
        HomeAssessmentId: selectItemId,
        sessionClass: { name: sessionClass },
        sessionClassSubject: { name: sessionClassSubject }
    }

    return (
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Class Note">
            <BottomSheetModalProvider>
                <Stack spacing={10} style={{ flex: 1 }} >
                    <CustomScrollview
                        totalPages={props.totalPages}
                        pageNumber={props.pageNumber}
                        getAction={props.__getAll}
                        params={(sessionClass.value).toString()}>
                        <HStack spacing={1} style={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            <Box w={184}  >
                                <View >
                                    <CustomDropdownInput data={props.classSubjects}
                                        searchPlaceHolder="Search"
                                        height={40}
                                        defaultButtonText="Select Subject"
                                        search={true}
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
                            <Box w={184}  >
                                <View >
                                    <CustomDropdownInput data={status}
                                        searchPlaceHolder="Search"
                                        height={40}
                                        defaultButtonText="Select Status"
                                        // disabled={sessionClass.value === ''}
                                        // search={true}
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
                                props.classnotes?.map((item: any, idx: number) => {
                                    return (
                                        <ClassnotesBox
                                            item={item} key={idx}
                                            onPress={() => {
                                                // setSelectedItem(item.classRegisterId)
                                                // openOrCloseModal(!modalActionState)
                                            }}
                                        />
                                    )
                                })
                            }
                        </HStack>

                    </CustomScrollview>

                </Stack>


            </BottomSheetModalProvider>
        </ProtectedTeacher>

    );
};


function mapStateToProps(state: any) {
    return {
        classSubjects: state.classPropsState.classSubjects,
        totalPages: state.classnotesState.totalPages,
        pageNumber: state.classnotesState.pageNumber,
        classnotes: state.classnotesState.classnotes
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        getSubjects: (sessionClassId: string) => GetClassSubjects(sessionClassId)(dispatch),

        getAll: (sessionClassId: string, subjectId: string, status: number, pageNumber: number) =>
            getClassnotes(sessionClassId, subjectId, status, pageNumber)(dispatch),

        __getAll: (sessionClassId: string, subjectId: string, status: number, pageNumber: number) =>
            _paginationGetClassnotes(sessionClassId, subjectId, status, pageNumber)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassnoteIndex);