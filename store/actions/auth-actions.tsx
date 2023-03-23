import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/auth-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { Alert } from "react-native";

export const SignInUser = (payload: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.post(`all/client/user/api/v1/mobile-login`, payload)
        .then((res) => {
            dispatch({ type: actions.SIGN_IN_USER, payload: res.data.result.authResult });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            console.log('error: ', payload);
            ErrorHandler.HandleUnexpectedError(err, app_state_actions, dispatch);
        })
}

export const SignOutUser = () => (dispatch: any) => {
    dispatch({ type: actions.SIGN_OUT_USER });
}