import React, { useState, useEffect } from "react";
import { HStack, Stack } from "@react-native-material/core";
import ScreenTitle from "../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import CustomTextInput from "../layouts/CustomTextInput";
import * as Yup from 'yup';
import { useFormik } from "formik";
import CustomButton from "../layouts/CustomButton";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import CustomTextArea from "../layouts/CustomTextArea";
import CustomCheckBoxWithBorder from "../layouts/checkbox-component";
import { ClassAssessment } from "../../models/class-properties/assessment";
import { SelectItem } from "../../models/select-item";
import { setErrorToastState } from "../../store/actions/app-state-actions";
import { getSingleHomeAssessment, createHomeAssessment, updateHomeAssessment } from "../../store/actions/assessment-actions";
import ProtectedTeacher from "../authentication/protected-teacher";
const AssessmentCreate = ({ dispatch, state, backgroundColor, navigation, route }: any) => {
    const [type] = useState<string>('home-assessment');
    const [sessionClass] = useState<SelectItem>(route.params.sessionClass.name);
    const [sessionClassSubject] = useState<SelectItem>(route.params.sessionClassSubject.name);
    const [group] = useState<SelectItem>(route.params.group.name);
    const [homeAssessmentId] = useState<SelectItem>(route.params.HomeAssessmentId);
    const { assessment } = state.assessmentState;
    const [ass, setAssessment] = useState<ClassAssessment>(assessment);
    const screenLocalColor = "#868C8E";

    useEffect(() => {
        homeAssessmentId ? setAssessment(assessment) : setAssessment(new ClassAssessment());
    }, [assessment])

    useEffect(() => {
        homeAssessmentId && getSingleHomeAssessment(homeAssessmentId, sessionClass.value)(dispatch)
    }, [homeAssessmentId])


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
            .required('Assessment Score Required'),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched } = useFormik({
        initialValues: {
            homeAssessmentId: homeAssessmentId ?? "",
            title: ass?.title,
            content: ass?.content,
            comment: ass?.comment,
            assessmentScore: ass?.assessmentScore,
            sessionClassId: sessionClass.text,
            sessionClassSubjectId: sessionClassSubject.text,
            sessionClassGroupId: group.text,
            shouldSendToStudents: false,
            timeDeadLine: ass?.timeDeadLine ?? "12:12",
            dateDeadLine: ass?.dateDeadLine ?? "12/12/2022",
            total: 0,
            used: 0,
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            values.sessionClassId = sessionClass.value;
            values.sessionClassSubjectId = sessionClassSubject.value;
            values.sessionClassGroupId = group.value;
            if (!homeAssessmentId)
                createHomeAssessment(values, navigation)(dispatch)
            else
                updateHomeAssessment(values, navigation)(dispatch)
        }
    });


    useEffect(() => {
        touched.title && errors.title && (setErrorToastState(errors.title)(dispatch))
        touched.content && errors.content && (setErrorToastState(errors.content)(dispatch))
        touched.assessmentScore && errors.assessmentScore && (setErrorToastState(errors.assessmentScore)(dispatch))
    }, [touched, errors])

    return (
        <ProtectedTeacher backgroundColor={backgroundColor} currentScreen="Assessment">
            <ScrollView>
                <Stack spacing={10} style={{ flex: 1, margin: 10, }}>
                    <Stack style={{ flex: 0 }}>
                        <HStack style={{ alignItems: 'center' }}>
                            <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={20} />} title={homeAssessmentId ? 'UPDATE ' + sessionClass.text + ' ASSESSMENT' : 'CREATE ASSESSMENT FOR ' + sessionClass.text} />
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
                                <CustomCheckBoxWithBorder
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
                                    placeholder='Total'
                                    autoCapitalize='none'
                                    autoCompleteType='numeric'
                                    keyboardType='numeric'
                                    keyboardAppearance='dark'
                                    returnKeyType='next'
                                    multiline={true}
                                    disabled={true}
                                    returnKeyLabel='next'
                                    onBlur={handleBlur('total')}
                                    value={values.total}
                                    error={errors.total}
                                    touched={touched.total}
                                    onChange={(e: any) => {
                                        handleChange('total');
                                        setFieldValue('total', e.nativeEvent.text)
                                    }}
                                />
                            </View>
                        </HStack>

                        <HStack spacing={3} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <View>

                                <CustomButton

                                    backgroundColor={screenLocalColor}
                                    title="CLOSE" onPress={() => {
                                        navigation.goBack()
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



export default AssessmentCreate;