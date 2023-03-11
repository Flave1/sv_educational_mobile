import axiosInstance from "../../axios/axiosInstance";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/class-properties";

export const GetTutorClasses = () => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`all/client/api/v1/result/get/staff-classes`)
        .then((res) => {
            dispatch({ type: actions.GET_TUTOR_CLASSES, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        })
}

export const GetClassSubjects = (sessionClassId: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`all/client/class/api/v1/getall/class-subjects?sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({ type: actions.GET_CLASS_SUBJECTS, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        })
}
export const GetClassGroups = (sessionClassId: any, sessionClassSubjectId: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`all/client/class/api/v1/getall/class-group?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}`)
        .then((res) => {
            dispatch({ type: actions.GET_CLASS_GROUP, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        })
}