import AsyncStorage from "@react-native-async-storage/async-storage"
import { actions } from "../store/action-types/auth-action-types";

export class AuhtService {
    static IsUserAuthenticated = async (): Promise<Boolean> => {
        return await AsyncStorage.getItem('token').then((res: any) => {
            return res ? true : false
        })
    }
    static SignOutUser = () => {
        AsyncStorage.removeItem('token').then(d => {
            console.log('logged out');
        })
        return { type: actions.SIGN_OUT_USER };
    }
}

