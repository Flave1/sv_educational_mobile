
import React from 'react'
import { View,Text } from 'react-native';
import ProtectedTeacher from './protected-teacher';
import ForgotPassword from './forgot-password';

const TeacherProfile = (props:any) => {
  return (
    <>
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Attendance" params={props.params}>
            <ForgotPassword />
            </ProtectedTeacher>
        </>
  )
}

export default TeacherProfile