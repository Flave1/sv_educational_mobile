import { School } from "../../models/on-boarding/all-schools";
import { OnboardedUser } from "../../models/on-boarding/onboarded-user";

export class IAppState {
    backgroundColor: string = "";
    textColor: string = "";
    doneWithOnBoarding: boolean = false;
    loading: boolean = false;
    allSchools: Array<School> = [];
    onboardedUser = new Object();
    information: string = ""
    error: string = "";
    success: string = ""
}