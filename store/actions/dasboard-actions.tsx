import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/dashboard-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { ErrorHandler } from "../../Utils/ErrorHandler";

export const GetDashboardData = () => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`all/client/dashboard/api/v1/get-mobile/dashboard-count`)
        .then((res) => {
            dispatch({ type: actions.GET_DASHBOARD_DATA, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            ErrorHandler.HandleUnexpectedError(err, actions, dispatch);
        })
}