import { actions } from "../action-types/profile-action-types"
import profileState from "../states/profile-state"


export const profileReducer = (state = profileState, { type, payload }: any) => {
    switch (type) {
        case actions.GET_TEACHER_DETAILS: {
            return {
                ...state,
                teacherDetail: payload
            }
        }
        case actions.GET_TEACHER_CLASS_AND_SUBJECT: {
            return {
                ...state,
                teacherClassAndSubject: null
            }
        }

        default:
            return state
    }
}