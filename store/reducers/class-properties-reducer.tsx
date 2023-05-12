import { actions } from "../action-types/class-properties"
import classPropertiesState from "../states/class-properties-state"

export const classPropertiesReducer = (state = classPropertiesState, { type, payload }: any) => {
    switch (type) {
        case actions.GET_TUTOR_CLASSES: {
            return {
                ...state,
                tutorClasses: payload
            }
        }
        case actions.GET_CLASS_SUBJECTS: {
            return {
                ...state,
                classSubjects: payload
            }
        }
        case actions.GET_CLASS_GROUP: {
            return {
                ...state,
                classGroup: payload
            }
        }
        case actions.GET_CLASS_STUDENTS:
            return {
                ...state,
                classStudents: payload
            }

            case actions.GET_SESSION_CLASS_WITHOUT_SUBJ:
            return {
                ...state,
                classInfoWithoutSubj: payload
            }
            case actions.GET_SESSION_CLASS_SUBJECT:
                return {
                    ...state,
                    sessionClassSubj: payload
                }
            

        default:
            return state
    }
}