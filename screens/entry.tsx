import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    useColorScheme,
} from 'react-native';

import Onboarding from './on-boarding/OnBoarding';
import { IAppState } from '../interfaces/app-state/state';
import { onboardUser, OffboardUser, GetAppState } from '../store/actions/app-state-actions';
import { AppDark, AppLight } from '../tools/color';
import SignIn from './authentication/sign-in';
import { IAuthState } from '../interfaces/auth/IAuth';
import TeacherDashboard from './dashboards/teacher-dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../screen-routes/navigation';
import ProtectedTeacher from './authentication/protected-teacher';
import { OnboardedUser } from '../models/on-boarding/onboarded-user';
import AnnouncementList from './announcement/announcement-list';
import { useNavigation } from '@react-navigation/native';
import AnnouncementDetail from './announcement/announcement-detail';
import SessionClassIndex from './components/session-class';
import AssessmentIndex from './components/session-class/assessment';
import AssessmentCreate from './components/session-class/assessment/ceate';
import AssessmentDetail from './components/session-class/assessment/detail';
import StudentHomeAssessmentDetail from './components/session-class/assessment/student-h-assessment-detail';
import SchoolSetup from './on-boarding/school-setup';

function mapStateToProps(state: IAppState) {
    const { backgroundColor } = state;
    // ownProps would look like { "id" : 123 }
    // const { id } = ownProps
    // const todo = getTodoById(state, id)
    return { backgroundColor: backgroundColor }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        onboard: () => dispatch(onboardUser()),
        offboard: () => dispatch(OffboardUser())
    }
}

const Entry = (props: any) => {

    const { onboardedUser }: IAppState = props.state?.appState;
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? AppDark : AppLight };
    const statusBar = <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />

    const [persistedUser, setPersistedUser] = useState<OnboardedUser>()
    useEffect(() => {
        GetAppState()(props.dispatch);
    }, []);

    React.useEffect(() => {
        try {
            onboardedUser && setPersistedUser(JSON.parse(onboardedUser))
        } catch (error) {
            console.log('error', error);
            onboardedUser && setPersistedUser(JSON.parse(JSON.stringify(onboardedUser)))
        }
    }, [onboardedUser]);

    return (
        <>
            {statusBar}
            <StackNavigator state={props.state} dispatch={props.dispatch} backgroundStyle={backgroundStyle} persistedUser={persistedUser} />
        </>
    );
};


export default Entry;

const StackNavigator = (parentProps: any) => {

    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    return (
        <>

            <Stack.Navigator initialRouteName={screens.scenes.onBoarding.screens.viewpagers.name}>
                <Stack.Screen name={screens.scenes.onBoarding.screens.viewpagers.name} options={{ headerShown: false }}>
                    {props => <Onboarding {...props} dispatch={parentProps.dispatch} state={parentProps.state} persistedUser={parentProps.persistedUser} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.onBoarding.screens.setup.name}>
                    {props => <SchoolSetup {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.auth.screens.signin.name}>
                    {props => <SignIn {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.home.name}>
                    {props => <TeacherDashboard {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.wrapper.name}>
                    {props => <ProtectedTeacher {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.announcement.name}>
                    {props => <AnnouncementList {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.announcement.screen.detail.name}>
                    {props => <AnnouncementDetail {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.sessionClass.name}>
                    {props => <SessionClassIndex {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.name}>
                    {props => <AssessmentIndex {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.create.name}>
                    {props => <AssessmentCreate {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.detail.name}>
                    {props => <AssessmentDetail {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.detail.screens.feedback.name}>
                    {props => <StudentHomeAssessmentDetail {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>

            </Stack.Navigator>
        </>

    )
}





