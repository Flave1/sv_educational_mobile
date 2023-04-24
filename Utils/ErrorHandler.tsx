// import { Vibration } from "react-native";
import { AuhtService } from "../services/AuthService";

export class ErrorHandler {
    static HandleUnexpectedError(err: any, action: string, dispatch: any) {
        const error: any = JSON.parse(err)
        
        try {
           
            if (error?.status === 500) {
                dispatch({ type: action, payload: "Unexpected internal error occurred" });
                return;
            }
            if (error?.request?.status == 500) {
                dispatch({ type: action, payload: "Unexpected Error occurred in background" });
                return;
            }
            if (error?.request?.status == 401) {
                // Alert.alert('Session Expired', 'Your Session has expired')
                // Vibration.vibrate(500)
                dispatch({ type: action, payload: 'Your Session has expired' });
                dispatch(AuhtService.SignOutUser())
                return;
            }
            if (error?.request?.status == 400) {
                dispatch({ type: action, payload: error?.data?.message?.friendlyMessage });
                return;
            }

        }
        catch (error: any) {
            dispatch({ type: action, payload: "Unexpected Error occurred in background" });
        }
    }
}