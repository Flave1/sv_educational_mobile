import { Alert } from "react-native";
import { SignOutUser } from "../store/actions/auth-actions";
import { UNAUTHORIZED } from "./constants";

export class ErrorHandler {
    static HandleUnexpectedError(err: any, app_state_actions: any, dispatch: any) {
console.log('err.response.status', err.response.status);

        try {
            if (err.response.status == 401) {
                console.log('error captured', err);
                Alert.alert('Session Expired')
                dispatch({ type: app_state_actions.HIDE_LOADING });
                SignOutUser()(dispatch)
                return;
            }
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: err.response.data.message.friendlyMessage });
        }
        catch (error: any) {
            console.log('error in handler', error);
            Alert.alert('Unexpected Error occurred', "Unexpected Error occurred in background")
        }
    }
}