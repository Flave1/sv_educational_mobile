import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { HStack, Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../layouts/CustomButton";
import { CustomCheckBox } from "../layouts/checkbox-component";
import ProtectedTeacher from "../authentication/protected-teacher";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SelectItem } from "../../models/select-item";
import { GetClassStudents, createClassGroup } from "../../store/actions/class-properties-actions";
import { screens } from "../../screen-routes/navigation";
import CustomTextInput from "../layouts/CustomTextInput";
import { ClassGroupStudents } from "../../models/class-properties/class-group";

function CreateClassGroup(props: any) {
    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [sessionClassSubject] = useState(props.route.params.sessionClassSubject);
    const [studentContactArray, setStudentContactArray] = useState<ClassGroupStudents[]>([]);

    useEffect(() => {
        sessionClass.value && props.getClassStudents(sessionClass.value)
    }, []);

    
    useEffect(() => {
        props.classStudents && setStudentContactArray(props.classStudents)
    }, [props.classStudents]);

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
                                icon={<MaterialIcons name="groupName" size={16} />}
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
                        {studentContactArray?.map((item: any, idx: number) => {
                            return (
                                <View key={idx} style={[styles.tableRow]}>
                                    <Text style={[styles.tableItem, { width: 250 }]}> {item.firstName} {item.lastName}</Text>
                                    <CustomCheckBox
                                        style={{ width: 100 }}
                                        isSelected={true}
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
                        <View>

                            <CustomButton
                                // backgroundColor={screenLocalColor}
                                title="CLOSE" onPress={() => {
                                    props.openOrCloseModal(false)
                                }}
                            />
                        </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateClassGroup)