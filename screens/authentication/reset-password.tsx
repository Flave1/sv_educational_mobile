import React, { } from 'react';
import ProtectedTeacher from './protected-teacher';
import ForgotPassword from './forgot-password';

const ResetPassword = (props: any) => {
    return (
        <>
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Attendance" params={props.params}>
            <ForgotPassword />
            </ProtectedTeacher>
        </>
    )
}


export default ResetPassword;
