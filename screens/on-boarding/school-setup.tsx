import {
    Text,
    Stack,
    Avatar,
    Divider,
    HStack,
} from "@react-native-material/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Linking } from "react-native";
import { IAppState } from "../../interfaces/app-state/state";
import { School } from "../../models/on-boarding/all-schools";
import { getAllSchools, ValidateMobileUser } from "../../store/actions/app-state-actions";
import Section from "../components/layouts/Section";
import { useFormik } from "formik";
import { screens } from "../../screen-routes/navigation";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { TextDark } from "../../tools/color";
import CustomDropdownInput from "../components/layouts/CustomDropdownInput";
import CustomTextInput from "../components/layouts/CustomTextInput";
import Feather from "react-native-vector-icons/Feather";
import CustomButton from "../components/layouts/CustomButton";
import * as Yup from 'yup';




const SchoolSetup = ({ backgroundColor, dispatch, state, navigation }: any) => {
    const [selectedSchool, setSelectedSchool] = useState<School>(new School());
    const { allSchools, onboardedUser }: IAppState = state?.appState;


    // ref
    const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const snapPoints = useMemo(() => ["90%"], []);
    const [modalActionState, setModalActionState] = useState(false);
    const openOrCloseModal = (shouldOpenModal: boolean, item: any) => {
        setModalActionState(shouldOpenModal)
        if (shouldOpenModal && bottomSheetModalRef.current) {
            setSelectedSchool(item);
            bottomSheetModalRef.current.present();
        } else if (bottomSheetModalRef.current) {
            setSelectedSchool(new School());
            bottomSheetModalRef.current.close();
        }
    };

    useEffect(() => {
        getAllSchools()(dispatch);
    }, [dispatch]);

    useEffect(() => {
        onboardedUser && navigation.navigate(screens.scenes.auth.screens.signin.name);
    }, [onboardedUser])


    return (

        <BottomSheetModalProvider>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                <Stack>
                    <ScrollView
                        style={{
                            backgroundColor: backgroundColor
                        }}
                        contentInsetAdjustmentBehavior="automatic">
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            {
                                allSchools.map((school: School, idx) => {
                                    return (
                                        <Section school={school} setSelectedSchool={setSelectedSchool} key={idx} onPress={() => openOrCloseModal(!modalActionState, school)}>
                                            <>{school}</>
                                        </Section>
                                    )
                                })
                            }

                        </View>
                    </ScrollView>
                </Stack>
            </SafeAreaView>
            <BottomSheetModal
                enableOverDrag={true}
                enableContentPanningGesture={true}
                enableDismissOnClose={true}
                enableHandlePanningGesture={true}
                enablePanDownToClose={true}
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                style={{ backgroundColor: "#868C8E" }}>
                <View>
                    <UserValidationForm selectedSchool={selectedSchool} dispatch={dispatch} backgroundColor={backgroundColor} />
                </View>
            </BottomSheetModal>
        </BottomSheetModalProvider>
    )
}

export default SchoolSetup;


const UserValidationForm = ({ selectedSchool, dispatch }: any) => {
    const [usernameOrRegNumberLabel, setUsernameOrRegNumberPlaceHolder] = useState<String>('Student Reg Number OR Email');
    const userTypes = ["STUDENT", "TEACHER", "PARENT"];

    const validation = Yup.object().shape({
        usernameOrRegNumber: Yup.string()
            .required('Username is required to login'),
        userType: Yup.number().required("User Type is Required")
    });

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur, errors, touched } = useFormik({
        initialValues: {
            clientId: selectedSchool.clientId,
            usernameOrRegNumber: "",
            userType: 0,
            schoolUrl: selectedSchool.schoolUrl
        },
        validationSchema: validation,
        enableReinitialize: true,
        onSubmit(values): void {
            ValidateMobileUser(values)(dispatch)

        },
    });

    const screenLocalColor = "#868C8E";

    return (
        <ScrollView>
            <Stack style={{ padding: 30 }}>
                <Stack style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Avatar image={{ uri: !selectedSchool.schoolLogo ? "https://www.kaleo-asbl.be/content/uploads/2017/05/Profil-site.jpg" : selectedSchool.schoolLogo }} size={150} />
                </Stack>

                <HStack style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                    <Text style={{ textTransform: 'uppercase', color: TextDark, fontWeight: 'bold' }} >{selectedSchool.schoolName}</Text>
                </HStack>
                <Stack spacing={3}>
                    <HStack style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textTransform: 'uppercase', color: screenLocalColor }} >{selectedSchool.address}</Text>
                    </HStack>
                    <HStack style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text onPress={() => Linking.openURL(selectedSchool.schoolUrl)} style={{ color: 'blue' }} >{selectedSchool.schoolUrl}</Text>
                    </HStack>
                    <Divider style={{ marginBottom: 4, marginTop: 10 }} leadingInset={16} trailingInset={32} />
                    <Divider style={{ marginBottom: 4, marginTop: 10, opacity: -4 }} leadingInset={16} trailingInset={32} />
                    <Stack center>
                        {((touched.userType && errors.userType)) && <Text color='red' >{errors.userType}</Text>}
                        {((touched.usernameOrRegNumber && errors.usernameOrRegNumber)) && <Text color='red' >{errors.usernameOrRegNumber}</Text>}
                    </Stack>
                    <View style={{ width: '100%' }}>
                        <Text  color={screenLocalColor}>Select user type here</Text>
                        <Divider style={{ marginBottom: 4, marginTop: 10, opacity: -4 }} leadingInset={16} trailingInset={32} />
                        <CustomDropdownInput data={userTypes}
                            searchPlaceHolder="Search"
                            defaultButtonText="Select User Type"
                            backgroundColor={screenLocalColor}
                            buttonTextAfterSelection={(selectedItem: string, index: any) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item: string, index: any) => {
                                return item
                            }}
                            onSelect={(selectedItem: string, index: number) => {
                                handleChange;
                                setFieldValue('userType', index)
                                if (index === 0) {
                                    setUsernameOrRegNumberPlaceHolder('Student Reg Number OR Email')
                                } if (index === 2) {
                                    setUsernameOrRegNumberPlaceHolder('Parent Registered Email')
                                } else {
                                    setUsernameOrRegNumberPlaceHolder('Teacher Registered Email')
                                }
                            }}
                        />
                    </View>

                    <Divider style={{ marginBottom: 4, marginTop: 20, opacity:-4 }} leadingInset={16} trailingInset={32} />

                    <Stack style={{ width: '100%' }}>
                        <Text color={screenLocalColor} >{usernameOrRegNumberLabel}</Text>
                        <Divider style={{ marginBottom: 4, marginTop: 10, opacity: -4 }} leadingInset={16} trailingInset={32} />
                        <CustomTextInput
                            icon={<Feather name={'user-check'} size={16} color={screenLocalColor} />}
                            placeholder={'Type here...'}
                            autoCapitalize='none'
                            borderColor={screenLocalColor}
                            textColor={screenLocalColor}
                            autoCompleteType='text'
                            keyboardType='text'
                            keyboardAppearance='dark'
                            value={values.usernameOrRegNumber}
                            error={errors.usernameOrRegNumber}
                            touched={touched.usernameOrRegNumber}
                            onChange={(e: any) => {
                                handleChange('usernameOrRegNumber');
                                setFieldValue('usernameOrRegNumber', e.nativeEvent.text)
                            }}
                        />
                    </Stack>


                </Stack>
                {/* <HStack spacing={3} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}></HStack> */}
                <HStack spacing={3} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>

                    <CustomButton
                        title="Submit"
                        compact
                        backgroundColor={screenLocalColor}
                        onPress={() => {
                            handleSubmit()
                        }}
                    />
                </HStack>
            </Stack>
        </ScrollView>
    )
}

// export default SchoolSetupProvider;