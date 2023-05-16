import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { offboard } from '../../store/actions/app-state-actions';
import { signIn } from '../../store/actions/auth-actions';
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
const SignIn = (props: any) => {
    // useEffect(() => {
    //     props.signin(null);
    // },[])

    const [clicked, setClicked] = useState(false)


    React.useEffect(() => {
        if (props.onboardedUser) {
            AuhtService.IsUserAuthenticated().then((loggedIn: Boolean) => {
                console.log('loggedIn', loggedIn);
                console.log('props.onboardedUser', props.onboardedUser);

                if (loggedIn)
                    props.navigation.navigate(screens.scenes.mainapp.scenes.tutor.screens.home.name);
            })
        } else {
            props.navigation.navigate(screens.scenes.onBoarding.screens.viewpagers.name)
        }
    }, [clicked])

    const validation = Yup.object().shape({
        userName: Yup.string()
            .min(2, 'Username Too Short!')
            .max(50, 'Username Too Long!')
            .required('Username is required to login'),
        password: Yup.string().required("Password Required")
            .min(4, 'Password must be a minimum of 4 characters'),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched }: any = useFormik({
        initialValues: {
            password: "",
            schoolUrl: props.onboardedUser?.baseUrlSuffix,
            userName: props.onboardedUser?.userName ? props.onboardedUser?.userName : "",
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            props.signin(values).then((resp: any) => {
                setClicked(!clicked)
            });
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
                    {((touched.password && errors.password)) && <Text color='red' >{errors.password}</Text>}
                    {((touched.userName && errors.userName)) && <Text color='red' >{errors.userName}</Text>}
                </Stack>
                <Stack spacing={10} style={{ padding: 20, height: '60%' }}>
                    <View style={{ width: '100%' }}>
                        <CustomTextInput
                            icon={<Feather name={'user-check'} size={16} />}
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
                            icon={<FontAwesome name={'key'} size={16} />}
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
                    <Stack style={{ marginHorizontal: 50, marginTop: 10, alignItems: 'center' }}>
                        <CustomButton
                            width={200}
                            title={'LOGIN'}
                            onPress={handleSubmit} />
                    </Stack>
                    <Stack center style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Pressable onPress={() => {
                            props.offboard().then((res: any) => {
                                props.navigation.navigate(screens.scenes.onBoarding.screens.viewpagers.name)
                            })
                        }}>
                            <CustomText style={{ fontWeight: 'bold' }} title="Off Board Account" />
                        </Pressable>
                        <Pressable onPress={() => {
                            props.navigation.navigate({
                                name: screens.scenes.auth.screens.forgotpassword.name,
                            })
                        }}  >
                            <CustomText style={{ fontWeight: 'bold' }} title="Forgot Password" />
                        </Pressable>
                    </Stack>
                </Stack>
            </Stack>
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        onboardedUser: state.appState.onboardedUser
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        offboard: () => offboard()(dispatch),
        signin: (values: any) => signIn(values)(dispatch)
    };
}

function get(onboardedUser: any) {
    try {
        return JSON.parse(onboardedUser)
    } catch (error) {
        return JSON.parse(JSON.stringify(onboardedUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
