import React, { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import {
    Backdrop,
    AppBar,
    IconButton,
    Stack,
    Pressable,
    HStack,
} from "@react-native-material/core";

import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppDark, AppLight } from "../../tools/color";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../screen-routes/navigation";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuhtService } from "../../services/AuthService";
import { connect } from "react-redux";
import CustomText from "../layouts/CustomText";
import SessionClassProperties from "../session-class/session-class-properties";
import { displayFullScreen } from "../../store/actions/app-state-actions";

const ProtectedTeacher = (props: any) => {
    const [revealed, setRevealed] = useState(false);
    const [isFullScreen, setFullScreen] = useState<false>(props.fullScreen);

    const isDarkMode = useColorScheme() === 'dark';

    const navigation = useNavigation();

    React.useEffect(() => {
        AuhtService.IsUserAuthenticated().then((loggedIn: Boolean) => {
            if (!loggedIn) {
                navigation.navigate(screens.scenes.auth.screens.signin.name);
            }
        })
    })


    const [param, setParam] = useState<any>();
    useEffect(() => {
        props.params && setParam(props.params)
    }, [props.params]);

    const menu = <AppBar
        transparent
        leading={props => (
            <IconButton
                icon={props => (<Entypo name={revealed ? "list" : "menu"} size={20} color={isDarkMode ? AppLight : AppDark} />)}
                onPress={() => setRevealed(prevState => !prevState)}
                {...props}
            />
        )}
    />
    const backBtn = <AppBar
        transparent
        leading={props => (
            <IconButton
                icon={props => (<MaterialIcons name={"keyboard-backspace"} size={25} color={isDarkMode ? AppLight : AppDark} />)}
                onPress={() => navigation.goBack()}
            />
        )}
    />
    return (
        <Backdrop
            style={{ backgroundColor: props.backgroundColor }}
            revealed={revealed}
            header={
                <HStack style={{ justifyContent: 'center', display: isFullScreen ? 'none' : 'flex' }}>

                    <HStack style={{ justifyContent: 'flex-start', width: '80%' }}>
                        <View>
                            {props.currentScreen === "Dashboard" ? menu : backBtn}
                        </View>
                    </HStack>

                    <HStack style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: '20%' }} spacing={0}>

                        <AppBar
                            title={props.currentScreen}
                            transparent
                            leading={props => (
                                <IconButton
                                    icon={(<Ionicons name={"search"} size={20} color={isDarkMode ? AppLight : AppDark} />)}
                                />
                            )}
                        />
                        <AppBar
                            title={props.currentScreen}
                            transparent
                            leading={props => (
                                <IconButton
                                    icon={(<Ionicons name={"notifications-outline"} size={20} color={isDarkMode ? AppLight : AppDark} />)}
                                />
                            )}
                        />
                        <AppBar
                            style={{ alignItems: 'flex-end' }}
                            title={props.currentScreen}
                            transparent
                            leading={props => (
                                <IconButton
                                    onPress={props.logout}
                                    icon={(<FontAwesome5 name={"user-circle"} size={20} color={isDarkMode ? AppLight : AppDark} />)}
                                />
                            )}
                        />
                    </HStack>
                </HStack>
            }
            backLayer={
                <View style={{ height: 120, margin: 10, padding: 10, marginTop: 0 }}>
                    <Pressable pressEffectColor="#2C3E50" >
                        <HStack spacing={15}>
                            <CustomText style={{ marginTop: 5 }} title={<FontAwesome5 name="users" size={20} />} />
                            <CustomText style={{ fontSize: 25 }} title="JSS 1" />
                        </HStack>
                    </Pressable>
                    <Pressable pressEffectColor="#2C3E50" >
                        <HStack spacing={15}>
                            <CustomText style={{ marginTop: 5 }} title={<FontAwesome5 name="users" size={20} />} />
                            <CustomText style={{ fontSize: 25 }} title="JSS 1" />
                        </HStack>
                    </Pressable>
                    <Pressable pressEffectColor="#2C3E50" >
                        <HStack spacing={15}>
                            <CustomText style={{ marginTop: 5 }} title={<FontAwesome5 name="users" size={20} />} />
                            <CustomText style={{ fontSize: 25 }} title="JSS 1" />
                        </HStack>
                    </Pressable>
                    <Pressable pressEffectColor="#2C3E50" >
                        <HStack spacing={15}>
                            <CustomText style={{ marginTop: 5 }} title={<FontAwesome5 name="users" color="white" size={20} />} />
                            <CustomText style={{ fontSize: 25 }} title="JSS 1" />
                        </HStack>
                    </Pressable>
                </View>
            }
        >
            <Stack>
                <View style={{ height: props.currentScreen === "Dashboard" ? '100%' : '85%', backgroundColor: props.backgroundColor, borderColor: 'lightgrey', borderBottomWidth: .5 }}>
                    {props.children}
                </View>

                <View style={{ display: props.currentScreen === "Dashboard" ? 'none' : 'flex', height: '15%', backgroundColor: props.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                    <SessionClassProperties hide={false} params={props.params}
                        selectedClass={{ value: param?.sessionClassId, text: param?.sessionClass }} />
                </View>

            </Stack>

        </Backdrop >
    );
};


const mapStateToProps = (state: any) => {
    return { state: state.appState }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => dispatch(AuhtService.SignOutUser()),
        displayFullScreen: (display: boolean) => dispatch(displayFullScreen(display))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedTeacher);