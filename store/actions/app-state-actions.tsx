import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from "../../axios/axiosInstance";
import { ErrorHandler } from '../../Utils/ErrorHandler';
import { actions } from "../action-types/app-state-action-types";
import { Device } from '../../tools/device-properties';
import { ONBOARDEDUSER } from '../../Utils/constants';
import { School } from '../../models/on-boarding/all-schools';
import { AuhtService } from '../../services/AuthService';

export const onboardUser = () => ({ type: actions.ON_BOARD });

export const getAppState = () => (dispatch: any): Promise<any> => {
    return AsyncStorage.getItem(ONBOARDEDUSER).then((res: any) => {
        dispatch({ type: actions.GET_APP_STATE, payload: res });
        return res || null;
    })
}

export const displayError = (message: string = "") => (dispatch: any) => dispatch({ type: actions.SET_ERROR_TOAST, payload: message });
export const resetSuccessToastState = () => (dispatch: any) => dispatch({ type: actions.RESET_SUCCESS_TOAST });
export const displaySuccess = (message: string = "") => (dispatch: any) => dispatch({ type: actions.SET_SUCCESS_TOAST, payload: message });

export const offboard = () => (dispatch: any): Promise<boolean> => {
    return AsyncStorage.removeItem(ONBOARDEDUSER).then(() => {
        dispatch(AuhtService.SignOutUser())
        dispatch({ type: actions.OFF_BOARD });
        return true;
    });

}
export const getAllSchools = async () => (dispatch: any): Promise<Array<School>> => {
    return Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: actions.SHOW_LOADING });
            return axiosInstance.get('smp/server/user/api/v1/get/allschools')//fws/api/v1/sms-mobile/get-all/clients')
                .then((res) => {
                    dispatch({ type: actions.HIDE_LOADING });
                    return res.data.result as Array<School>;
                }).catch((err: any) => {                    
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, actions.REQUEST_FAILED, dispatch);
                    return new Array<School>();
                })
        }
        return new Array<School>();
    })
}

export const ValidateMobileUser = (payload: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: actions.SHOW_LOADING });
            axiosInstance.post('fws/client/fws/api/v1/sms-mobile/validate/mobile-user', payload)
                .then((res) => {
                    dispatch({ type: actions.VALIDATE_MOBILE_USER_SUCCESS, payload: res.data.result });
                    dispatch({ type: actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, actions.REQUEST_FAILED, dispatch);
                })
        }
    })
}

export const displayFullScreen = (display: boolean) => {
    return {
        type: actions.DISPLAY_FULL_SCREEN,
        payload: display
    }
}


export const Spin = (spin: boolean) => {
    if (spin)
        return {
            type: actions.SHOW_LOADING
        }
    else
        return {
            type: actions.HIDE_LOADING
        }
}

