import { Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScreenTitle from "../layouts/screen-title";
import { HStack, Stack } from "@react-native-material/core";
import { connect } from "react-redux";
import { useState, useEffect, useMemo, useRef } from "react";
import { SelectItem } from "../../models/select-item";
import ProtectedTeacher from "../authentication/protected-teacher";
import AttendanceBox from "./attendance-box";
import { getRegisters, _paginationGetRegisters } from "../../store/actions/attendance-actions";
import CustomScrollview from "../layouts/CustomScrollView";
import { screens } from "../../screen-routes/navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomText from "../layouts/CustomText";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomUpComponent from "../layouts/bottom-up-component";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ListComponent from "../layouts/list-component";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ClassStudent } from "../../models/class-properties/students";

const AttendanceIndex = (props: any) => {

    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [selectItemId, setSelectedItem] = useState<string>('');
    const [students, setStudents] = useState<ClassStudent[]>([]);
    useEffect(() => {
         props.classStudents && setStudents(props.classStudents.filter((x: any) => x.sessionClassID === sessionClass.value));
    }, [sessionClass.value]);

    useEffect(() => {
        students && props.getAll(sessionClass.value, 1);
    }, []);

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
    
    const params = {
        classRegisterId: selectItemId,
        sessionClass: sessionClass,
    }

    
    return (<>
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Attendance" params={props.params}>
            <BottomSheetModalProvider>
                <CustomScrollview
                    totalPages={props.totalPages}
                    pageNumber={props.pageNumber}
                    getAction={props.__getAll}
                    params={(sessionClass.value).toString()}>
                    <Stack style={{ flex: 0, marginHorizontal: 21 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <ScreenTitle icon={<MaterialIcons name="app-registration" color="white" size={25} />} title={'-' + sessionClass.text + ' ATTENDANCE'} />
                            <Pressable
                                style={{ alignSelf: 'center', justifyContent: 'center', marginLeft: 50 }}
                                onPress={() => {
                                    props.navigation.navigate({
                                        name: screens.scenes.mainapp.scenes.tutor.screens.attendance.screens.takeAttendanceRecord.name,
                                        params
                                    });
                                }}>
                                <CustomText title={<Ionicons size={30} name="md-add-circle" />} />
                            </Pressable>
                        </HStack>
                    </Stack>
                    <HStack style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                        {
                            props.registers?.map((item: any, idx: number) => {
                                return (
                                    <AttendanceBox
                                        item={item} key={idx}
                                        totalStudents={students?.length}
                                        onPress={() => {
                                            setSelectedItem(item.classRegisterId)
                                            openOrCloseModal(!modalActionState)
                                        }}
                                    />
                                )
                            })
                        }
                    </HStack>
                </CustomScrollview>

                <BottomUpComponent bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} openOrCloseModal={openOrCloseModal}>
                    <Stack>
                        <ListComponent text={'Continue'} icon={<Feather name="file-plus" size={20} />} onPress={() => {
                            openOrCloseModal(false)
                            props.navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.attendance.screens.continueAttendanceRecord.name,
                                params: params
                            })
                        }} />
                        <ListComponent text={'Rename'} icon={<AntDesign name="edit" size={20} />} onPress={() => {
                            openOrCloseModal(false)
                            props.navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.create.name,
                                params: params
                            })
                        }} />
                        <ListComponent text={'Delete'} icon={<AntDesign name="delete" size={20} />} onPress={() => {
                            openOrCloseModal(false)
                            props.navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.create.name,
                                params: params
                            })
                        }} />
                    </Stack>
                </BottomUpComponent>

            </BottomSheetModalProvider>
        </ProtectedTeacher>
    </>)
}





function mapStateToProps(state: any) {
    return {
        classStudents: state.classPropsState.classStudents,
        registers: [...state.attendanceState?.unsynchronized,
        ...state.attendanceState?.registers]?.sort((a: any, b: any) => b?.dateTime - a?.dateTime),
        totalPages: state.attendanceState.totalPages,
        pageNumber: state.attendanceState.pageNumber
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        getAll: (classId: string, pageNumber: number) => getRegisters(classId, pageNumber)(dispatch),
        __getAll: (classId: string, pageNumber: number) => _paginationGetRegisters(classId, pageNumber)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceIndex);
