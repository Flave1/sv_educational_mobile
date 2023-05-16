import { Avatar, Pressable, Stack, Text } from '@react-native-material/core';
import { useFormik } from 'formik';
import React, { } from 'react';
import * as Yup from 'yup';
import { offboard } from '../../store/actions/app-state-actions';
import { forgotPassword, signIn } from '../../store/actions/auth-actions';
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
const ForgotPassword = (props: any) => {
 console.log("oneboard",props.onboardedUser.schoolLogo);
 
    const validation = Yup.object().shape({
        email: Yup.string().required("User Email is Required")
        .email("Must be a valid email"),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched }: any = useFormik({
        initialValues: {
            email: '',
            clientId:'',
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values) => {
            props.forgotPassword(values,props.navigation)
        }
    });

    return (
        <>
            <Stack style={{ backgroundColor: props.backgroundColor }}>
                <Stack style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 30, height: '40%' }}>
                    <View style={{ borderColor: AppPurple, borderWidth: 6, borderRadius: 100 }}>
                        <Avatar size={150} image={{
                            uri: props.onboardedUser?.schoolLogo 
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
        onboardedUser: state.appState.onboardedUser
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        forgotPassword: (values: any,navigation:any) => forgotPassword(values,navigation)(dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
