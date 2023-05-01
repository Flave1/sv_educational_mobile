import { School } from "../../models/on-boarding/all-schools";

export class IAppState {
    backgroundColor: string = "";
    textColor: string = "";
    doneWithOnBoarding: boolean = false;
    loading: boolean = false;
    allSchools: Array<School> = [];
    onboardedUser = "";
    information: string = ""
    error: string = "";
    success: string = ""
}