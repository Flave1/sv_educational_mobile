import axiosInstance from "../../axios/axiosInstance";
import { ClassRegister } from "../../models/class-properties/attendance";
import { AttendanceService } from "../../services/attendance-service";
import { Device } from "../../tools/device-properties";
import { FETCH_NO_INTERNET_ACCESS } from "../../Utils/constants";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { actions } from "../action-types/attendance-actions-types";
import { setSuccessToast } from "./app-state-actions";

export const getRegisters = (sessionClassId: any, pageNumber: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/attendance/api/v1/get/all/class-register/activeterm/${sessionClassId}?sessionClassId=${sessionClassId}&pageNumber=${pageNumber}`)
                .then((res) => {
                    dispatch({ type: actions.GET_CLASS_REGISTER, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}
export const _paginationGetRegisters = (params: any) => (dispatch: any) => {
    let sessionClassId = params.sessionClassId || '';
    let pageNumber = params.pageNumber || '';
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/attendance/api/v1/get/all/class-register/activeterm/${sessionClassId}?sessionClassId=${sessionClassId}&pageNumber=${pageNumber}`)
                .then((res) => {
                    dispatch({ type: actions.__GET_CLASS_REGISTER, payload: res.data.result });
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


export const openRegister = (sessionClassId: string, studentsCount: number) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            const payload = { sessionClassId };
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`smp/server/attendance/api/v1/create-register`, payload)
                .then((res) => {
                    console.log('res.data.result', res.data.result);

                    dispatch({ type: actions.OPEN_ATTENDANCE_REGISTER_REMOTELY, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "Attendance Register Opened remotely" });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                });
        } else {
            openRegisterLocally(sessionClassId, studentsCount)(dispatch);
        }
    })
}

export const getRegisterFromServer = (classRegisterId: string) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/server/attendance/api/v1/continue-attendance?ClassRegisterId=${classRegisterId}`)
        .then((res) => {
            dispatch({ type: actions.GET_ATTENDANCE_REGISTER, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
            dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "Attendance Register gotten from the server" });
        }).catch((err) => {
            const error: any = JSON.stringify(err.response);
            ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
        });
}


export const openRegisterLocally = (sessionClassId: string, studentsCount: number) => (dispatch: any) => {
    AttendanceService.createRegister(sessionClassId, studentsCount).then(reg => {
        dispatch({
            type: actions.OPEN_ATTENDANCE_REGISTER_LOCALLY,
            payload: reg
        })
        dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "Attendance Register Opened locally" })
    });
}

export const getRegisterLocally = (classRegisterId: string, classRegisters: ClassRegister[]) => (dispatch: any) => {

    AttendanceService.getRegister(classRegisterId, classRegisters).then(reg => {
        dispatch({
            type: actions.GET_ATTENDANCE_REGISTER,
            payload: reg
        })
        dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "Attendance Register gotten locally" })
    });
    
}

export const updateUnsechronized = (reg: ClassRegister) => (dispatch: any) => {
    dispatch({
        type: actions.UPDATE_UNSECHRONIZED_REGISTER,
        payload: reg
    })
}

export const changeStudentAvailabilityStatus = (classRegisterId: string, sessionClassId: string, studentContactId: string, isPresent: false, classRegisterLabel: string) => (dispatch: any) => {
    const payload = {
        classRegisterId,
        isPresent,
        studentContactId,
        sessionClassId,
        registerLabel: classRegisterLabel
    };
    axiosInstance.post(`smp/server/attendance/api/v1/update/student-attendance-mobile`, payload)
        .then((res) => {
            console.log('remote update done for: ', res.data.result);
        }).catch((err) => {
            const error: any = JSON.stringify(err.response);
            ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
        });
}

export const renameRegister = (values: any,openModal:any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`/smp/server/attendance/api/v1/update/class-register?ClassRegisterId=${values.classRegisterId}&RegisterLabel=${values.classRegisterLabel}`)
                .then((res) => {
                    openModal(false)
                    getRegisters(values.sessionClass, 1)(dispatch);
                    dispatch({ type: actions.RENAME_ATTENDANCE });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                });
        }
    })
}

export const deleteRegister = (item: string, sessionClassId: string) => (dispatch: any) => {
    console.log("item delete",item);
    
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`/smp/server/attendance/api/v1/delete/class-register?item=${item}`)
                .then((res) => {
                    getRegisters(sessionClassId, 1)(dispatch);
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                    setSuccessToast('Successfully deleted assessment')(dispatch)
                }).catch((err) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                });
        }
    })
}