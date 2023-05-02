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
        } else
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: FETCH_NO_INTERNET_ACCESS })
    })
}
export const _paginationGetClassnotes = (params: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {

        let sessionClassId = params.sessionClassId || '';
        let subjectId = params.sessionCsubjectIdlassId || '';
        let status = params.status || '';
        let pageNumber = params.pageNumber || '';

        console.log('sessionClassId', sessionClassId);
        console.log('subjectId', subjectId);
        console.log('status', status);
        console.log('pageNumber', pageNumber);

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

