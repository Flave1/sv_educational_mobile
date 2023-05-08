import axiosInstance from "../../axios/axiosInstance";
import { Device } from "../../tools/device-properties";
import { FETCH_NO_INTERNET_ACCESS } from "../../Utils/constants";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/classnote-actions-types";

export const getClassnotes = (sessionClassId: string, subjectId: string, status: number = -2, pageNumber: number = 1) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/classnotes/api/v1/get/classnotes/by-teacher/mobile?classId=${sessionClassId}&subjectId=${subjectId}&status=${status}&pageNumber=${pageNumber}`)
                .then((res) => {
                    dispatch({ type: actions.GET_CLASS_NOTES, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        } 
    })
}
export const _paginationGetClassnotes = (params: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        let sessionClassId = params.sessionClassId || '';
        let subjectId = params.sessionCsubjectIdlassId || '';
        let status = params.status || '';
        let pageNumber = params.pageNumber || '';
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/classnotes/api/v1/get/classnotes/by-teacher/mobile?classId=${sessionClassId}&subjectId=${subjectId}&status=${status}&pageNumber=${pageNumber}`)
                .then((res) => {
                    dispatch({ type: actions.__GET_CLASS_NOTES, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        } else {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: FETCH_NO_INTERNET_ACCESS })
        }
    })
}


export const createClassNote = (values: any, navigation: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post('/smp/server/classnotes/api/v1/create/classnote', values)
                .then((res) => {
                    navigation.goBack();
                    dispatch({ type: actions.CREATE_CLASS_NOTE });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    getClassnotes(values.sessionClass, values.sessionClassSubject, -2,  1)(dispatch);
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const updateClassNote = (values: any, navigation: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            
            axiosInstance.post('/smp/server/classnotes/api/v1/update/classnote', values)
                .then((res) => {
                    navigation.goBack();
                    dispatch({ type: actions.UPDATE_CLASS_NOTE });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    getClassnotes(values.sessionClass, values.sessionClassSubject, -2,  1)(dispatch);
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const sendForApproval = (values: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post('/smp/server/classnotes/api/v1/send/classnotes/for-approval', values)
                .then((res) => {
                    dispatch({ type: actions.SEND_FOR_APPROVAL });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}