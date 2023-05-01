import axiosInstance from "../../axios/axiosInstance";
import { Device } from "../../tools/device-properties";
import { ErrorHandler } from "../../Utils/ErrorHandler";
import { actions } from "../action-types/announcement-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";

export const GetAnnouncements = (_baseurlSuffix: any, pageNumber: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.get(`smp/${_baseurlSuffix}/announcements/api/v1/get/announcements?PageNumber=${pageNumber}&PageSize=${20}`)
                .then((res) => {
                    dispatch({ type: actions.GET_ANNOUNCEMENTS, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}

export const ResetAnnouncementState = () => (dispatch: any) => {
    dispatch({ type: actions.RESET, })
}

export const OpenAnnouncement = (_baseurlSuffix: any, id: any) => (dispatch: any) => {
    Device.isInternetAvailable().then((hasInternetAccess: boolean) => {
        if (hasInternetAccess) {
            dispatch({ type: app_state_actions.SHOW_LOADING });
            axiosInstance.post(`smp/${_baseurlSuffix}/announcements/api/v1/update/seen-announcement`, { announcementsId: id })
                .then((res) => {
                    dispatch({ type: actions.OPEN_SINGLE, payload: res.data.result });
                    dispatch({ type: app_state_actions.HIDE_LOADING });
                }).catch((err: any) => {
                    const error: any = JSON.stringify(err.response);
                    ErrorHandler.HandleUnexpectedError(error, app_state_actions.REQUEST_FAILED, dispatch);;
                })
        }
    })
}