import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/auth-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { NativeFeatures } from "../../tools/device-properties";
import AsyncStorage from "@react-native-async-storage/async-storage"

export const SignInUser = (payload: any) => (dispatch: any) => {
    NativeFeatures.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`smp/server/user/api/v1/mobile-login`, payload)
                .then((res) => {
                    AsyncStorage.setItem('token', res.data.result.authResult.token).then(() => {
                        dispatch({ type: actions.SIGN_IN_USER, payload: res.data.result.authResult });
                        dispatch({ type: app_state_actions.HIDE_LOADING });
                    });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);
                })
        }
    })
}



