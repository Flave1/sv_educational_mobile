import React, { useState, useEffect } from "react";
import { HStack, Stack, Text } from "@react-native-material/core";
import ScreenTitle from "../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, View } from "react-native";
import CustomTextInput from "../layouts/CustomTextInput";
import * as Yup from 'yup';
import { useFormik } from "formik";
import CustomButton from "../layouts/CustomButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomTextArea from "../layouts/CustomTextArea";
import CustomCheckBoxWithBorder from "../layouts/checkbox-component";
import { SelectItem } from "../../models/select-item";
import { displayError } from "../../store/actions/app-state-actions";
import ProtectedTeacher from "../authentication/protected-teacher";
import CustomFileInput from "../layouts/CustomFileInput";
import { connect } from "react-redux";
import { sendForApproval, updateClassNote } from "../../store/actions/classnote-actions";
import { ClassService } from "../../services/Class-service";
import { ClassNote } from "../../models/class-properties/Tutor-class";

const ClassNoteUpdate = (props: any) => {
    
    const [teacherClassNoteId] = useState<string>(props.route.params.teacherClassNoteId);
    const [classNote, setClassNote] = useState<ClassNote>(new ClassNote());
    
    useEffect(() => {
        ClassService.getSingleClassNote(teacherClassNoteId, props.classnotes).then(result => {
            setClassNote(result);
        });
    }, [props.teacherClassNoteId]);

    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [fileContent, setFileContent] = useState({});
    const screenLocalColor = "#868C8E";


    const handleFileSelect = (selectedFile: any) => {
        // do something with the selected file here
        console.log(selectedFile);
    };

    const validation = Yup.object().shape({
        noteTitle: Yup.string()
            .min(2, 'Title Too Short!')
            .max(200, 'Title Too Long!')
            .required('Title Required'),
        noteContent: Yup.string()
            .min(2, 'Content Too Short!')
            .required('Content Required'),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched }: any = useFormik({
        initialValues: {
            noteTitle: classNote?.noteTitle,
            noteContent: classNote?.noteContent,
            shouldSendForApproval: false,
            subjectId: classNote?.subject,
            classId: classNote?.classes,
            classNoteId:classNote?.classNoteId,
            sessionClass: props.route.params.sessionClass,
            sessionClassSubject:props.route.params.sessionClassSubject,
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            values.shouldSendForApproval && props.sendForApproval(classNote?.classNoteId);
            props.update(values, props.navigation)
        }
    });


    useEffect(() => {
        touched.noteTitle && errors.noteTitle && (props.setErrorToastState(errors.noteTitle))
        touched.noteContent && errors.noteContent && (props.setErrorToastState(errors.noteContent))
    }, [touched, errors])

    return (
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="ClassNoteUpdate">
            <ScrollView>
                <Stack spacing={10} style={{ flex: 1, marginHorizontal: 30, }}>
                    <Stack style={{ flex: 0 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <ScreenTitle icon={<MaterialIcons name="library-books" color="white" size={20} />} title={' UPDATE CLASS NOTE FOR ' + sessionClass.text} />
                        </HStack>
                    </Stack>

                    <Stack spacing={10} style={{ height: '60%' }}>
                        <View style={{ width: '100%' }}>
                            <CustomTextInput
                                icon={<MaterialIcons name="title" size={16} />}
                                placeholder='Title'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onBlur={handleBlur('noteTitle')}
                                value={values.noteTitle}
                                error={errors.noteTitle}
                                touched={touched.noteTitle}
                                disabled={true}
                                onChange={(e: any) => {
                                    handleChange('noteTitle');
                                    setFieldValue('noteTitle', e.nativeEvent.text)
                                }}
                            />
                        </View>


                        <View style={{ width: '100%' }}>
                            <View>
                                {fileContent == "no file" &&
                                    <Text color="red">{"No file found to Upload"}</Text>
                                }
                            </View>
                            <CustomFileInput
                                icon={<FontAwesome5 name={'upload'} size={16} />}
                                label="Upload a file"
                                onFileSelect={handleFileSelect}
                                placeholder='Upload note(text,word)'
                                onBlur={handleBlur('noteFile')}
                                disabled={true}
                                onChange={(e: any) => {
                                    handleChange('noteFile');
                                    setFieldValue('noteFile', e.nativeEvent.text)
                                }}
                            />
                        </View>

                        <View style={{ width: '100%' }}>
                            <CustomTextArea
                                placeholder='Class Note'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onBlur={handleBlur('noteContent')}
                                value={values.noteContent}
                                error={errors.noteContent}
                                touched={touched.noteContent}
                                disabled={true}
                                onChange={(e: any) => {
                                    handleChange('noteContent');
                                    setFieldValue('noteContent', e.nativeEvent.text)
                                }}
                            />
                        </View>


                        {classNote?.approvalStatus === 2 && (
                            <HStack spacing={10} style={{ width: '100%', marginTop: '10%' }}>
                                <View style={{ width: '100%' }}>
                                    <CustomCheckBoxWithBorder
                                        text="Submit for review"
                                        isSelected={values.shouldSendForApproval}
                                        onValueChange={() => {
                                            handleChange('shouldSendForApproval');
                                            setFieldValue('shouldSendForApproval', !values.shouldSendForApproval)
                                        }}
                                    />
                                </View>
                            </HStack>
                        )}

                        <HStack spacing={3} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <View>

                                <CustomButton
                                    backgroundColor={screenLocalColor}
                                    title="CLOSE" onPress={() => {
                                        props.navigation.goBack()
                                    }}
                                />
                            </View>
                            <View>
                                <CustomButton title="SUBMIT" onPress={handleSubmit} />
                            </View>
                        </HStack>

                    </Stack>

                </Stack>
            </ScrollView>

        </ProtectedTeacher>

    );
};

function mapStateToProps(state: any) {
    return {
        classnotes: state.classnotesState.classnotes
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        update: (values: any, navigation: any) => updateClassNote(values, navigation)(dispatch),
        setErrorToastState: (error: string) => displayError(error)(dispatch),
        sendForApproval: (classNoteId: any) => sendForApproval({classNoteId})(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassNoteUpdate);