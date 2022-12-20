import {
    Provider,
    Button,
    Dialog,
    DialogHeader,
    DialogContent,
    DialogActions,
    Text,
    Stack,
    TextInput,
    Avatar,
    Divider,

} from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, } from "react-native";
import { IAppState } from "../../interfaces/app-state/state";
import { School } from "../../models/on-boarding/all-schools";
import { getAllSchools, ValidateMobileUser } from "../../store/actions/app-state-actions";
import Section from "../components/layouts/Section";
import SelectDropdown from 'react-native-select-dropdown'
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { navigationRoutes } from "../../screen-routes/navigation";




const SchoolSetup = ({ backgroundColor, dispatch, state }: any) => {
    const [showModal, setShowmodal] = useState(false);
    const [selectedSchool, setSelectedSchool] = useState(new School());
    const { allSchools, doneWithOnBoarding, onboardedUser }: IAppState = state?.appState;
    const navigation = useNavigation();

    useEffect(() => {
        getAllSchools()(dispatch);
    }, []);

    useEffect(() => {
        onboardedUser && navigation.navigate(navigationRoutes.scenes.auth.screens.signin.name.toString());
    }, [onboardedUser])
    

    return (
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
                                    <Section school={school} setSelectedSchool={setSelectedSchool} key={idx} setShowmodal={setShowmodal} >
                                        <>{school}</>
                                    </Section>
                                )
                            })
                        }

                    </View>
                </ScrollView>


            </Stack>
            <UserValidationForm showModal={showModal} setShowmodal={setShowmodal} selectedSchool={selectedSchool} dispatch={dispatch} />
        </SafeAreaView>
    )
}

// export default SchoolSetup;

const SchoolSetupProvider = ({ backgroundColor, dispatch, state }: any) => (
    <Provider>
        <SchoolSetup backgroundColor={backgroundColor} dispatch={dispatch} state={state} />
    </Provider>
);

const UserValidationForm = ({ showModal, setShowmodal, selectedSchool, dispatch }: any) => {
    const [payload, setPayload] = useState();
    const [usernameOrRegNumberLabel, setUsernameOrRegNumberPlaceHolder] = useState('Reg Number OR Email');
    const userTypes = ["STUDENT", "TEACHER", "PARENT"];

    const { handleChange, handleSubmit, values, setFieldValue, handleBlur } = useFormik({
        initialValues: {
            clientId: selectedSchool.clientId,
            usernameOrRegNumber: "",
            userType: 0
        },
        enableReinitialize: true,
        onSubmit(values): void {
            ValidateMobileUser(values)(dispatch)
        },
    });


    return (
        <Dialog
            visible={showModal}
            onDismiss={() => setShowmodal(false)}
        >

            <Stack style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Avatar image={{ uri: selectedSchool.schoolLogo }} size={150} />
            </Stack>

            <DialogHeader title={selectedSchool.schoolName} />
            <DialogContent>
                <Stack spacing={3}>
                    <Text >{selectedSchool.address}</Text>
                    <Divider style={{ marginBottom: 4, marginTop: 10 }} leadingInset={16} trailingInset={32} />

                    <SelectDropdown
                        defaultValueByIndex={values.userType}
                        searchPlaceHolder="Are you a student"
                        defaultButtonText="Select User Type"
                        search={true}
                        data={userTypes}
                        onSelect={(selectedItem, index) => {
                            handleChange;
                            setFieldValue('userType', index)
                            if (index === 0) {
                                setUsernameOrRegNumberPlaceHolder('Reg Number OR Email')
                            } else {
                                setUsernameOrRegNumberPlaceHolder('Registered Email')
                            }
                            setPayload(payload);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                    <Divider style={{ marginBottom: 4, marginTop: 20 }} leadingInset={16} trailingInset={32} />
                    <TextInput
                        label={usernameOrRegNumberLabel}
                        value={values.usernameOrRegNumber}
                        onBlur={handleBlur('usernameOrRegNumber')}
                        variant="standard"
                        onChange={(e: any) => {
                            handleChange;
                            setFieldValue('usernameOrRegNumber', e.nativeEvent.text)
                        }} />

                </Stack>
            </DialogContent>
            <DialogActions>
                <Stack spacing={3} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                    <Button
                        title="Cancel"
                        variant="text"
                        compact
                        onPress={() => setShowmodal(false)}
                    />
                    <Button
                        title="Submit"
                        compact
                        onPress={() => {
                            handleSubmit()
                        }}
                    />
                </Stack>
            </DialogActions>

        </Dialog>
    )
}

export default SchoolSetupProvider;