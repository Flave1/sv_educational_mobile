import AsyncStorage from "@react-native-async-storage/async-storage"
import { actions } from "../action-types/auth-action-types"
import authState from "../states/auth-state"

export const authReducer = (state = authState, { type, payload }: any) => {
    switch (type) {
        case actions.SIGN_IN_USER: {
            AsyncStorage.setItem('token', payload.token)
            return {
                ...state,
                authResult: payload
            }
        }
        case actions.SIGN_OUT_USER: {
            AsyncStorage.removeItem('token')
            return {
                ...state,
                authResult: null
            }
        }

        default:
            return state
    }
}