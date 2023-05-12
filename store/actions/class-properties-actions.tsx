import axiosInstance from "../../axios/axiosInstance";
import { ClassSubjects } from "../../models/class-properties/class-subjects";
import { ClassStudentInfo } from "../../models/class-properties/students";
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
export const GetClassSubjects2 = (sessionClassId: any) => (dispatch: any): Promise<ClassSubjects> => {
    return Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            return axiosInstance.get(`smp/server/subject/api/v1/getall/subject-by-class?sessionClassId=${sessionClassId}`)
                .then((res) => {
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    return res.data.result as ClassSubjects;
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                    return new ClassSubjects();
                })
        } else {
            return new ClassSubjects();
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

export const GetClassStudents = (sessionClassId: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/class/api/v1/get-students/mobile/${sessionClassId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_CLASS_STUDENTS, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        } else {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: 'Seems internet is not accessible ' });
        }
    })
}

export const GetSingleStudent = (studentContactId: any) => (dispatch: any): Promise<ClassStudentInfo> => {
    return Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            return axiosInstance.get(`smp/server/student/api/v1/get-single/${studentContactId}`)
                .then((res) => {
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    return res.data.result as ClassStudentInfo;
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                    return new ClassStudentInfo();
                })
        } else {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: 'Seems internet is not accessible ' });
            return new ClassStudentInfo();
        }
    })
}

export const getSessionClassWithoutSubj = (sessionClassId: string) => (dispatch: any) => {

    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`/smp/server/class/api/v1/get-single/session-classes/without-subs-students/${sessionClassId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_SESSION_CLASS_WITHOUT_SUBJ, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}
export const getSessionClassSubjects = (sessionClassId: string) => (dispatch: any) => {

    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`/smp/server/class/api/v1/session-classes/subjetcs/${sessionClassId}`)
                .then((res) => {
                    dispatch({ type: actions.GET_SESSION_CLASS_SUBJECT, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}