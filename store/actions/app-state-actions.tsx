import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from "../../axios/axiosInstance";
import { ErrorHandler } from '../../Utils/ErrorHandler';
import { actions } from "../action-types/app-state-action-types";

export const onboardUser = () => ({ type: actions.ON_BOARD });

export const GetAppState = () => (dispatch: any) => {
    AsyncStorage.getItem('onboardedUser').then((res: any) => {
        dispatch({ type: actions.GET_APP_STATE, payload: res });
        return res || null;
    })
}

export const setErrorToastState = (message: string = "") => (dispatch: any) => dispatch({ type: actions.SET_ERROR_TOAST, payload: message });
export const resetSuccessToastState = () => (dispatch: any) => dispatch({ type: actions.RESET_SUCCESS_TOAST });
export const setSuccessToast = (message: string = "") => (dispatch: any) => dispatch({ type: actions.SET_SUCCESS_TOAST, payload: message });

export const OffboardUser = () => (dispatch: any) => {
    AsyncStorage.removeItem('onboardedUser').then(() => {
        getAllSchools()(dispatch);
        dispatch({ type: actions.OFF_BOARD });
    });

}
export const getAllSchools = () => (dispatch: any) => {
    dispatch({ type: actions.SHOW_LOADING });
    axiosInstance.get('fws/client/fws/api/v1/sms-mobile/get-all/clients')
        .then((res) => {
            dispatch({ type: actions.HIDE_LOADING });
            dispatch({ type: actions.GET_ALL_SCHOOLS_SUCCESS, payload: res.data.result });
        }).catch((err: any) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        })
}

export const ValidateMobileUser = (payload: any) => (dispatch: any) => {
    dispatch({ type: actions.SHOW_LOADING });
    axiosInstance.post('fws/client/fws/api/v1/sms-mobile/validate/mobile-user', payload)
        .then((res) => {
            dispatch({ type: actions.VALIDATE_MOBILE_USER_SUCCESS, payload: res.data.result });
            dispatch({ type: actions.HIDE_LOADING });
        }).catch((err: any) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        })
}