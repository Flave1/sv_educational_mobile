import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { HStack, Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ProtectedTeacher from "../authentication/protected-teacher";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SelectItem } from "../../models/select-item";
import { GetClassStudents, createClassGroup } from "../../store/actions/class-properties-actions";
import CustomTextInput from "../layouts/CustomTextInput";
import { CustomCheckBox } from "../layouts/checkbox-component";
import { screens } from "../../screen-routes/navigation";
import { ClassGroupStudents } from "../../models/class-properties/class-group";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function EditClassGroup(props: any) {
    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [sessionClassSubject] = useState(props.route.params.sessionClassSubject);
    const [studentContactArray, setStudentContactArray] = useState<ClassGroupStudents[]>([]);



    useEffect(() => {
        sessionClass.value && props.getClassStudents(sessionClass.value)
    }, []);

    
    useEffect(() => {
        props.classStudents && setStudentContactArray(props.classStudents)
    }, [props.classStudents]);

    //   useEffect(() => {
    //     studentContactIdArray && setStudentContactIdArray(studentContactIdArray.map(v => ({...v, isActive: studentContactIdArray?.find(
    //         (arr) => arr === v.studentAccountId
    //       ) || false})))
    //   }, [studentContactIdArray]);

    //   useEffect(() => {
    //     if (props.modalActionState == false) {
    //         setStudentContactIdArray([])
    //     }
    // }, [props.modalActionState]);

    // const handleCheck = (item: ClassStudent, isSelected: Boolean) => {
    //     const updatedClassArray = studentContactIdArray.map((obj: any) => {
    //         if (obj.studentAccountId === item.studentAccountId) {
    //             return { ...obj, isActive:isSelected};
    //         }
    //         return obj;
    //     });
    //     setStudentContactIdArray(updatedClassArray);
    // }


    return (
        <>
            <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Create Class Group">
                <BottomSheetModalProvider>
                    <Stack style={{ flex: 0 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', paddingHorizontal: 10 }}>Send class to : </Text>
                        </HStack>
                    </Stack>
                    <ScrollView style={{ padding: 5 }}>
                        <View style={{ width: '100%' }}>
                            {/* <View>
                                {!groupName && validation && (
                                    <Text style={styles.warningText}>
                                        group name is required
                                    </Text>
                                )}
                            </View> */}
                            <Text style={styles.text}>Group Name:</Text>
                            <CustomTextInput
                                icon={<FontAwesome5 name="user-friends" size={16} />}
                                placeholder='Group Name'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                keyboardAppearance='dark'
                                // onBlur={setValidation(true)}
                                disabled={true}
                                onChange={(e: any) => {
                                    // setGroupName(e.nativeEvent.text)
                                }}
                            />
                        </View>
                        {studentContactArray?.map((item: ClassGroupStudents, idx: number) => {
                            return (
                                <View key={idx} style={[styles.tableRow]}>
                                    <Text style={[styles.tableItem, { width: 250 }]}> {item.firstName} {item.lastName}</Text>
                                    <CustomCheckBox
                                        style={{ width: 100 }}
                                        // isSelected={item.IsSelected}
                                        onValueChange={() => {
                                            //handleCheck(item, !true);
                                        }} />
                                    <Text style={[{ width: 50 }]}
                                        onPress={() => {
                                            props.navigation.navigate({
                                                name: screens.scenes.mainapp.scenes.tutor.screens.classStudents.screens.info.name,
                                                params: {
                                                    sessionClass: sessionClass,
                                                }
                                            })
                                        }} >
                                        {<MaterialIcons name="info" color="white" size={30} />}
                                    </Text>
                                </View>
                            )
                        })}

                    </ScrollView>
                    <HStack spacing={3} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                        {/* <View>

                            <CustomButton
                                // backgroundColor={screenLocalColor}
                                title="CLOSE" onPress={() => {
                                    props.openOrCloseModal(false)
                                }}
                            />
                        </View> */}
                        {/* <View>
                            <CustomButton title="SUBMIT" onPress={() => {
                                props.create(groupName,
                                    sessionClass.value,
                                    sessionClassSubject.value,
                                    studentContactIdArray.filter(d => d.isActive == true).map(d => d.studentAccountId),
                                    props.navigation)
                            }} />
                        </View> */}
                    </HStack>
                </BottomSheetModalProvider>
            </ProtectedTeacher>
        </>
    )
}
const styles = StyleSheet.create({
    tableItem: {
        color: 'white',
        alignSelf: 'center'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10

    },
    warningText: {
        color: 'red'
    },
    text:{
        color:'white'
    }
})
const mapStateToProps = (state: any) => {
    return {
        classStudents: state.classPropsState.classStudents,
    };
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        getClassStudents: (sessionClassId: string) => GetClassStudents(sessionClassId)(dispatch),
        create: (groupName:string,sessionClassId: string,sessionClassSubjectId:string,studentContactIdArray:any[],navigation:any) => createClassGroup(groupName,sessionClassId,sessionClassSubjectId,studentContactIdArray,navigation)(dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditClassGroup)