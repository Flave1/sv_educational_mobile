import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useFormik } from 'formik';
import React, { } from 'react';
import * as Yup from 'yup';
import { offboard } from '../../store/actions/app-state-actions';
import { forgotPassword, forgotPasswordOTP, signIn } from '../../store/actions/auth-actions';
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
const ForgotPasswordOtp = (props: any) => {
 
    const validation = Yup.object().shape({
        otp: Yup.number().required("OTP is required")
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched }: any = useFormik({
        initialValues: {
            otp: '',
            clientId:props.onboardedUser?.clientId,
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            props.forgotPasswordOTP(values,props.navigation)
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
                    {((touched.otp && errors.otp)) && <Text color='red' >{errors.otp}</Text>}
                </Stack>
                <Stack spacing={10} style={{ padding: 20, height: '60%' }}>
                    <View style={{ width: '100%' }}>
                        <CustomTextInput
                            icon={<Feather name={'user-check'} size={16} />}
                            placeholder='Enter OTP'
                            autoCapitalize='none'
                            autoCompleteType='number'
                            keyboardType='number'
                            keyboardAppearance='dark'
                            returnKeyType='next'
                            returnKeyLabel='next'
                            onBlur={handleBlur('otp')}
                            value={values.otp}
                            error={errors.otp}
                            touched={touched.otp}
                            onChange={(e: any) => {
                                handleChange('otp');
                                setFieldValue('otp', e.nativeEvent.text)
                            }}
                        />
                    </View>

                    <Stack style={{ marginHorizontal: 50, marginTop: 10, alignItems: 'center' }}>
                        <CustomButton
                            width={200}
                            title={'Send'}
                            onPress={handleSubmit} />
                    </Stack>
                    <Stack center style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10 }}>
                        <Pressable onPress={() => {
                            props.navigation.navigate({
                                name: screens.scenes.auth.screens.forgotpassword.name,
                            })
                        }}  >
                            <CustomText style={{ fontWeight: 'bold' }} title="return to forgot password" />
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
        forgotPasswordOTP: (values: any,navigation:any) => forgotPasswordOTP(values,navigation)(dispatch)
    };
}

function get(onboardedUser: any) {
    try {
        return JSON.parse(onboardedUser)
    } catch (error) {
        return JSON.parse(JSON.stringify(onboardedUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordOtp);
