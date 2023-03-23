import { Alert } from "react-native";
import { SignOutUser } from "../store/actions/auth-actions";

export class ErrorHandler {
    static HandleUnexpectedError(err: any, app_state_actions: any, dispatch: any) {
        try {
            if (err.response === undefined) {
                dispatch({ type: app_state_actions.REQUEST_FAILED, payload: "Some internal error occurred" });
                return;
            }
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
            dispatch({ type: app_state_actions.REQUEST_FAILED, payload: "Unexpected Error occurred in background" });
        }
    }
}