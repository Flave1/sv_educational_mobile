import { actions } from "../action-types/assessment-actions-types"
import assessmentState from "../states/assessment-state"

export const assessmentReducer = (state = assessmentState, { type, payload }: any) => {
    switch (type) {
        case actions.GET_HOME_ASSESSMENTS: {
            return {
                ...state,
                assessments: payload.data,
                paginationProps: payload,
                score_reocrds:[]
            }
        }
        case actions.CREATE_HOME_ASSESSMENT: {
            return {
                ...state,
                score_reocrds:[]
            }
        }
        case actions.GET_SINGLE_HOME_ASSESSMENT: {
            return {
                ...state,
                assessment: payload,
                score_reocrds:[]
            }
        }
        case actions.GET_STUDENT_FEEDBACK: {
            return {
                ...state,
                feedback: payload,
                score_reocrds:[]
            }
        }
        case actions.GET_SINGLE_HOME_ASSESSMENT_STUDENTS: {
            return {
                ...state,
                students: payload,
                score_reocrds:[]
            }
        }
        case actions.GET_HOME_ASSESSMENT_SCORE_RECORD: {
            return {
                ...state,
                score_reocrds: payload
            }
        }

        default:
            return state
    }
}