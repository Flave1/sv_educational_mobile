import AsyncStorage from "@react-native-async-storage/async-storage";
import { actions } from "../action-types/app-state-action-types";
import appState from "../states/app-state";
export const appStateReducer = (state = appState, { type, payload }: any) => {

    switch (type) {
        case actions.ON_BOARD:
            return {
                ...state,
                doneWithOnBoarding: true
            }
        case actions.OFF_BOARD: {
            return {
                ...state,
                doneWithOnBoarding: false,
                onboardedUser: null
            }
        }


        case actions.SHOW_LOADING:
            return {
                ...state,
                loading: true,
                error: "",
                success: "",
                information: ""
            }

        case actions.HIDE_LOADING:
            return {
                ...state,
                loading: false,
            }

        case actions.SET_ERROR_TOAST:
            return {
                ...state,
                error: payload,
            }
        case actions.SET_SUCCESS_TOAST:
            return {
                ...state,
                success: payload,
            }

        case actions.RESET_SUCCESS_TOAST:
            return {
                ...state,
                success: "",
            }
        case actions.REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                error: payload
            }

        case actions.GET_ALL_SCHOOLS_SUCCESS: {
            const mySate = {
                ...state,
                allSchools: payload,
                success: "",
                error: ""
            }
            return mySate;

        }
        case actions.VALIDATE_MOBILE_USER_SUCCESS: {
            AsyncStorage.setItem('onboardedUser', JSON.stringify(payload));
            return {
                ...state,
                allSchools: [],
                doneWithOnBoarding: true,
                onboardedUser: payload,
                success: "Successfully onboarded!! Please provide your password to login",
            }
        }

        case actions.GET_APP_STATE: {
            return {
                ...state,
                doneWithOnBoarding: payload ? true : false,
                onboardedUser: payload,
                success: "",
            }
        }


        default:
            return state
    }
}