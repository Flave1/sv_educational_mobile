import { actions } from "../action-types/announcement-action-types"
import announcementState from "../states/announcement-state"

export const announcementReducer = (state = announcementState, { type, payload }: any) => {
    switch (type) {
        case actions.GET_ANNOUNCEMENTS: {
            return {
                ...state,
                announcementList: [...state.announcementList, ...payload.data],
                paginationProps: payload
            }
        }
        case actions.RESET: {
            return {
                ...state,
                announcementList: [],
                paginationProps: null
            }
        }
        case actions.OPEN_SINGLE: {
            return {
                ...state,
                selectedAnnouncement: payload
            }
        }

        default:
            return state
    }
}