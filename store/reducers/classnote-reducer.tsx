import { actions } from "../action-types/classnote-actions-types"
import initialState from "../states/classnotes-state"

export const classnotesReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case actions.GET_CLASS_NOTES:
            return {
                ...state,
                classnotes: payload.data,
                totalPages: payload.totalPages,
                pageNumber: payload.pageNumber,
                unsynchronized: []
            }
        case actions.__GET_CLASS_NOTES:
            return {
                ...state,
                classnotes: [...state.classnotes, ...payload.data],
                totalPages: payload.totalPages,
                pageNumber: payload.pageNumber
            }

            case actions.GET_SHARED_CLASS_NOTES_CLASSES:
            return {
                ...state,
                staffClasses: payload,
            }
            case actions.GET_OTHER_STAFF:
                return {
                    ...state,
                    otherStaffList: payload,
                }

        default:
            return state
    }
}