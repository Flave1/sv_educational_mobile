import React, { useState, useEffect } from "react";
import { HStack, Stack } from "@react-native-material/core";
import ProtectedTeacher from "../../../authentication/protected-teacher";
import ScreenTitle from "../../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView, View } from "react-native";
import { SelectItem } from "../../../../models/select-item";
import { createHomeAssessment } from "../../../../store/actions/assessment-actions";
import Entypo from "react-native-vector-icons/Entypo";
import CustomTextInput from "../../layouts/CustomTextInput";
import * as Yup from 'yup';
import { useFormik } from "formik";
import CustomButton from "../../layouts/CustomButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import CustomTextArea from "../../layouts/CustomTextArea";
import CustomCheckBox from "../../layouts/checkbox-component";
import { SetErrorToastState } from "../../../../store/actions/app-state-actions";
const AssessmentCreate = ({ dispatch, state, backgroundColor, persistedUser, navigation, route }: any) => {
    const [type] = useState<string>('home-assessment');
    const [sessionClass] = useState<SelectItem>(route.params.sessionClass.name);
    const [sessionClassSubject] = useState<SelectItem>(route.params.sessionClassSubject.name);
    const [group] = useState<SelectItem>(route.params.group.name);

    const validation = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Assessment Title Too Short!')
            .max(200, 'Assessment Title Too Long!')
            .required('Assessment Title Required'),
        content: Yup.string()
            .min(2, 'Content Too Short!')
            .required('Content Required'),
        assessmentScore: Yup.number()
            .min(0, 'Content Required')
            .required('Content Required'),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched } = useFormik({
        initialValues: {
            title: "",
            content: "",
            comment: "",
            assessmentScore: 0,
            sessionClassId: sessionClass.text,
            sessionClassSubjectId: sessionClassSubject.text,
            sessionClassGroupId: group.text,
            shouldSendToStudents: false,
            timeDeadLine: "12:40",
            dateDeadLine: "12/12/2023",
            total: 0,
            used: 0,
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            values.sessionClassId = sessionClass.value;
            values.sessionClassSubjectId = sessionClassSubject.value;
            values.sessionClassGroupId = group.value;
            createHomeAssessment(values, persistedUser.baseUrlSuffix, navigation)(dispatch)
        }
    });


    useEffect(() => {
        touched.title && errors.title && (SetErrorToastState(errors.title)(dispatch))
        touched.content && errors.content && (SetErrorToastState(errors.content)(dispatch))
        touched.assessmentScore && errors.assessmentScore && (SetErrorToastState(errors.assessmentScore)(dispatch))
    }, [touched, errors])

    return (
        <ProtectedTeacher backgroundColor={backgroundColor}>
            <ScrollView>
                <Stack spacing={10} style={{ flex: 1, margin: 10, }}>
                    <Stack style={{ flex: 0 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={20} />} title={'-' + sessionClass.text} />
                        </HStack>
                    </Stack>

                    <Stack spacing={10} style={{ height: '60%' }}>
                        <View style={{ width: '100%' }}>
                            <CustomTextInput
                                icon={<MaterialIcons name={'title'} size={16} />}
                                placeholder='Assessment Title'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onBlur={handleBlur('title')}
                                value={values.title}
                                error={errors.title}
                                touched={touched.title}
                                disabled={true}
                                onChange={(e: any) => {
                                    handleChange('title');
                                    setFieldValue('title', e.nativeEvent.text)
                                }}
                            />
                        </View>

                        <View style={{ width: '100%' }}>
                            <CustomTextInput
                                icon={<MaterialIcons name={'subject'} size={16} />}
                                placeholder='Subject'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                editable={false}
                                selectTextOnFocus={false}
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onBlur={handleBlur('sessionClassSubjectId')}
                                value={values.sessionClassSubjectId}
                                error={errors.sessionClassSubjectId}
                                touched={touched.sessionClassSubjectId}
                                onChange={(e: any) => {
                                    handleChange('sessionClassSubjectId');
                                    setFieldValue('sessionClassSubjectId', e.nativeEvent.text)
                                }}
                            />
                        </View>

                        <View style={{ width: '100%' }}>
                            <CustomTextInput
                                icon={<FontAwesome5 name={'user-friends'} size={16} />}
                                placeholder='Class Group'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                editable={false}
                                selectTextOnFocus={false}
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onBlur={handleBlur('sessionClassGroupId')}
                                value={values.sessionClassGroupId}
                                error={errors.sessionClassGroupId}
                                touched={touched.sessionClassGroupId}
                                disabled={true}
                                onChange={(e: any) => {
                                    handleChange('sessionClassGroupId');
                                    setFieldValue('sessionClassGroupId', e.nativeEvent.text)
                                }}
                            />
                        </View>

                        <View style={{ width: '100%' }}>
                            <CustomTextArea
                                placeholder='Assessment'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                returnKeyLabel='next'
                                onBlur={handleBlur('content')}
                                value={values.content}
                                error={errors.content}
                                touched={touched.content}
                                disabled={true}
                                onChange={(e: any) => {
                                    handleChange('content');
                                    setFieldValue('content', e.nativeEvent.text)
                                }}
                            />
                        </View>

                        <View style={{ width: '100%' }}>
                            <CustomTextInput
                                icon={<FontAwesome5 name={'comment'} size={16} />}
                                placeholder='Comment'
                                autoCapitalize='none'
                                autoCompleteType='text'
                                keyboardType='text'
                                keyboardAppearance='dark'
                                returnKeyType='next'
                                multiline={true}
                                returnKeyLabel='next'
                                onBlur={handleBlur('comment')}
                                value={values.comment}
                                error={errors.comment}
                                touched={touched.comment}
                                disabled={true}
                                onChange={(e: any) => {
                                    handleChange('comment');
                                    setFieldValue('comment', e.nativeEvent.text)
                                }}
                            />
                        </View>

                        <HStack spacing={10} style={{ width: '100%' }}>
                            <View style={{ width: '48.5%' }}>
                                <CustomTextInput
                                    icon={<Fontisto name={'date'} size={16} />}
                                    placeholder='Submition Date'
                                    autoCapitalize='none'
                                    autoCompleteType='text'
                                    keyboardType='text'
                                    keyboardAppearance='dark'
                                    returnKeyType='next'
                                    returnKeyLabel='next'
                                    onBlur={handleBlur('dateDeadLine')}
                                    value={values.dateDeadLine}
                                    error={errors.dateDeadLine}
                                    touched={touched.dateDeadLine}
                                    onChange={(e: any) => {
                                        handleChange('dateDeadLine');
                                        setFieldValue('dateDeadLine', e.nativeEvent.text)
                                    }}
                                />
                            </View>
                            <View style={{ width: '48.5%' }}>
                                <CustomTextInput
                                    icon={<Ionicons name={'time'} size={16} />}
                                    placeholder='Submition Time'
                                    autoCapitalize='none'
                                    autoCompleteType='text'
                                    keyboardType='text'
                                    keyboardAppearance='dark'
                                    returnKeyType='next'
                                    multiline={true}
                                    returnKeyLabel='next'
                                    onBlur={handleBlur('timeDeadLine')}
                                    value={values.timeDeadLine}
                                    error={errors.timeDeadLine}
                                    touched={touched.timeDeadLine}
                                    disabled={true}
                                    onChange={(e: any) => {
                                        handleChange('timeDeadLine');
                                        setFieldValue('timeDeadLine', e.nativeEvent.text)
                                    }}
                                />
                            </View>

                        </HStack>

                        <HStack spacing={10} style={{ width: '100%' }}>
                            <View style={{ width: '48.5%' }}>
                                <CustomCheckBox
                                    text="Send to Students"
                                    isSelected={values.shouldSendToStudents}
                                    onValueChange={() => {
                                        handleChange('shouldSendToStudents');
                                        setFieldValue('shouldSendToStudents', !values.shouldSendToStudents)
                                    }}
                                />
                            </View>
                            <View style={{ width: '48.5%' }}>
                                <CustomTextInput
                                    icon={<Entypo name={'dot-single'} size={16} />}
                                    placeholder='Total'
                                    autoCapitalize='none'
                                    autoCompleteType='numeric'
                                    keyboardType='numeric'
                                    keyboardAppearance='dark'
                                    returnKeyType='next'
                                    multiline={true}
                                    returnKeyLabel='next'
                                    onBlur={handleBlur('total')}
                                    value={values.total}
                                    error={errors.total}
                                    touched={touched.total}
                                    disabled={true}
                                    onChange={(e: any) => {
                                        handleChange('total');
                                        setFieldValue('total', e.nativeEvent.text)
                                    }}
                                />
                            </View>

                        </HStack>
                        <HStack spacing={10} style={{ width: '100%' }}>
                            <View style={{ width: '48.5%' }}>
                                <CustomTextInput
                                    icon={<Entypo name={'dot-single'} size={16} />}
                                    placeholder='Used'
                                    autoCapitalize='none'
                                    autoCompleteType='numeric'
                                    keyboardType='numeric'
                                    keyboardAppearance='dark'
                                    returnKeyType='next'
                                    multiline={true}
                                    returnKeyLabel='next'
                                    onBlur={handleBlur('used')}
                                    value={values.used}
                                    error={errors.used}
                                    touched={touched.used}
                                    disabled={true}
                                    onChange={(e: any) => {
                                        handleChange('used');
                                        setFieldValue('used', e.nativeEvent.text)
                                    }}
                                />
                            </View>
                            <View style={{ width: '48.5%' }}>
                                <CustomTextInput
                                    icon={<Entypo name={'dot-single'} size={16} />}
                                    placeholder='Score'
                                    autoCapitalize='none'
                                    autoCompleteType='numeric'
                                    keyboardType='numeric'
                                    keyboardAppearance='dark'
                                    returnKeyType='next'
                                    multiline={true}
                                    returnKeyLabel='next'
                                    onBlur={handleBlur('assessmentScore')}
                                    value={values.assessmentScore}
                                    error={errors.assessmentScore}
                                    touched={touched.assessmentScore}
                                    disabled={true}
                                    onChange={(e: any) => {
                                        handleChange('assessmentScore');
                                        setFieldValue('assessmentScore', e.nativeEvent.text)
                                    }}
                                />
                            </View>

                        </HStack>

                        <Stack style={{ marginHorizontal: 50, marginTop: 10 }}>
                            <CustomButton onPress={handleSubmit} />
                        </Stack>

                    </Stack>

                </Stack>
            </ScrollView>

        </ProtectedTeacher>

    );
};



export default AssessmentCreate;