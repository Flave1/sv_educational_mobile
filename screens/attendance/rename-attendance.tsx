import { useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { displayFullScreen } from "../../store/actions/app-state-actions";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { HStack, Stack, Text } from "@react-native-material/core";
import CustomTextInput from "../layouts/CustomTextInput";
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from "../layouts/CustomButton";


function RenameAttendance(props: any) {
    const screenLocalColor = "#868C8E";
    useEffect(() => {
        props.displayFullScreen(true);
        console.log('props', props);

    }, [])

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
            name: "",
            sessionClass:props.sessionClass,
            // onboardedUser?.name || "",
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values: any) => {

        }
    });

    return (
        <>
            <Stack >
                {((touched.name && errors.name)) && <Text color='red'>{errors.name}</Text>}
            </Stack>
            <Stack spacing={10} style={{  height: '60%', justifyContent: 'center',padding:20 }}>
                <View style={{ width: '80%' }}>
                    <CustomTextInput
                        icon={<Feather name={'edit-3'} size={31} />}
                        placeholder='rename attendance'
                        autoCapitalize='none'
                        autoCompleteType='text'
                        keyboardType='text'
                        keyboardAppearance='dark'
                        returnKeyType='next'
                        returnKeyLabel='next'
                        onBlur={handleBlur('name')}
                        value={values.name}
                        error={errors.name}
                        touched={touched.name}
                        style={{ borderColor: 'gray', borderWidth: 1, color: 'black' }}
                        onChange={(e: any) => {
                            handleChange('name');
                            setFieldValue('name', e.nativeEvent.text)
                        }}
            />
                </View>
            </Stack>
            <HStack spacing={3} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <View>

                                <CustomButton
                                    backgroundColor={screenLocalColor}
                                    title="CLOSE" onPress={() => {
                                        props.navigation.goBack()
                                    }}
                                />
                            </View>
                            <View>
                                <CustomButton title="SUBMIT" onPress={handleSubmit} />
                            </View>
                        </HStack>
        </>
    )
}

function mapStateToProps(state: any) {
    return { fullScreen: state.appState.fullScreen ?? false }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        displayFullScreen: (display: boolean) => dispatch(displayFullScreen(display))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RenameAttendance);
// export default ReadClassnote;