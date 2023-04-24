import axiosInstance from "../../axios/axiosInstance";
import { NativeFeatures } from "../../tools/device-properties";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/assessment-actions-types";
import { setSuccessToast } from "./app-state-actions";

export const GetAssessments = (sessionClassId: any, sessionClassSubjectId: any, groupId: any, pageNumber: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/homeassessment/api/v1/get/home-assessments?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}&groupId=${groupId}&pageNumber=${pageNumber}`)
                .then((res) => {
                    dispatch({ type: actions.GET_HOME_ASSESSMENTS, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}

export const createHomeAssessment = (values: any, navigation: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`smp/server/homeassessment/api/v1/create/home-assessment`, values)
                .then((res) => {
                    navigation.goBack();
                    GetAssessments(values.sessionClassId, values.sessionClassSubjectId, values.sessionClassGroupId, 1)(dispatch);
                    dispatch({ type: actions.CREATE_HOME_ASSESSMENT });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const updateHomeAssessment = (values: any, navigation: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`smp/server/homeassessment/api/v1/update/home-assessment`, values)
                .then((res) => {
                    navigation.goBack();
                    GetAssessments(values.sessionClassId, values.sessionClassSubjectId, values.sessionClassGroupId, 1)(dispatch);
                    dispatch({ type: actions.CREATE_HOME_ASSESSMENT });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const getSingleHomeAssessment = (homeassessmentId: any, sessionClassId: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/homeassessment/api/v1/get/single/mobile-home-assessments?homeassessmentId=${homeassessmentId}&sessionClassId=${sessionClassId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_SINGLE_HOME_ASSESSMENT, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const getStudentFeedback = (homeassessmentFeedBackId: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`/smp/server/smp/studentassessment/api/v1/get-single/home-assessments-on-mobile?homeassessmentFeedBackId=${homeassessmentFeedBackId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_STUDENT_FEEDBACK, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const getStudentAssessment = (homeassessmentId: any, sessionClassId: any, openOrCloseModal: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/homeassessment/api/v1/get/assessment-students?homeassessmentId=${homeassessmentId}&sessionClassId=${sessionClassId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_SINGLE_HOME_ASSESSMENT_STUDENTS, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    openOrCloseModal(true)
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const open_closeHomeAssessment = (homeAssessmentId: any, sessionClassId: any, sessionClassSubjectId: any, groupId: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            const payload = {
                homeAssessmentId
            }

            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`smp/server/homeassessment/api/v1/close/home-assessment`, payload)
                .then((res) => {
                    GetAssessments(sessionClassId, sessionClassSubjectId, groupId, 1)(dispatch);
                    setSuccessToast('Successfully changed the status of assessment')(dispatch)
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const deleteHomeAssessment = (item: string, sessionClassId: string, sessionClassSubjectId: string, groupId: string) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            const payload = {
                item
            }
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`smp/server/homeassessment/api/v1/delete/home-assessment`, payload)
                .then((res) => {
                    GetAssessments(sessionClassId, sessionClassSubjectId, groupId, 1)(dispatch);
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    setSuccessToast('Successfully deleted assessment')(dispatch)
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                });
        }
    })
}

export const getHomeAssessmentScoreRecords = (homeAssessmentId: any, openOrCloseScoreRecordModal: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post('smp/server/homeassessment/api/v1/get/home-assessment/score-record', { homeAssessmentId })
                .then((res) => {
                    dispatch({ type: actions.GET_HOME_ASSESSMENT_SCORE_RECORD, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    openOrCloseScoreRecordModal(true);
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                });
        }
    })
}

export const includeClassToScoreRecord = (homeAssessmentId: string, include: boolean, openOrCloseModal: any, handleCheck: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            const payload = {
                homeAssessmentId,
                include
            }
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post('smp/server/homeassessment/api/v1/include-class/home-assessment/to-scoreentry', payload)
                .then((res) => {
                    getHomeAssessmentScoreRecords(homeAssessmentId, openOrCloseModal)(dispatch);
                    handleCheck();
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                });

        }
    })
}


export const scoreAssessment = (homeAssessmentFeedBackId: string, score: number, comment: string, homeAssessmentId: string, sessionClassId: string, openOrCloseModal: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            const payload = {
                homeAssessmentFeedBackId,
                score,
                comment,
                include: false
            }

            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post('smp/server/homeassessment/api/v1/score/assessment-feedback', payload)
                .then((res) => {
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    getStudentAssessment(homeAssessmentId, sessionClassId, openOrCloseModal)(dispatch);
                    dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "Feedback scored successfully" });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                });
        }
    })
}
