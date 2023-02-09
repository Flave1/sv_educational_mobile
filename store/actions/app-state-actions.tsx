import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axiosInstance from "../../axios/axiosInstance";
import { OnboardedUser } from '../../models/on-boarding/onboarded-user';
import { actions } from "../action-types/app-state-action-types";

export const onboardUser = () => ({ type: actions.ON_BOARD });

export const GetAppState = () => (dispatch: any) => {
    AsyncStorage.getItem('onboardedUser').then((res: any) => {
        dispatch({ type: actions.GET_APP_STATE, payload: res });
        return res || null;
    })
}

export const SetErrorToastState = (message: string = "") => (dispatch: any) => dispatch({ type: actions.SET_ERROR_TOAST, payload: message });
export const ResetSuccessToastState = () => (dispatch: any) => dispatch({ type: actions.RESET_SUCCESS_TOAST });

export const OffboardUser = () => (dispatch: any) => {
    AsyncStorage.removeItem('onboardedUser').then(() => {
        getAllSchools()(dispatch);
        // GetAppState()(dispatch)
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
            try {
                dispatch({ type: actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}

export const ValidateMobileUser = (payload: any) => (dispatch: any) => {
    dispatch({ type: actions.SHOW_LOADING });
    axiosInstance.post('fws/client/fws/api/v1/sms-mobile/validate/mobile-user', payload)
        .then((res) => {
            dispatch({ type: actions.VALIDATE_MOBILE_USER_SUCCESS, payload: res.data.result });
            dispatch({ type: actions.HIDE_LOADING });
        }).catch((err: any) => {
            try {
                dispatch({ type: actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}