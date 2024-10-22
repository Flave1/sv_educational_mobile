import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/dashboard-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { Device } from "../../tools/device-properties";
import { AxiosError } from "axios";

export const GetDashboardData = () => (dispatch: any) => { 
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        console.log('Called ');
        
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/server/dashboard/api/v1/get-mobile/dashboard-count`)
                .then((res) => {
                    console.log('res', res.data);
                    
                    dispatch({ type: actions.GET_DASHBOARD_DATA, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: AxiosError) => {
                    console.log('error', err);
                    
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}
    