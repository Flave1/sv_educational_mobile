import { actions } from "../action-types/attendance-actions-types"
import authState from "../states/attendance-state"

export const attendanceReducer = (state = authState, { type, payload }: any) => {
    switch (type) {
        // case actions.SIGN_IN_USER: {
        //     return {
        //         ...state,
        //         authResult: payload
        //     }
        // }
        // case actions.SIGN_OUT_USER: {
        //     return {
        //         ...state,
        //         authResult: null
        //     }
        // }
        default:
            return state
    }
}