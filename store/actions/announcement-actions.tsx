import { Alert } from "react-native";
import axiosInstance from "../../axios/axiosInstance";
import { actions } from "../action-types/announcement-action-types";
import { actions as app_state_actions } from "../action-types/app-state-action-types";

export const GetAnnouncements = (_baseurlSuffix: any, pageNumber: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.get(`smp/${_baseurlSuffix}/announcements/api/v1/get/announcements?PageNumber=${pageNumber}&PageSize=${20}`)
        .then((res) => {
            dispatch({ type: actions.GET_ANNOUNCEMENTS, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            try {
                dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}

export const ResetAnnouncementState = () => (dispatch: any) => {
    dispatch({ type: actions.RESET, })
}

export const OpenAnnouncement = (_baseurlSuffix: any, id: any) => (dispatch: any) => {
    dispatch({ type: app_state_actions.SHOW_LOADING });
    axiosInstance.post(`smp/${_baseurlSuffix}/announcements/api/v1/update/seen-announcement`, { announcementsId: id })
        .then((res) => {
            console.log('selectedAnnouncement', res.data.result);
            
            dispatch({ type: actions.OPEN_SINGLE, payload: res.data.result });
            dispatch({ type: app_state_actions.HIDE_LOADING });
        }).catch((err: any) => {
            try {
                dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err?.response.data.message.friendlyMessage });
            } catch (error) {
                Alert.alert('Unexpected Error occurred ')
            }
        })
}