import axiosInstance from "../../axios/axiosInstance";
import { Device } from "../../tools/device-properties";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/profile-action-types";


export const GetTeacherDetails = (teacherAccountId: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`/smp/server/tercher/api/v1/get-single/${teacherAccountId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_TEACHER_DETAILS, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}



export const updateStaffDetails = (values: any, teacherAccountId: any,navigation:any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post('/smp/server/update/teacher', values, teacherAccountId)
                .then((res) => {
                    navigation.goBack();
                    GetTeacherDetails(teacherAccountId)(dispatch);
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const getTeacherClassAndSubject = (teacherAccountId: any, sessionClassId: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`/smp/server/tercher/api/v1/get-teacher/classes-subject?teacherAccountId=${teacherAccountId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_TEACHER_CLASS_AND_SUBJECT, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}



