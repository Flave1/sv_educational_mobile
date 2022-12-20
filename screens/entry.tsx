import React, { useEffect } from 'react';
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
import { navigationRoutes } from '../screen-routes/navigation';

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

    useEffect(() => {
        GetAppState()(props.dispatch);
    }, [])

    return (
        <>
            {statusBar}
            <StackNavigator state={props.state} dispatch={props.dispatch} backgroundStyle={backgroundStyle} />
        </>
    );
};


export default Entry;

const StackNavigator = (parentProps: any) => {

    const Stack = createNativeStackNavigator();
    return (
        <>
            <Stack.Navigator initialRouteName={navigationRoutes.scenes.auth.screens.signin.name}>
                <Stack.Screen name={navigationRoutes.scenes.onBoarding.name} options={{ headerShown: false }}>
                    {props => <Onboarding {...props} dispatch={parentProps.dispatch} state={parentProps.state} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={navigationRoutes.scenes.auth.screens.signin.name}>
                    {props => <SignIn {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} />}
                </Stack.Screen>
                <Stack.Screen options={{ headerShown: false }} name={navigationRoutes.scenes.mainapp.scenes.tutor.screens.home.name}>
                    {props => <TeacherDashboard {...props} dispatch={parentProps.dispatch} state={parentProps.state} backgroundColor={parentProps.backgroundStyle.backgroundColor} />}
                </Stack.Screen>
                
            </Stack.Navigator>
        </>

    )
}





