import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, HStack, Pressable, Stack } from "@react-native-material/core";
import CustomDropdownInput from "../layouts/CustomDropdownInput";
import { View, Alert, StyleSheet } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { ClassSubjects } from "../../models/class-properties/class-subjects";
import { SelectItem } from "../../models/select-item";
import ProtectedTeacher from "../authentication/protected-teacher";
import { connect } from "react-redux";
import { GetClassSubjects } from "../../store/actions/class-properties-actions";
import CustomScrollview from "../layouts/CustomScrollView";
import ClassnotesBox from "./classnotes-box";
import { _paginationGetClassnotes, downloadClassNote, getClassnotes } from "../../store/actions/classnote-actions";
import BottomUpComponent from "../layouts/bottom-up-component";
import ListComponent from "../layouts/list-component";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { screens } from "../../screen-routes/navigation";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import ReadClassnote from "./read-classnots";
import { setErrorToastState } from "../../store/actions/app-state-actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AppButtonColorDark, AppLightBlue } from "../../tools/color";
import SendClassnote from "./send-classnote";
import ShareClassnote from "./share-classnote";
import { FloatingButton } from "../layouts/floating-button";
import { saveAsFile } from "../../Utils/downloaded-files";

const ClassnoteIndex = (props: any) => {
    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [sessionClassSubject, setSubject] = useState<SelectItem>({ value: '', text: '', lookUpId: '' });
    const [selectedStatus, setStatus] = useState<SelectItem>({ value: '-1', text: 'All', lookUpId: '' });
    const [pageNumber] = useState<number>(1);
    const [selectItemId, setSelectedItem] = useState<string>('');
    const [classNoteId, setClassNoteId] = useState<string>('');
    const [downloadValue, setDownloadValue] = useState<string>('');

    useEffect(() => {
        downloadValue && saveAsFile("class-note.pdf", downloadValue)
     }, [downloadValue]);
    

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


    const readNoteSnapPoints = useMemo(() => ["100%"], []);
    const readNoteBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const [readNoteModalActionState, setReadNoteModalActionState] = useState(false);
    const openOrCloseReadNoteModal = (shouldOpenModal: boolean) => {
        setReadNoteModalActionState(shouldOpenModal)
        if (shouldOpenModal && readNoteBottomSheetModalRef.current) {
            readNoteBottomSheetModalRef.current.present();
        } else if (readNoteBottomSheetModalRef.current) {
            readNoteBottomSheetModalRef.current.close();
        }
    };


    const sendClassnoteSnapPoints = useMemo(() => ["50%"], []);
    const sendClassnoteBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const [sendClassnoteModalActionState, setSendClassnoteModalActionState] = useState(false);
    const openOrCloseSendClassnoteModal = (shouldOpenModal: boolean) => {
        setSendClassnoteModalActionState(shouldOpenModal)
        if (shouldOpenModal && sendClassnoteBottomSheetModalRef.current) {
            sendClassnoteBottomSheetModalRef.current.present();
        } else if (sendClassnoteBottomSheetModalRef.current) {
            sendClassnoteBottomSheetModalRef.current.close();
        }
    };


    const shareClassNoteSnapPoints = useMemo(() => ["100%"], []);
    const shareClassNoteBottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const [shareClassNoteModalActionState, setShareClassNoteModalActionState] = useState(false);
    const openOrCloseShareClassNoteModal = (shouldOpenModal: boolean) => {
        setShareClassNoteModalActionState(shouldOpenModal)
        if (shouldOpenModal && shareClassNoteBottomSheetModalRef.current) {
            shareClassNoteBottomSheetModalRef.current.present();
        } else if (shareClassNoteBottomSheetModalRef.current) {
            shareClassNoteBottomSheetModalRef.current.close();
        }
    };




    return (
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Class Note">
            <BottomSheetModalProvider>
                <FloatingButton>
                    <Pressable
                        onPress={() => {
                            if (!sessionClassSubject.value) {
                                props.setErrorToastState('Subject must be selected');
                                return;
                            }
                            props.navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.classnote.screens.createClassnote.name,
                                params: {
                                    sessionClass: sessionClass,
                                    sessionClassSubject: sessionClassSubject,
                                }
                            });
                        }}>
                        <MaterialCommunityIcons
                            name="plus"
                            size={50}
                            color={AppButtonColorDark}
                        />
                    </Pressable>
                </FloatingButton>
                <Stack spacing={10} style={{ flex: 1, zIndex: -2 }} >
                    <CustomScrollview
                        totalPages={props.totalPages}
                        pageNumber={props.pageNumber}
                        getAction={props.__getAll}
                        params={{ 'sessionClassId': sessionClass?.lookUpId, 'subjectId': sessionClassSubject.lookUpId, 'status': selectedStatus.value, pageNumber: 0 }}>
                        <HStack spacing={1} style={{ flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            <Box w={184}  >

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
                            <Box w={184}  >
                                <View >
                                    <CustomDropdownInput data={status}
                                        searchPlaceHolder="Search"
                                        height={40}
                                        defaultButtonText="Select Status"
                                        // disabled={sessionClass.value === ''}
                                        // search={true}
                                        default={-2}
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
                                                setSelectedItem(item.teacherClassNoteId)
                                                setClassNoteId(item.classNoteId)
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
                        <ListComponent text={'Open'} icon={<Feather name="file-plus" size={20} />} onPress={() => {
                            openOrCloseModal(false);
                            openOrCloseSendClassnoteModal(false);
                            openOrCloseShareClassNoteModal(false);
                            openOrCloseReadNoteModal(true);
                        }} />
                        <ListComponent text={'Edit'} icon={<AntDesign name="edit" size={20} />} onPress={() => {
                            openOrCloseModal(false)
                            props.navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.classnote.screens.updateClassnote.name,
                                params: {
                                    teacherClassNoteId: selectItemId,
                                    sessionClass: sessionClass,
                                }
                            });
                        }} />
                        <ListComponent text={'Share'} icon={<Fontisto name="share" size={20} />} onPress={() => {
                            openOrCloseModal(false);
                            openOrCloseReadNoteModal(false);
                            openOrCloseSendClassnoteModal(false);
                            openOrCloseShareClassNoteModal(true);

                        }} />
                        <ListComponent text={'Send'} icon={<FontAwesome name="send" size={20} />} onPress={() => {
                            openOrCloseModal(false);
                            openOrCloseReadNoteModal(false);
                            openOrCloseShareClassNoteModal(false);
                            openOrCloseSendClassnoteModal(true);

                        }} />
                        <ListComponent text={'Download'} icon={<Entypo name="download" size={20} />} onPress={() => {
                            openOrCloseModal(false)
                            props.download(classNoteId).then((result:string) => {
                                setDownloadValue(result);
                            })
                        }} />
                    </Stack>
                </BottomUpComponent>

                <BottomUpComponent bottomSheetModalRef={readNoteBottomSheetModalRef} snapPoints={readNoteSnapPoints} openOrCloseModal={openOrCloseReadNoteModal}>
                    <ReadClassnote teacherClassNoteId={selectItemId} />
                </BottomUpComponent>
                <BottomUpComponent bottomSheetModalRef={sendClassnoteBottomSheetModalRef} snapPoints={sendClassnoteSnapPoints} openOrCloseModal={openOrCloseSendClassnoteModal}>
                    <SendClassnote teacherClassNoteId={selectItemId} sendClassnoteModal={sendClassnoteModalActionState} openOrCloseSendClassnoteModal={openOrCloseSendClassnoteModal} />
                </BottomUpComponent>
                <BottomUpComponent bottomSheetModalRef={shareClassNoteBottomSheetModalRef} snapPoints={shareClassNoteSnapPoints} openOrCloseModal={openOrCloseShareClassNoteModal}>
                    <ShareClassnote classNoteId={classNoteId} shareClassnoteModal={shareClassNoteModalActionState} openOrCloseShareClassNoteModal={openOrCloseShareClassNoteModal} />
                </BottomUpComponent>
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

        __getAll: (params: any) => _paginationGetClassnotes(params)(dispatch),
        setErrorToastState: (error: string) => setErrorToastState(error)(dispatch),
        download:(classNoteId:string) => downloadClassNote(classNoteId)(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassnoteIndex);