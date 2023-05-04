import { School } from "../../models/on-boarding/all-schools";
import { OnboardedUser } from "../../models/on-boarding/onboarded-user";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
    backgroundColor: '',
    textColor: '',
    doneWithOnBoarding: false,
    loading: false,
    allSchools: new Array<School>(),
    onboardedUser: null,
    information: "",
    error: "",
    success: "",
    fullScreen: false
}