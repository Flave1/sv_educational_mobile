import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { IAppState } from '../../interfaces/app-state/state';
import * as Yup from 'yup';
import CustomTextInput from '../components/layouts/CustomTextInput';
import CustomButton from '../components/layouts/CustomButton';
import CustomText from '../components/layouts/CustomText';
import { getAllSchools, OffboardUser } from '../../store/actions/app-state-actions';
import { IAuthState } from '../../interfaces/auth/IAuth';
import { SignInUser } from '../../store/actions/auth-actions';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { navigationRoutes } from '../../screen-routes/navigation';
import { OnboardedUser } from '../../models/on-boarding/onboarded-user';
const SignIn = ({ dispatch, state, backgroundColor }: any) => {

    const { authResult }: IAuthState = state?.authState;
    const { onboardedUser }: IAppState = state?.appState;
    const navigation = useNavigation();
    const [persistedUser, setPersistedUser] = useState(new OnboardedUser())

    React.useEffect(() => {
        getAllSchools()(dispatch)
    }, [])


    React.useEffect(() => {
        !onboardedUser && navigation.navigate(navigationRoutes.scenes.onBoarding.name);
        authResult && navigation.navigate(navigationRoutes.scenes.mainapp.scenes.tutor.screens.home.name);
        if(onboardedUser){
            
            onboardedUser.length > 0 && setPersistedUser(JSON.parse(onboardedUser))
        }
    }, [onboardedUser, authResult])

    const validation = Yup.object().shape({
        userName: Yup.string()
            .min(2, 'Username Too Short!')
            .max(50, 'Username Too Long!')
            .required('Username is required to login'),
        password: Yup.string().required("Password Required")
            .min(4, 'Password must be a minimum of 4 characters'),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched } = useFormik({
        initialValues: {
            userName: persistedUser.userName || "",
            password: ""
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            SignInUser(values, persistedUser.baseUrlSuffix)(dispatch)
        }
    });

    return (
        <>
            <Stack style={{ backgroundColor: backgroundColor }}>
                <Stack style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, height: '40%' }}>
                    <Avatar size={150} image={{ uri: persistedUser.schoolLogo ? persistedUser.schoolLogo : 'https://img.lovepik.com/free-png/20211213/lovepik-mens-business-avatar-icon-png-image_401551171_wh1200.png' }}/>
                </Stack>
                <Stack center>
                    {((touched.userName && errors.userName)) && <Text color='red' >{errors.userName}</Text>}
                    {((touched.password && errors.password)) && <Text color='red' >{errors.password}</Text>}
                </Stack>
                <Stack spacing={10} style={{ padding: 20, height: '60%' }}>
                    <View style={{ width: '100%' }}>
                        <CustomTextInput
                            icon='user'
                            placeholder='Email / Registration Number'
                            autoCapitalize='none'
                            autoCompleteType='email'
                            keyboardType='email-address'
                            keyboardAppearance='dark'
                            returnKeyType='next'
                            returnKeyLabel='next'
                            onBlur={handleBlur('userName')}
                            value={values.userName}
                            error={errors.userName}
                            touched={touched.userName}
                            onChange={(e: any) => {
                                handleChange('userName');
                                setFieldValue('userName', e.nativeEvent.text)
                            }}
                        />
                    </View>

                    <View style={{ marginBottom: 16, width: '100%' }}>
                        <CustomTextInput
                            icon='key'
                            placeholder='Enter your password'
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
                    <Stack style={{ marginHorizontal: 50, marginTop: 10 }}>
                        <CustomButton onPress={handleSubmit} />
                    </Stack>
                    <Stack center style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Pressable onPress={() => {
                            OffboardUser()(dispatch);
                            navigation.navigate(navigationRoutes.scenes.onBoarding.name.toString())
                        }}>

                            <CustomText style={{ fontWeight: 'bold' }} title="Off Board Account" />
                        </Pressable>
                        <Pressable>

                            <CustomText style={{ fontWeight: 'bold' }} title="Forgot Password" />
                        </Pressable>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

export default SignIn;