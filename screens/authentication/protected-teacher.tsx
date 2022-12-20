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
import TeacherFooter from "../components/layouts/teacher-footer";
import CustomText from "../components/layouts/CustomText";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProtectedTeacher = ({ backgroundColor, children }: any) => {
    const [revealed, setRevealed] = useState(false);
    const [currentScreen, seCurrentScreen] = useState('Dasshboard');
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <Backdrop
            style={{ backgroundColor: backgroundColor }}
            revealed={revealed}
            header={
                <>
                    <HStack style={{ justifyContent: 'center' }}>

                        <HStack style={{ justifyContent: 'flex-start', width:'80%' }}>
                            <View>
                                <AppBar
                                    title={currentScreen}
                                    transparent
                                    leading={props => (
                                        <IconButton
                                            icon={props => (<Entypo name={revealed ? "list" : "menu"} {...props} />)}
                                            onPress={() => setRevealed(prevState => !prevState)}
                                            {...props}
                                        />
                                    )}
                                />
                            </View>
                        </HStack>

                        <HStack style={{ justifyContent: 'flex-end', alignItems:'flex-end', width:'20%' }} spacing={0}>

                            <AppBar
                                title={currentScreen}
                                transparent
                                leading={props => (
                                    <IconButton
                                        icon={(<Ionicons name={"search"} size={20} />)}
                                    />
                                )}
                            />
                            <AppBar
                                title={currentScreen}
                                transparent
                                leading={props => (
                                    <IconButton
                                        icon={(<Ionicons name={"notifications-outline"} size={20} />)}
                                    />
                                )}
                            />
                            <AppBar
                            style={{alignItems:'flex-end'}}
                                title={currentScreen}
                                transparent
                                leading={props => (
                                    <IconButton
                                        icon={(<FontAwesome5 name={"user-circle"} size={20} />)}
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
            <Stack >
                {/* <View style={{ height: '5%', backgroundColor: backgroundColor }}><BackdropSubheader title={<CustomText title={"Some Item here"} />} /></View> */}
                <View style={{ height: '85%', backgroundColor: backgroundColor }}>{children}</View>
                <View style={{ height: '15%', backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center', display: currentScreen === 'Dashboard' ? 'none' : 'flex' }}>
                    <TeacherFooter hide={false} />
                </View>
            </Stack>
        </Backdrop >
    );
};

export default ProtectedTeacher;