import {
    Text,
    Stack,
    Avatar,
    Divider,
    HStack,
} from "@react-native-material/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Linking, StyleSheet, Dimensions } from "react-native";
import { School } from "../../models/on-boarding/all-schools";
import { getAllSchools, ValidateMobileUser } from "../../store/actions/app-state-actions";
import { useFormik } from "formik";
import { screens } from "../../screen-routes/navigation";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { AppButtonColorDark, AppDark, AppLightBlue } from "../../tools/color";
import * as Yup from 'yup';
import Feather from "react-native-vector-icons/Feather";
import CustomButton from "../layouts/CustomButton";
import CustomDropdownInput from "../layouts/CustomDropdownInput";
import CustomTextInput from "../layouts/CustomTextInput";
import Section from "../layouts/Section";
import { connect } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BottomUpComponent from "../layouts/bottom-up-component";
import { Search } from "../../Utils/generate";
import CustomSearchInput from "../layouts/CustomSearchInput";
import { useNavigation } from "@react-navigation/native";

const SchoolSetup = (props: any) => {
    const [selectedSchool, setSelectedSchool] = useState<School>(new School());
    const [allSchools, setAllschools] = useState<Array<School>>(new Array<School>());
    const [searchQuery, setSearchQuery] = useState('');
    const [filtered, setFilteredSubjects] = useState<School[]>([]);
    const navigation = useNavigation();
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
        props.getSchools().then((res: any) => {
            setAllschools([...res]);
        }).catch((log: any) => console.log('log', log))
    }, []);

    useEffect(() => {
        allSchools && setFilteredSubjects(allSchools);
    }, [allSchools]);

    useEffect(() => {
        props.appState.doneWithOnBoarding && props.navigation.navigate(screens.scenes.auth.screens.signin.name);
    }, [props.appState])

    console.log('props.appState', props.appState);


    const handleSearch = (text: any) => {
        // Search({ allSchools, text, columns: ["schoolName", "address"] })
        //     .then((res: any) => {
        //         setFilteredSubjects(res);
        //     }).catch((err: any) => {
        //         console.log(err);
        //     })
    };
    return (

        <BottomSheetModalProvider>
            <SafeAreaView
                style={{ flex: 1, backgroundColor: props.backgroundColor, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.searchContainer}>
                    <CustomSearchInput
                        icon={<MaterialIcons name={'search'} size={16} />}
                        placeholder='Search .....'
                        autoCapitalize='none'
                        autoCompleteType='text'
                        keyboardType='text'
                        keyboardAppearance='dark'
                        onChangeText={handleSearch}
                        setSearchQuery={setSearchQuery}
                        value={searchQuery}
                    />
                </View>
                <Stack>

                    <ScrollView
                        style={{
                            backgroundColor: props.backgroundColor
                        }}
                        contentInsetAdjustmentBehavior="automatic">
                        <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10 }}>
                            {
                                filtered.length > 0 && filtered.map((school: School, idx) => {
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
            <BottomUpComponent bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} openOrCloseModal={openOrCloseModal}>
                <UserValidationForm selectedSchool={selectedSchool} dispatch={props.dispatch} backgroundColor={props.backgroundColor} openOrCloseModal={openOrCloseModal} />
            </BottomUpComponent>
        </BottomSheetModalProvider>
    )
}

function mapStateToProps(state: any) {
    return {
        appState: state.appState
    }
}


function mapDispatchToProps(dispatch: any) {
    return {
        getSchools: async () => (await getAllSchools())(dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SchoolSetup);


const UserValidationForm = ({ selectedSchool, dispatch, openOrCloseModal }: any) => {
    const [usernameOrRegNumberLabel, setUsernameOrRegNumberPlaceHolder] = useState<String>('Registered Email');
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
            userType: 1,
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
            <Stack style={{ padding: 20 }}>
                <Stack style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <Avatar image={{ uri: !selectedSchool.schoolLogo ? "https://www.kaleo-asbl.be/content/uploads/2017/05/Profil-site.jpg" : selectedSchool.schoolLogo }} size={150} />
                </Stack>

                <HStack style={{ alignItems: 'center', justifyContent: 'center', marginTop: 0 }}>
                    <Text style={{ textTransform: 'uppercase', color: 'white', fontWeight: 'bold' }} >{selectedSchool.schoolName}</Text>
                </HStack>
                <Stack spacing={3}>
                    <HStack style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ textTransform: 'uppercase', color: 'white' }} >{selectedSchool.address}</Text>
                    </HStack>
                    <HStack style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
                        <Text onPress={() => Linking.openURL(selectedSchool.schoolUrl)} style={{ color: 'blue' }} >{selectedSchool.schoolUrl}</Text>
                    </HStack>
                    <Divider style={{ marginBottom: 4, marginTop: 10 }} leadingInset={16} trailingInset={32} />
                    <Divider style={{ marginBottom: 4, marginTop: 10, opacity: -4 }} leadingInset={16} trailingInset={32} />
                    <Stack center>
                        {((touched.userType && errors.userType)) && <Text color='red' >{errors.userType}</Text>}
                        {((touched.usernameOrRegNumber && errors.usernameOrRegNumber)) && <Text color='red' >{errors.usernameOrRegNumber}</Text>}
                    </Stack>
                    <View style={{ width: '100%' }}>
                        <Text color={screenLocalColor}>User type</Text>
                        <Divider style={{ marginBottom: 4, marginTop: 10, opacity: -4 }} leadingInset={16} trailingInset={32} />
                        <CustomDropdownInput data={userTypes}
                            searchPlaceHolder="Search"
                            defaultButtonText={userTypes[1]}
                            default={1}
                            disabled={true}
                            buttonTextAfterSelection={(selectedItem: string, index: any) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item: string, index: any) => {
                                return item
                            }}
                            onSelect={(selectedItem: string, index: number) => {
                                handleChange;
                                setFieldValue('userType', index)
                                if (index === 2) {
                                    setUsernameOrRegNumberPlaceHolder('Parent Registered Email')
                                }
                                if (index === 0) {
                                    setUsernameOrRegNumberPlaceHolder('Student Reg Number OR Email')
                                } 
                                if (index == 1) {
                                    setUsernameOrRegNumberPlaceHolder('Teacher Registered Email')
                                }
                            }}
                        />
                    </View>

                    <Divider style={{ marginBottom: 4, marginTop: 20, opacity: -4 }} leadingInset={16} trailingInset={32} />

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
                            returnKeyType='go'
                            returnKeyLabel='go'
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
                <HStack spacing={6} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <View>
                        <CustomButton
                            title="Cancel"
                            compact
                            backgroundColor={AppButtonColorDark}
                            onPress={() => {
                                openOrCloseModal(false, null)
                            }}
                        />
                    </View>
                    <View>
                        <CustomButton
                            title="Submit"
                            compact
                            backgroundColor={'#7c68ee'}
                            onPress={() => {
                                handleSubmit()

                            }}
                        />
                    </View>
                </HStack>
            </Stack>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    searchContainer: {
        width: '90%',
        borderRadius: 20,
        justifyContent: 'center',
        padding: 5,
        marginTop: 50
    }
})