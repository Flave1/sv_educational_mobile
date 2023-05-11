import { actions } from "../action-types/studentnote-action-types"
import initialState from "../states/studentnote-state"

export const studentnotesReducer = (state = initialState, { type, payload }: any) => {
    switch (type) {
        case actions.GET_STUDENT_NOTES:
            return {
                ...state,
                studentnotes: payload.data,
                totalPages: payload.totalPages,
                pageNumber: payload.pageNumber,
            }
        case actions.__GET_STUDENT_NOTES:
            return {
                ...state,
                studentnotes: [...state.studentnotes, ...payload.data],
                totalPages: payload.totalPages,
                pageNumber: payload.pageNumber
            }
       
        default:
            return state
    }
}