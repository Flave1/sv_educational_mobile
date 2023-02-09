import { Alert } from "react-native";
import axiosInstance from "../../axios/axiosInstance";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/class-properties";

export const GetTutorClasses = (_baseurlSuffix: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/${_baseurlSuffix}/api/v1/result/get/staff-classes`)
        .then((res) => {
            dispatch({ type: actions.GET_TUTOR_CLASSES, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            try {
                dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}

export const GetClassSubjects = (_baseurlSuffix: any, sessionClassId: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/${_baseurlSuffix}/class/api/v1/getall/class-subjects?sessionClassId=${sessionClassId}`)
        .then((res) => {
            dispatch({ type: actions.GET_CLASS_SUBJECTS, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            try {
                dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}
export const GetClassGroups = (_baseurlSuffix: any, sessionClassId: any, sessionClassSubjectId: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/${_baseurlSuffix}/class/api/v1/getall/class-group?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}`)
        .then((res) => {
            dispatch({ type: actions.GET_CLASS_GROUP, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            try {
                dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}