import { Stack } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, useColorScheme } from "react-native";
import { IAppState } from "../../../../interfaces/app-state/state";

const FlexendSpinner = ({ state, dispatch }: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    const [show, setShow] = useState<boolean>(false)
    const { loading } = state?.appState;
    useEffect(() => {
        setShow(loading)
    }, [loading]);

    return (
        <Stack style={[style.container, { display: show ? 'flex' : 'none' }]}>
            <ActivityIndicator size="large" color="#00ff00" />
        </Stack>
    )
}

const style = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
})
export default FlexendSpinner;