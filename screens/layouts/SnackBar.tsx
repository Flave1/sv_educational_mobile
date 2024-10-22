import React, { useEffect, useState } from "react";
import { Snackbar } from "@react-native-material/core";
import { IAppState } from "../../interfaces/app-state/state";
import { displayError, resetSuccessToastState } from "../../store/actions/app-state-actions";

const AppToast = ({ state, dispatch }: any) => {
    const { error, success, information }: IAppState = state?.appState;
    const [showErrorToast, setShowErrorToast] = useState(false);

    const [showSuccessToast, setShowSuccessToast] = useState(false);

    useEffect(() => {
        error && setShowErrorToast(true);
        setTimeout(() => {
            setShowErrorToast(false)
            displayError("")(dispatch)
        }, 5000)
    }, [error])

    useEffect(() => {
        success && setShowSuccessToast(true);
        setTimeout(() => {
            setShowSuccessToast(false)
            resetSuccessToastState()(dispatch)
        }, 5000)
    }, [success])

    return (
        <>
            {
                <Snackbar
                    message={error}
                    style={{ position: "absolute", start: 16, end: 16, bottom: 100, display: showErrorToast ? 'flex' : 'none', backgroundColor: '#FA9326' }}
                >
                </Snackbar>
            }
            {
                <Snackbar
                    message={success}
                    style={{ position: "absolute", start: 16, end: 16, bottom: 100, display: showSuccessToast ? 'flex' : 'none', backgroundColor: "#017C09" }}
                >
                    </Snackbar>
            }
            {/*   {
                 information && <Snackbar
                 message="This is a two-line message with an action button."
                 action={<Button variant="text" title="Dismiss" color="#BB86FC" compact onPress={() => {setShow(false)}} />}
                 style={{ position: "absolute", start: 16, end: 16, bottom: 16, display: show ? 'flex' : 'none' }}
             />
            } */}
        </>

    )
}

export default AppToast;