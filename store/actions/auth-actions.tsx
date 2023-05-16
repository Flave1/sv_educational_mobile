import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/auth-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { Device } from "../../tools/device-properties";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { screens } from "../../screen-routes/navigation";
import { AuhtService } from "../../services/AuthService";

export const signIn = (payload: any) => (dispatch: any): Promise<any> => {
    return Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
           return axiosInstance.post(`smp/server/user/api/v1/mobile-login`, payload)
                .then((res) => {
                    AsyncStorage.setItem('token', res.data.result.authResult.token).then(() => {
                        dispatch({ type: actions.SIGN_IN_USER, payload: res.data.result.authResult });
                        dispatch({ type: app_state_actions.HIDE_LOADING });
                        return res.data.result.authResult
                    });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                })
        } else {
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }
    })
}


export const forgotPassword = (values: any,navigation:any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
     
    axiosInstance.post('/user/api/v1/forget/mobile-password', values)
        .then((res) => {
            dispatch({ type: app_state_actions.HIDE_LOADING });
            dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "An OTP has been sent" })
            navigation.navigate(screens.scenes.auth.screens.forgotpasswordotp.name);
           
            
        }).catch((err) => {
            const error: any = JSON.stringify(err.response);
            dispatch({ type: app_state_actions.SET_ERROR_TOAST, payload: "An error occured while resetting password" })
            ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
        });
    }
})
}

export const forgotPasswordOTP = (values: any,navigation:any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });

    axiosInstance.post('/user/api/v1/validate-otp-mobile', values)
        .then((res) => {
            dispatch({ type: app_state_actions.HIDE_LOADING });
            dispatch({ type: app_state_actions.SET_SUCCESS_TOAST, payload: "OTP verified" })
            navigation.navigate(screens.scenes.auth.screens.changepassword.name)
        }).catch((err) => {
            const error: any = JSON.stringify(err.response);
            dispatch({ type: app_state_actions.SET_ERROR_TOAST, payload: "An error occured while resetting password" })
            ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
        });
    }
})
}

export const changePassword = (values: any) => (dispatch: any) => {
    console.log("values",values);
    
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post('user/api/v1/reset-password-mobile', values)
                .then((res) => {
                    AsyncStorage.setItem('token', res.data.result.authResult.token).then(() => {
                        dispatch({ type: actions.SIGN_IN_USER, payload: res.data.result.authResult });
                        dispatch({ type: app_state_actions.HIDE_LOADING });
                    });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                })
        } else {
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }
})
}

