import { Alert } from "react-native";
import axiosInstance from "../../axios/axiosInstance";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/assessment-actions-types";

export const GetAssessments = (_baseurlSuffix: any, sessionClassId: any, sessionClassSubjectId: any, groupId: any, pageNumber: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/${_baseurlSuffix}/homeassessment/api/v1/get/home-assessments?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}&groupId=${groupId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({ type: actions.GET_HOME_ASSESSMENTS, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            try {
                dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}
export const createHomeAssessment = (values: any, _baseurlSuffix: string, navigation: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.post(`smp/${_baseurlSuffix}/homeassessment/api/v1/create/home-assessment`, values)
        .then((res) => {
            navigation.goBack();
            dispatch({ type: actions.CREATE_HOME_ASSESSMENT });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err) => {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
        });
}

export const getSingleHomeAssessment = (homeassessmentId: any, sessionClassId: any, _baseurlSuffix: string) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/${_baseurlSuffix}/homeassessment/api/v1/get/single/mobile-home-assessments?homeassessmentId=${homeassessmentId}&sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({ type: actions.GET_SINGLE_HOME_ASSESSMENT, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err) => {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
        });
}


export const getStudentFeedback = (_baseurlSuffix: string, homeassessmentFeedBackId: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`/smp/${_baseurlSuffix}/smp/studentassessment/api/v1/get-single/home-assessments-on-mobile?homeassessmentFeedBackId=${homeassessmentFeedBackId}`)
        .then((res) => {
            console.log('res.', res.data.result);
            dispatch({ type: actions.GET_STUDENT_FEEDBACK, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err) => {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
        });
}


export const getAssessmentStudents = (homeassessmentId: any, sessionClassId: any, _baseurlSuffix: string) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/${_baseurlSuffix}/homeassessment/api/v1/get/assessment-students?homeassessmentId=${homeassessmentId}&sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({ type: actions.GET_SINGLE_HOME_ASSESSMENT_STUDENTS, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err) => {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
        });
}