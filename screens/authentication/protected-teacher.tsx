import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, useColorScheme, View } from "react-native";
import {
    Backdrop,
    AppBar,
    IconButton,
    Stack,
    HStack,
} from "@react-native-material/core";

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppLight } from "../../tools/color";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../screen-routes/navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuhtService } from "../../services/AuthService";
import { connect } from "react-redux";
import SessionClassProperties from "../session-class/session-class-properties";
import { displayFullScreen } from "../../store/actions/app-state-actions";
import ListComponent from "../layouts/list-component";
import Feather from "react-native-vector-icons/Feather";
import Animated, { Transitioning, Transition } from 'react-native-reanimated';

const ProtectedTeacher = (props: any) => {
    const [revealed, setRevealed] = useState(false);
    const [isFullScreen, setFullScreen] = useState<false>(props.appState.fullScreen);
    const [mainDisplayHeight, setMainDisplayHeight] = useState<string>('85%');
    const transitionRef = useRef<any>(null);
    const isDarkMode = useColorScheme() === 'dark';
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;


    const logoutDialog = () => {
        Alert.alert(
            'Logout',
            'Do you really want to log out ?',
            [
                {
                    text: 'CANCEL',
                    onPress: () => { '' },
                },
                {
                    text: 'YES',
                    onPress: () => {
                        props.logout();
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const transition = (
        <Transition.Sequence>
            <Transition.In type="slide-left" durationMs={500} delayMs={1000} />
            <Transition.Out type="slide-left" durationMs={500} />
        </Transition.Sequence>
    );

    React.useEffect(() => {
        AuhtService.IsUserAuthenticated().then((loggedIn: Boolean) => {
            if (!loggedIn) {
                navigation.navigate(screens.scenes.auth.screens.signin.name);
            }
        })
    }, [])

    useEffect(() => {
        transitionRef.current.animateNextTransition()
        setFullScreen(props.appState.fullScreen);
        if (props.appState.fullScreen)
            setMainDisplayHeight('100%');
        else
            setMainDisplayHeight('85%');
    }, [props.appState.fullScreen])


    const [param, setParam] = useState<any>();
    useEffect(() => {
        props.params && setParam(props.params)
    }, [props.params]);

    const menu = <AppBar
        transparent
        leading={props => (
            <IconButton
                icon={props => (<Entypo name={revealed ? "list" : "menu"} size={20} color={isDarkMode ? AppLight : AppLight} />)}
                onPress={() => setRevealed(prevState => !prevState)}
                {...props}
            />
        )}
    />
    const backBtn = <AppBar
        transparent
        leading={props => (
            <IconButton
                icon={props => (<MaterialIcons name={"keyboard-backspace"} size={25} color={isDarkMode ? AppLight : AppLight} />)}
                onPress={() => navigation.goBack()}
            />
        )}
    />
    return (
        <Backdrop
            style={{ backgroundColor: props.backgroundColor }}
            revealed={revealed}
            header={
                <Transitioning.View
                    transition={transition}
                    ref={transitionRef}
                    style={{ justifyContent: 'center', display: isFullScreen ? 'none' : 'flex', flexDirection: 'row' }}>

                    <HStack style={{ justifyContent: 'flex-start', width: '80%' }}>
                        <View>
                            {props.currentScreen === "Dashboard" ? menu : backBtn}
                        </View>
                    </HStack>

                    <HStack style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: '20%' }} spacing={0}>

                        <AppBar
                            title={props.currentScreen}
                            transparent
                            leading={smd => (
                                <IconButton
                                    icon={(<Ionicons name={"search"} size={20} color={isDarkMode ? AppLight : AppLight} />)}
                                />
                            )}
                        />
                        <AppBar
                            title={props.currentScreen}
                            transparent
                            leading={smd => (
                                <IconButton
                                    icon={(<Ionicons name={"notifications-outline"} size={20} color={isDarkMode ? AppLight : AppLight} />)}
                                />
                            )}
                        />
                        <AppBar
                            style={{ alignItems: 'flex-end' }}
                            title={props.currentScreen}
                            transparent
                            leading={smd => (
                                <IconButton
                                    onPress={logoutDialog}
                                    icon={(<FontAwesome5 name={"user-circle"} size={20} color={isDarkMode ? AppLight : AppLight} />)}
                                />
                            )}
                        />
                    </HStack>
                </Transitioning.View>
            }
            backLayer={
                <Transitioning.View
                    transition={transition}
                    style={{ display: isFullScreen ? 'none' : 'flex', height: 120, margin: 10, padding: 10, marginTop: 0 }}>
                    <ListComponent text={'JSS 1'} icon={<Feather name="file-plus" size={20} />} />
                    <ListComponent text={'JSS 2'} icon={<Feather name="file-plus" size={20} />} />
                    <ListComponent text={'JSS 3'} icon={<Feather name="file-plus" size={20} />} />
                    <ListComponent text={'JSS 4'} icon={<Feather name="file-plus" size={20} />} />
                </Transitioning.View>
            }
        >
            <Stack>
                <Transitioning.View
                    transition={transition}
                    // ref={transitionRef}
                    style={{ height: mainDisplayHeight, backgroundColor: props.backgroundColor, borderColor: 'lightgrey', borderBottomWidth: .5 }}>
                    {props.children}
                </Transitioning.View>

                <Transitioning.View
                    transition={transition}
                    // ref={transitionRef} 
                    style={{ display: isFullScreen ? 'none' : 'flex', height: '15%', backgroundColor: props.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                    <SessionClassProperties hide={false} params={props.params}
                        selectedClass={{ value: param?.sessionClassId, text: param?.sessionClass }} />
                </Transitioning.View>

            </Stack>

        </Backdrop >
    );
};


const mapStateToProps = (state: any) => {
    return { appState: state.appState }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch(AuhtService.SignOutUser()),
        displayFullScreen: (display: boolean) => dispatch(displayFullScreen(display))
    }
}

const style = StyleSheet.create({
    transitionDelaycss: {
        // // transitionProperty:'',
        // transitionDuration: '5s',
        // transitionDelay: '2s',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedTeacher);