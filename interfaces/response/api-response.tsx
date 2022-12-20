export interface IResponse {
    type: string,
    payload: IOnboardResponse
}

interface IOnboardResponse {
    result: OnBoardResponse,
    message: ApiResponseMessage
}

interface ApiResponseMessage {
    friendlyMessage: string,
    technicalMessage: string
}

interface OnBoardResponse {
    status: "",
    fullName: null,
    userName: null,
    registrationNumber: null,
    schoolLogo: null,
    baseUrlAppendix: null
}