import axiosInstance from "../../axios/axiosInstance";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/assessment-actions-types";

export const GetAssessments = (sessionClassId: any, sessionClassSubjectId: any, groupId: any, pageNumber: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`all/client/homeassessment/api/v1/get/home-assessments?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}&groupId=${groupId}&pageNumber=${pageNumber}`)
        .then((res) => {
            dispatch({ type: actions.GET_HOME_ASSESSMENTS, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        })
}

export const createHomeAssessment = (values: any, navigation: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.post(`all/client/homeassessment/api/v1/create/home-assessment`, values)
        .then((res) => {
            navigation.goBack();
            dispatch({ type: actions.CREATE_HOME_ASSESSMENT });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        });
}

export const getSingleHomeAssessment = (homeassessmentId: any, sessionClassId: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`all/client/homeassessment/api/v1/get/single/mobile-home-assessments?homeassessmentId=${homeassessmentId}&sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({ type: actions.GET_SINGLE_HOME_ASSESSMENT, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        });
}

export const getStudentFeedback = (homeassessmentFeedBackId: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`/all/client/smp/studentassessment/api/v1/get-single/home-assessments-on-mobile?homeassessmentFeedBackId=${homeassessmentFeedBackId}`)
        .then((res) => {
            dispatch({ type: actions.GET_STUDENT_FEEDBACK, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        });
}

export const getAssessmentStudents = (homeassessmentId: any, sessionClassId: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`all/client/homeassessment/api/v1/get/assessment-students?homeassessmentId=${homeassessmentId}&sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({ type: actions.GET_SINGLE_HOME_ASSESSMENT_STUDENTS, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        });
}