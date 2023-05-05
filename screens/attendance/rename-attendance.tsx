import { useEffect,useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { displayFullScreen } from "../../store/actions/app-state-actions";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { HStack, Stack, Text } from "@react-native-material/core";
import CustomTextInput from "../layouts/CustomTextInput";
import Feather from 'react-native-vector-icons/Feather';
import CustomButton from "../layouts/CustomButton";
import { ClassRegister } from "../../models/class-properties/attendance";
import { AttendanceService } from "../../services/attendance-service";
import { renameRegister } from "../../store/actions/attendance-actions";


function RenameRegister(props: any) {
    const screenLocalColor = "#868C8E";

    const [attendance, setAttendance] = useState<ClassRegister>(new ClassRegister());
    
    useEffect(() => {
        AttendanceService.getRegister(props.classRegisterId, props.registers).then(result => {
            setAttendance(result);
        });
    });

    const validation = Yup.object().shape({
        classRegisterLabel: Yup.string()
            .min(2, 'name Too Short!')
            .required('name is required'),
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched } = useFormik({
        initialValues: {
            classRegisterLabel: attendance.classRegisterLabel||"",
            sessionClass:props.sessionClass,
            classRegisterId:attendance.classRegisterId,
        },
        enableReinitialize: true,
        validationSchema: validation,
        onSubmit: (values: any) => {
            props.renameRegister(values, props.openOrCloseRenameAttendanceModal)
        }
    });

    return (
        <>
            <Stack center>
                {((touched.classRegisterLabel && errors.classRegisterLabel)) && <Text color='red'>{errors.classRegisterLabel}</Text>}
            </Stack>
            <Stack spacing={10} style={{  height: '60%', justifyContent: 'center',padding:20 }}>
                <View style={{ width: '80%' }}>
                    <CustomTextInput
                        icon={<Feather name={'edit-3'} size={31} />}
                        //placeholder='rename attendance'
                        autoCapitalize='none'
                        autoCompleteType='text'
                        keyboardType='text'
                        keyboardAppearance='dark'
                        returnKeyType='next'
                        returnKeyLabel='next'
                        onBlur={handleBlur('classRegisterLabel')}
                        value={values.classRegisterLabel}
                        error={errors.classRegisterLabel}
                        touched={touched.classRegisterLabel}
                        style={{ borderColor: 'black', borderWidth: 1, color: 'black' }}
                        onChange={(e: any) => {
                            handleChange('classRegisterLabel');
                            setFieldValue('classRegisterLabel', e.nativeEvent.text)
                        }}
            />
                </View>
            </Stack>
            <HStack spacing={3} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                            <View>

                                <CustomButton
                                    backgroundColor={screenLocalColor}
                                    title="CLOSE" onPress={() => {
                                      props.openOrCloseRenameAttendanceModal(false)  
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
    return { registers: state.attendanceState.registers}
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        displayFullScreen: (display: boolean) => dispatch(displayFullScreen(display)),
       renameRegister:(values:any, openOrCloseRenameAttendanceModal:any) => renameRegister(values,openOrCloseRenameAttendanceModal)(dispatch)

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RenameRegister);
