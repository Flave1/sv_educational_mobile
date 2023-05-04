import axiosInstance from "../../axios/axiosInstance";
import { ClassStudent } from "../../models/class-properties/students";
import { ClassService } from "../../services/Class-service";
import { Device } from "../../tools/device-properties";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/class-properties";

export const GetTutorClasses = () => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/api/v1/result/get/staff-classes`)
                .then((res) => {
                    dispatch({ type: actions.GET_TUTOR_CLASSES, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}

export const GetClassSubjects = (sessionClassId: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/class/api/v1/getall/class-subjects?sessionClassId=${sessionClassId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_CLASS_SUBJECTS, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}
export const GetClassGroups = (sessionClassId: any, sessionClassSubjectId: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/class/api/v1/getall/class-group?sessionClassId=${sessionClassId}&sessionClassSubjectId=${sessionClassSubjectId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_CLASS_GROUP, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}

export const GetClassStudents = (sessionClassId: any, existingStudents: ClassStudent[]) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/class/api/v1/get-students/mobile/${sessionClassId}`)
                .then((res) => {
                    ClassService.re_initialize_students(res.data.result, existingStudents).then(result => {
                        dispatch({ type: actions.GET_CLASS_STUDENTS, payload: result });
                        dispatch({ type: app_state_actions.HIDE_LOADING });
                    });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        } else {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: 'Seems internet is not accessible ' });
        }
    })
}