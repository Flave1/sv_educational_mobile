import React, { useEffect, useState } from "react";
import { HStack, Pressable, Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SelectItem } from "../../models/select-item";
import ProtectedTeacher from "../authentication/protected-teacher";
import ScreenTitle from "../layouts/screen-title";
import { connect } from "react-redux";
import { CustomCheckBox } from "../layouts/checkbox-component";
import { changeStudentAvailabilityStatus, getRegisters, openRegister, updateUnsechronized } from "../../store/actions/attendance-actions";
import { AttendanceService } from "../../services/attendance-service";
import { ClassRegister } from "../../models/class-properties/attendance";
import { Device } from "../../tools/device-properties";
import CustomButton from "../layouts/CustomButton";
import { screens } from "../../screen-routes/navigation";
import { ClassStudent } from "../../models/class-properties/students";
const TakeAttendanceRecord = (props: any) => {
    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [records, setRecords] = useState<any[]>([]);
    const [students, setStudents] = useState<ClassStudent[]>([]);

    useEffect(() => {
        props.classStudents && setStudents(props.classStudents.filter((x: ClassStudent) => x.sessionClassID === sessionClass.value));
    }, [sessionClass.value]);

    useEffect(() => {
        students && sessionClass.value && props.openRegister(sessionClass.value, students);
    }, [students]);

    useEffect(() => {
        for (let i = 0; i < students.length; i++) {
            const element = students[i];
            const record = {
                studentContactId: element.studentAccountId,
                isPresent: false,
                name: element.lastName + ' ' + element.middleName + ' ' + element.firstName
            };
            records.push(record);
        }

        setRecords([...new Set(records.map((obj) => JSON.stringify(obj)))].map((str) => JSON.parse(str)));
    }, []);


    const handleCheck = async (item: any, isSelected: Boolean) => {
        const updatedStudentsArray = records.map(obj => {
            if (obj.studentContactId === item.studentContactId) {
                return { ...obj, isPresent: isSelected };
            }
            return obj;
        });
        setRecords(updatedStudentsArray);

        Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
            if (hasInternetAccess) {
                props.changeStatus(props.register.classRegisterId, sessionClass.value, item.studentContactId, isSelected, props.register.classRegisterLabel)
            } else {
                AttendanceService.updateRegister(props.register, props.unsynchronized, updatedStudentsArray).then((res) => {
                    res.forEach(d => {
                        props.updateUnsechronized(d);
                    });
                    return res;
                });
            }
        });
    }

    const handleSave = () => {
        props.getAll(sessionClass.value);
        props.navigation.navigate({
            name: screens.scenes.mainapp.scenes.tutor.screens.attendance.name,
            params: sessionClass
        });
    };


    return (
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Attendance">
            <ScrollView >
                <Stack spacing={10} style={{ flex: 1, margin: 10, justifyContent: 'center' }}>
                    <Stack style={{ flex: 0 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <ScreenTitle icon={<MaterialIcons name="app-registration" color="white" size={20} />} title={'RECORD ' + sessionClass.text + ' ATTENDANCE'} />
                            <CustomButton onPress={handleSave} height={30} title={'save'} />
                        </HStack>
                    </Stack>
                    <ScrollView horizontal={true}>
                        <View >
                            <View style={[styles.tableHeader]}>
                                <Text style={[styles.headerItem, { width: 300 }]}>Name</Text>
                                <Text style={[styles.headerItem, { width: 100 }]}>Is Present</Text>
                            </View>
                            {records.map((item: any, idx: number) => {
                                return (
                                    <View key={idx} style={[styles.tableRow]}>
                                        <Text style={[styles.tableItem, { width: 300 }]}>{item.name}</Text>
                                        <CustomCheckBox
                                            style={{ width: 100 }}
                                            isSelected={item.isPresent}
                                            onValueChange={() => {
                                                handleCheck(item, !item.isPresent)
                                            }} />
                                    </View>
                                )
                            })}

                        </View>
                    </ScrollView>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingEnd: 50, marginTop: 20 }}>
                        <CustomButton onPress={handleSave} height={30} width={70} title={'save'} />
                    </View>
                </Stack>
            </ScrollView>

        </ProtectedTeacher>

    );
};

function mapStateToProps(state: any) {
    return {
        classStudents: state.classPropsState.classStudents,
        register: state.attendanceState.register,
        unsynchronized: state.attendanceState?.unsynchronized
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        openRegister: (sessionClassId: string, studentsCount: number) =>
            openRegister(sessionClassId, studentsCount)(dispatch),

        updateUnsechronized: (reg: ClassRegister) => updateUnsechronized(reg)(dispatch),

        changeStatus: (classRegisterId: string, sessionClassId: string, studentContactId: string, isPresent: false, label: string) =>
            changeStudentAvailabilityStatus(classRegisterId, sessionClassId, studentContactId, isPresent, label)(dispatch),

        getAll: (classId: string) => getRegisters(classId, 1)(dispatch),
    };
}

const styles = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold'
    },
    border: {
        borderColor: 'red',
        borderWidth: 1
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap', color: 'black', borderRadius: 10 },
    badge: { backgroundColor: '#139C85', color: 'white', borderRadius: 50, textAlign: 'center' },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    headerItem: {
        color: 'white',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10

    },
    tableItem: {
        color: 'white',
        alignSelf: 'center'
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(TakeAttendanceRecord);