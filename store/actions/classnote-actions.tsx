import axiosInstance from "../../axios/axiosInstance";
import { Teacher, SendToClasses } from "../../models/class-properties/Tutor-class";
import { Device } from "../../tools/device-properties";
import { FETCH_NO_INTERNET_ACCESS } from "../../Utils/constants";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/classnote-actions-types";
import { setSuccessToast } from "./app-state-actions";

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
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    getClassnotes(values.sessionClass.lookUpId, values.subjectId, -2, 1)(dispatch);
                    navigation.goBack();
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
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    getClassnotes(values.sessionClass.lookUpId, values.subjectId, -2, 1)(dispatch);
                    navigation.goBack();
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
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const getSharedNoteClasses = (teacherClassNoteId: string) => (dispatch: any): Promise<SendToClasses[]>=> {
   return Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
          return axiosInstance.get(`/smp/server/classnotes/api/v1/get-note/shared-class?teacherClassNoteId=${teacherClassNoteId}`)
                .then((res) => {
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    return res.data.result as SendToClasses[]
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                    return new Array<SendToClasses>()
                })
        }
        return new Array<SendToClasses>()
    })
}

export const sendClassNotes = (teacherClassNoteId: string, classes: string[], openOrCloseSendClassnoteModal: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            const payload = {
                teacherClassNoteId,
                classes,
            }

            axiosInstance.post('/smp/server/classnotes/api/v1/send/classnotes/to-students', payload)
                .then((res) => {
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    openOrCloseSendClassnoteModal(false)
                    dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "Class note sent to class(es)" })
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const shareClassNotesToStaff = (classNoteId: string, teacherId: string[], openOrCloseShareClassNoteModal: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.HIDE_LOADING });
            const payload = {
                classNoteId,
                teacherId,
            };
            
            axiosInstance.post('/smp/server/classnotes/api/v1/share/classnote', payload)
                .then((res) => {
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    openOrCloseShareClassNoteModal(false)
                    dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "Class note shared to staff(s)" })
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const getAllOtherStaff = (classNoteId: string) => (dispatch: any): Promise<Teacher[]>=> {
    return Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            return axiosInstance.get(`/smp/server/classnotes/api/v1/get-note/other-teachers?classNoteId=${classNoteId}`)
                .then((res) => {
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    return res.data.result as Teacher[]
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                    return new Array<Teacher>()
                })
        }
        return new Array<Teacher>()
    })
}

export const downloadClassNote = (classNoteId: string) => (dispatch: any): Promise<string>=> {
    return Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            return axiosInstance.get(`/smp/server/classnotes/api/v1/download/${classNoteId}`)
                .then((res) => {
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    return res.data.result
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                    return err
                })
        }
        
    })
}