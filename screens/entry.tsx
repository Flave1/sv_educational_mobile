import React, { useEffect, useState } from 'react';
import {
    StatusBar,
    useColorScheme,
} from 'react-native';

import Onboarding from './on-boarding/OnBoarding';
import { IAppState } from '../interfaces/app-state/state';
import { getAppState } from '../store/actions/app-state-actions';
import { AppDark, AppLight } from '../tools/color';
import SignIn from './authentication/sign-in';
import TeacherDashboard from './dashboards/teacher-dashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { screens } from '../screen-routes/navigation';
import { OnboardedUser } from '../models/on-boarding/onboarded-user';
import AnnouncementList from './announcement/announcement-list';
import { useNavigation } from '@react-navigation/native';
import AnnouncementDetail from './announcement/announcement-detail';
import SchoolSetup from './on-boarding/school-setup';
import AssessmentIndex from './assessment';
import AssessmentCreate from './assessment/ceate';
import AssessmentDetail from './assessment/detail';
import StudentHomeAssessmentDetail from './assessment/student-h-assessment-detail';
import SessionClassIndex from './session-class/index';
import AttendanceIndex from './attendance/index';
import TakeAttendanceRecord from './attendance/take-attendance';
import ContinueAttendance from './attendance/continue-attendance';
import ClassnoteIndex from './classnote/index';
import ClassNoteCreate from './classnote/create-classNote';
import ClassNoteUpdate from './classnote/update-classnote';
import ClassStudents from './session-class/class-students';
import ClassStudentInfo from './session-class/class-student-info';
import ClassSubjects from './session-class/class-subjects';
import StudentnoteDetails from './studentnote/note-details';
import StudentNoteIndex from './studentnote';
import ClassInfoDetails from './class-info/index';
import ClassInfoIndex from './class-info';
import { connect } from 'react-redux';



const Entry = (props: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = { backgroundColor: isDarkMode ? AppDark : AppDark };
    const statusBar = <StatusBar barStyle={isDarkMode ? 'light-content' : 'light-content'} backgroundColor={backgroundStyle.backgroundColor} />
    const [persistedUser, setPersistedUser] = useState<OnboardedUser>();

    useEffect(() => {
        props.getState().then((res: any) => {
            try {
                props.onboardedUser && setPersistedUser(JSON.parse(props.onboardedUser))
            } catch (error) {
                props.onboardedUser && setPersistedUser(JSON.parse(JSON.stringify(props.onboardedUser)))
            }
        });
    }, []);


    return (
        <>
            {statusBar}
            <StackNavigator state={props.state} dispatch={props.dispatch} backgroundStyle={backgroundStyle} persistedUser={persistedUser} />
        </>
    );
};

function mapStateToProps(state: any) {
    return {
        onboardedUser: state.appState,
        state: state
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
        getState: () => getAppState()(dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Entry);

const StackNavigator = (parentProps: any) => {

    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    return (//screens.scenes.onBoarding.screens.setup.name
        <>
            <Stack.Navigator initialRouteName={screens.scenes.mainapp.scenes.tutor.screens.home.name}>
                <Stack.Screen name={screens.scenes.onBoarding.screens.viewpagers.name} options={{ headerShown: false }}>
                    {props => <Onboarding {...props} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.onBoarding.screens.setup.name}>
                    {props => <SchoolSetup {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.auth.screens.signin.name}>
                    {props => <SignIn {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.home.name}>
                    {props => <TeacherDashboard {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.announcement.name}>
                    {props => <AnnouncementList {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.announcement.screen.detail.name}>
                    {props => <AnnouncementDetail {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.sessionClass.name}>
                    {props => <SessionClassIndex {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
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
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.attendance.name}>
                    {props => <AttendanceIndex {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.attendance.screens.takeAttendanceRecord.name}>
                    {props => <TakeAttendanceRecord {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.attendance.screens.continueAttendanceRecord.name}>
                    {props => <ContinueAttendance {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.classnote.name}>
                    {props => <ClassnoteIndex {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.classnote.screens.createClassnote.name}>
                    {props => <ClassNoteCreate {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.classnote.screens.updateClassnote.name}>
                    {props => <ClassNoteUpdate {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} persistedUser={parentProps.persistedUser} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.classStudents.name}>
                    {props => <ClassStudents {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.classStudents.screens.info.name}>
                    {props => <ClassStudentInfo {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.classSubjects.name}>
                    {props => <ClassSubjects {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.studentnote.name}>
                    {props => <StudentNoteIndex {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.studentnote.screens.studentnoteDetails.name}>
                    {props => <StudentnoteDetails {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={screens.scenes.mainapp.scenes.tutor.screens.classInfo.name}>
                    {props => <ClassInfoIndex {...props} backgroundColor={parentProps.backgroundStyle.backgroundColor} navigation={navigation} />}
                </Stack.Screen>


            </Stack.Navigator>
        </>

    )
}





