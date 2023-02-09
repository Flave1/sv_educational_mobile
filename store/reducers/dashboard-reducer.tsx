import { actions } from "../action-types/dashboard-action-types"
import dasboardState from "../states/dasboard-state"

export const dasboardReducer = (state = dasboardState, { type, payload }: any) => {
    switch (type) {
        case actions.GET_DASHBOARD_DATA: {
            
            return {
                ...state,
                dashboard: payload
            }
        }

        default:
            return state
    }
}