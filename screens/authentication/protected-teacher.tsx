import React, { useState } from "react";
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
import SessionClassProperties from "../components/session-class/session-class-properties";
import CustomText from "../components/layouts/CustomText";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppDark, AppLight, TextDark, TextLight } from "../../tools/color";
import FlexendSpinner from "../components/layouts/spinner/flex-end-spinner";
import { SignOutUser } from "../../store/actions/auth-actions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { screens } from "../../screen-routes/navigation";

const ProtectedTeacher = ({ backgroundColor, persistedUser, children }: any) => {
    const [revealed, setRevealed] = useState(false);
    const [currentScreen, seCurrentScreen] = useState('Dashboard');

    const isDarkMode = useColorScheme() === 'dark';

    const dispatch = useDispatch();
    const state = useSelector((state: any) => state);
    const navigation = useNavigation();

    AsyncStorage.getItem('token').then(res => {
        !res && navigation.navigate(screens.scenes.auth.screens.signin)
    });


    const logOutAccount = () => {
        SignOutUser()(dispatch)
    }
    return (
        <Backdrop
            style={{ backgroundColor: backgroundColor }}
            revealed={revealed}
            header={
                <>
                    <HStack style={{ justifyContent: 'center' }}>

                        <HStack style={{ justifyContent: 'flex-start', width: '80%' }}>
                            <View>
                                <AppBar
                                    // title={currentScreen}
                                    transparent
                                    leading={props => (
                                        <IconButton
                                            icon={props => (<Entypo name={revealed ? "list" : "menu"} size={20} color={isDarkMode ? AppLight : AppDark} />)}
                                            onPress={() => setRevealed(prevState => !prevState)}
                                            {...props}
                                        />
                                    )}
                                />
                            </View>
                        </HStack>

                        <HStack style={{ justifyContent: 'flex-end', alignItems: 'flex-end', width: '20%' }} spacing={0}>

                            <AppBar
                                title={currentScreen}
                                transparent
                                leading={props => (
                                    <IconButton
                                        icon={(<Ionicons name={"search"} size={20} color={isDarkMode ? AppLight : AppDark} />)}
                                    />
                                )}
                            />
                            <AppBar
                                title={currentScreen}
                                transparent
                                leading={props => (
                                    <IconButton
                                        icon={(<Ionicons name={"notifications-outline"} size={20} color={isDarkMode ? AppLight : AppDark} />)}
                                    />
                                )}
                            />
                            <AppBar
                                style={{ alignItems: 'flex-end' }}
                                title={currentScreen}
                                transparent
                                leading={props => (
                                    <IconButton
                                        onPress={logOutAccount}
                                        icon={(<FontAwesome5 name={"user-circle"} size={20} color={isDarkMode ? AppLight : AppDark} />)}
                                    />
                                )}
                            />
                        </HStack>
                    </HStack>
                </>
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
                {/* <View style={{ height: '5%', backgroundColor: backgroundColor }}><BackdropSubheader title={<CustomText title={"Some Item here"} />} /></View> */}
                <View style={{ height: '85%', backgroundColor: backgroundColor, borderColor: 'lightgrey', borderBottomWidth: .5 }}>{children}</View>
                <View style={{ height: '15%', backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                    <SessionClassProperties hide={false} />
                </View>

            </Stack>

        </Backdrop >
    );
};

export default ProtectedTeacher;