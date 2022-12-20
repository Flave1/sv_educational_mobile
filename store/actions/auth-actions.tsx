import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/auth-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";

export const SignInUser = (payload: any, _baseurlSuffix: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.post(`smp/${_baseurlSuffix}/user/api/v1/mobile-login`, payload)
        .then((res) => {     
            dispatch({ type: actions.SIGN_IN_USER, payload: res.data.result.authResult });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
        })
}