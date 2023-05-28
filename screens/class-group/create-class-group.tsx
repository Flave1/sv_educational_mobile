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
import { useFormik } from "formik";
import * as Yup from 'yup';

function CreateClassGroup(props: any) {
    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [sessionClassSubject] = useState(props.route.params.sessionClassSubject);
    const setClassGroup = props.route.params.setClassGroup;
    const [studentContactArray, setStudentContactArray] = useState<ClassGroupStudents[]>([]);
    const screenLocalColor = "#868C8E";

    useEffect(() => {
        sessionClass.value && props.getClassStudents(sessionClass.value)
    }, []);

    useEffect(() => {
        props.classStudents && setStudentContactArray(props.classStudents)
    }, [props.classStudents]);


    const handleCheck = (item: ClassGroupStudents, isSelected: Boolean) => {
        const updatedClassArray = studentContactArray.map((obj: any) => {
            if (obj.studentAccountId === item.studentAccountId) {
                return { ...obj, isAdded: isSelected };
            }
            return obj;
        });
        setStudentContactArray(updatedClassArray);
    }

    const validation = Yup.object().shape({
        groupName: Yup.string()
            .min(2, "Group Name Too Short!")
            .required("Group Name is required"),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched }: any = useFormik({
        initialValues: {
            groupName: '',
            sessionClassId: sessionClass.value,
            sessionClassSubjectId: sessionClassSubject.value,
            studentContactIds: [],
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values: any) => {
            values.studentContactIds = studentContactArray.filter(d => d.isAdded == true).map(d => d.studentAccountId);
            props.create(values, props.navigation, setClassGroup);
        }
    });

    return (
        <>
            <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Create Class Group">
                <BottomSheetModalProvider>
                    <Stack style={{ flex: 0,padding:10 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold',fontSize:20, padding: 10, }}>{`CREATE GROUP FOR ${sessionClass.text} ${sessionClassSubject.text}`}</Text>
                        </HStack>
                    </Stack>
                    <ScrollView style={{ padding: 20 }}>
                        <View style={{ width: '100%' }}>
                            <Stack center>
                                {(touched.groupName && errors.groupName) && <Text style={styles.warningText}>{errors.groupName}</Text>}
                            </Stack>
                            <Text style={styles.text}>Group Name:</Text>
                            <CustomTextInput
                                icon={<MaterialIcons name="edit" size={16} />}
                                placeholder='Group Name'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onBlur={handleBlur('groupName')}
                                value={values.groupName}
                                error={errors.groupName}
                                touched={touched.groupName}
                                disabled={true}
                                onChange={(e: any) => {
                                    handleChange('groupName');
                                    setFieldValue('groupName', e.nativeEvent.text)
                                }}
                            />
                        </View>
                        <Text style={[styles.text, { marginTop: 10 }]}>Add Students To Group:</Text>
                        {studentContactArray?.map((item: ClassGroupStudents, idx: number) => {
                            return (
                                <View key={idx} style={[styles.tableRow]}>
                                    <Text style={[styles.tableItem, { width: 250 }]}> {item.firstName} {item.lastName}</Text>
                                    <CustomCheckBox
                                        style={{ width: 100 }}
                                        isSelected={item.isAdded}
                                        onValueChange={() => {
                                            handleCheck(item, !item.isAdded);
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
                                backgroundColor={screenLocalColor}
                                title="CLOSE" onPress={() => {
                                    props.openOrCloseModal(false)
                                }}
                            />
                        </View>
                        <View>
                            <CustomButton title="SUBMIT" onPress={() => {
                                handleSubmit()
                            }} />
                        </View>
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
    text: {
        color: 'white'
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
        create: (values: any, navigation: any, setClassGroup: any) => createClassGroup(values, navigation, setClassGroup)(dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateClassGroup)