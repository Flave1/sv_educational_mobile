import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { getAppState } from '../../store/actions/app-state-actions';
import { validateEmail } from '../../store/actions/auth-actions';
import { View } from 'react-native';
import { screens } from '../../screen-routes/navigation';
import Feather from 'react-native-vector-icons/Feather';
import { AppPurple } from '../../tools/color';
import CustomButton from '../layouts/CustomButton';
import CustomText from '../layouts/CustomText';
import CustomTextInput from '../layouts/CustomTextInput';
import { connect } from 'react-redux';
const ForgotPassword = (props: any) => {
    const [isProtected, setisProtected] = useState(false)

    const validation = Yup.object().shape({
        email: Yup.string().required("User Email is Required")
            .email("Must be a valid email"),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched }: any = useFormik({
        initialValues: {
            email: '',
            clientId: props.onboardedUser?.clientId,
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            props.forgotPassword(values, props.navigation, isProtected)
        }
    });

    return (
        <>
            <Stack style={{ backgroundColor: props.backgroundColor }}>
                <Stack style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, height: '40%' }}>
                    <View style={{ borderColor: AppPurple, borderWidth: 6, borderRadius: 100 }}>
                        <Avatar size={150} image={{
                            uri: props.onboardedUser?.schoolLogo ? props.onboardedUser?.schoolLogo : 'https://img.lovepik.com/free-png/20211213/lovepik-mens-business-avatar-icon-png-image_401551171_wh1200.png'

                        }} />
                    </View>
                </Stack>
                <Stack center>
                    {((touched.email && errors.email)) && <Text color='red' >{errors.email}</Text>}
                </Stack>
                <Stack spacing={10} style={{ padding: 20, height: '60%' }}>
                    <View style={{ width: '100%' }}>
                        <CustomTextInput
                            icon={<Feather name={'user-check'} size={16} />}
                            placeholder='Email'
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

                    <Stack style={{ marginHorizontal: 50, marginTop: 10, alignItems: 'center' }}>
                        <CustomButton
                            width={200}
                            title={'RESET'}
                            onPress={handleSubmit} />
                    </Stack>
                    <Stack center style={{ flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 10 }}>
                        <Pressable onPress={() => {
                            props.navigation.navigate({
                                name: screens.scenes.auth.screens.signin.name,
                            })
                        }}  >
                            <CustomText style={{ fontWeight: 'bold' }} title="Return to Sign In" />
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
        getState: () => getAppState()(dispatch),
        forgotPassword: (values: any, navigation: any, isProtected: boolean) => validateEmail(values, navigation, isProtected)(dispatch)
    };
}
function get(onboardedUser: any) {
    try {
        return JSON.parse(onboardedUser)
    } catch (error) {
        return JSON.parse(JSON.stringify(onboardedUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
