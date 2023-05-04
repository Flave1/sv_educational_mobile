import { actions } from "../action-types/attendance-actions-types"
import initialState from "../states/attendance-state"

export const attendanceReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case actions.GET_CLASS_REGISTER:
            return {
                ...state,
                registers: payload.data,
                totalPages: payload.totalPages,
                pageNumber: payload.pageNumber,
                // unsynchronized: []
            }
        case actions.__GET_CLASS_REGISTER:
            return {
                ...state,
                registers: [...state.registers, ...payload.data],
                totalPages: payload.totalPages,
                pageNumber: payload.pageNumber
            }
        case actions.OPEN_ATTENDANCE_REGISTER_REMOTELY:
            return {
                ...state,
                register: payload,
            }
        case actions.OPEN_ATTENDANCE_REGISTER_LOCALLY:
            return {
                ...state,
                register: payload,
                unsynchronized: state.unsynchronized.length > 0 ? [payload, ...state.unsynchronized] : [payload],
            }
        case actions.UPDATE_UNSECHRONIZED_REGISTER:
            return {
                ...state,
                unsynchronized: payload,
            }
        case actions.GET_ATTENDANCE_REGISTER:
            return {
                ...state,
                register: payload,
            }
        default:
            return state
    }
}