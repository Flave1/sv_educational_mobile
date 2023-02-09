import { Pressable, Stack } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { AppDark, AppLight, TextLight } from "../../../tools/color";
import AntDesign from 'react-native-vector-icons/AntDesign'

const BottomUpView = ({ children, backgroundColor, show = false, setBottomUpComponent, upViewheight = 30, bottomViewheight = 70 }: any) => {
    const isDarkMode = useColorScheme() === 'dark';

    useEffect(() => {
        setBottomUpComponent(show)
    }, [show])

    return (
        <Stack style={[style.bottomUpView, { display: show ? 'flex' : 'none' }]}>

            <Pressable onPress={() => {
                setBottomUpComponent(false)
            }
            } style={[style.upView, { height: upViewheight + '%' }]}>

            </Pressable>
            <Stack style={[style.bottomView, { backgroundColor: backgroundColor, height: bottomViewheight + '%' }]}>

                <Stack style={[style.close, { borderColor: isDarkMode ? AppLight : AppDark }]}>
                    <Pressable
                        onPress={() => {
                            setBottomUpComponent(false)
                        }
                        }>
                        <AntDesign name="closecircleo" size={20} color={isDarkMode ? TextLight : AppDark} />
                    </Pressable>
                </Stack>

                <Stack style={style.children}> {children} </Stack>
            </Stack>
        </Stack>
    )
}

const style = StyleSheet.create({
    bottomUpView: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    upView: { width: '100%' },
    bottomView: {
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 10,
    },
    close: {
        margin: 7,
        height: '5%',
    },
    children: {
        height: '95%',
        width: '100%',
        padding: 20
    }
})
export default BottomUpView;
{/* <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle shouldReverse onShortPressRelease={() => alert('touched!!')} />
                <Draggable x={200} y={300} renderColor='red' renderText='B' />
            
import Draggable from 'react-native-draggable';
            */}