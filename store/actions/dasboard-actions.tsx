import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/dashboard-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { Alert } from "react-native";

export const GetDashboardData = (_baseurlSuffix: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/${_baseurlSuffix}/dashboard/api/v1/get-mobile/dashboard-count`)
        .then((res) => {
            dispatch({ type: actions.GET_DASHBOARD_DATA, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            try {
                dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}