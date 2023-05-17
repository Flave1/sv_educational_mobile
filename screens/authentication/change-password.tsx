import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useFormik } from 'formik';
import React, { } from 'react';
import * as Yup from 'yup';
import { offboard } from '../../store/actions/app-state-actions';
import { changePassword, signIn } from '../../store/actions/auth-actions';
import { View } from 'react-native';
import { screens } from '../../screen-routes/navigation';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppPurple } from '../../tools/color';
import { AuhtService } from '../../services/AuthService';
import CustomButton from '../layouts/CustomButton';
import CustomText from '../layouts/CustomText';
import CustomTextInput from '../layouts/CustomTextInput';
import { connect } from 'react-redux';
const ChangePassword = (props: any) => {

    const validation = Yup.object().shape({
        email: Yup.string()
        .required("Email is Required")
        .email("Must be a valid email"),
        password: Yup.string()
        .required("Password is Required")
        .min(4, "Password must be a minimum of 4 characters"),
        confirmNewPassword: Yup.string()
        .required("Confirm Password Required")
        .min(4, "Password must be a minimum of 4 characters")
        .when("password", {
          is: (val:any) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref("password")],
            "Confirm password need to be the same with new password"
          ), 
        })
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched }: any = useFormik({
        initialValues: {
            confirmNewPassword:"",
            password: "",
            email:"",
            clientId:props.onboardedUser?.clientId,
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            props.changePassword(values,props.navigation)
        }
    });

    return (
        <>
            <Stack style={{ backgroundColor: props.backgroundColor }}>
                <Stack style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, height: '40%' }}>
                    <View style={{ borderColor: AppPurple, borderWidth: 6, borderRadius: 100 }}>
                        <Avatar size={150} image={{
                            uri: props.onboardedUser?.schoolLogo ? props?.onboardedUser?.schoolLogo
                                : 'https://img.lovepik.com/free-png/20211213/lovepik-mens-business-avatar-icon-png-image_401551171_wh1200.png'
                        }} />
                    </View>
                </Stack>
                <Stack center>
                {((touched.email && errors.email)) && <Text color='red' >{errors.email}</Text>}
                {((touched.password && errors.password)) && <Text color='red' >{errors.password}</Text>}
                {((touched.confirmNewPassword && errors.confirmNewPassword)) && <Text color='red' >{errors.confirmNewPassword}</Text>}
                </Stack>
                <Stack spacing={10} style={{ padding: 20, height: '60%' }}>
                    <View style={{ width: '100%' }}>
                        <CustomTextInput
                            icon={<Feather name={'user-check'} size={16} />}
                            placeholder='Enter Email'
                            autoCapitalize='none'
                            autoCompleteType='email'
                            keyboardType='email-address'
                            keyboardAppearance='dark'
                            returnKeyType='next'
                            returnKeyLabel='next'
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                            onChange={(e: any) => {
                                handleChange('email');
                                setFieldValue('email', e.nativeEvent.text)
                            }}
                        />
                    </View>

                    <View style={{ marginBottom: 16, width: '100%' }}>
                        <CustomTextInput
                            icon={<FontAwesome name={'key'} size={16} />}
                            placeholder='Enter your New Password'
                            secureTextEntry
                            autoCompleteType='password'
                            autoCapitalize='none'
                            keyboardAppearance='dark'
                            returnKeyType='go'
                            returnKeyLabel='go'
                            onBlur={handleBlur('password')}
                            error={errors.password}
                            touched={touched.password}
                            onChange={(e: any) => {
                                handleChange('password');
                                setFieldValue('password', e.nativeEvent.text)
                            }}
                        />
                    </View>
                    <View style={{ marginBottom: 16, width: '100%' }}>
                        <CustomTextInput
                            icon={<FontAwesome name={'key'} size={16} />}
                            placeholder='Confirm your new password'
                            secureTextEntry
                            autoCompleteType='confirmNewPassword'
                            autoCapitalize='none'
                            keyboardAppearance='dark'
                            returnKeyType='go'
                            returnKeyLabel='go'
                            onBlur={handleBlur('confirmNewPassword')}
                            error={errors.confirmNewPassword}
                            touched={touched.confirmNewPassword}
                            onChange={(e: any) => {
                                handleChange('confirmNewPassword');
                                setFieldValue('confirmNewPassword', e.nativeEvent.text)
                            }}
                        />
                    </View>
                    <Stack style={{ marginHorizontal: 50, marginTop: 10, alignItems: 'center' }}>
                        <CustomButton
                            width={200}
                            title={'LOGIN'}
                            onPress={handleSubmit} />
                    </Stack>
                    <Stack center style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10 }}>
                        <Pressable onPress={() => {
                            props.navigation.navigate({
                                name: screens.scenes.auth.screens.forgotpasswordotp.name,
                            })
                        }}  >
                            <CustomText style={{ fontWeight: 'bold' }} title="return" />
                        </Pressable>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        onboardedUser: get(state.appState.onboardedUser)
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        changePassword: (values: any,navigation:any) => changePassword(values,navigation)(dispatch)
    };
}

function get(onboardedUser: any) {
    try {
        return JSON.parse(onboardedUser)
    } catch (error) {
        return JSON.parse(JSON.stringify(onboardedUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
