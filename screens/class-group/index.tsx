import { StyleSheet, View, Text, ScrollView, Pressable, FlatList } from "react-native";
import { connect } from "react-redux";
import ProtectedTeacher from "../authentication/protected-teacher";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState, useMemo, useRef } from "react";
import { SelectItem } from "../../models/select-item";
import { AppButtonColorDark, AppLightBlue } from "../../tools/color";
import { Dimensions, Alert } from "react-native";
import CustomTextInput from "../layouts/CustomTextInput";
import { GetClassGroups2, GetClassSubjects, deleteClassGroup, } from "../../store/actions/class-properties-actions";
import { ClassSubjects } from "../../models/class-properties/class-subjects";
import { ClassGroup } from "../../models/class-properties/class-group";
import { Box, HStack, Stack, Badge } from "@react-native-material/core";
import CustomDropdownInput from "../layouts/CustomDropdownInput";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import BottomUpComponent from "../layouts/bottom-up-component";
import ListComponent from "../layouts/list-component";
import AntDesign from "react-native-vector-icons/AntDesign";
import { screens } from "../../screen-routes/navigation";
import Feather from "react-native-vector-icons/Feather";
import { FloatingButton } from "../layouts/floating-button";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { displayError } from "../../store/actions/app-state-actions";
import ScreenTitle from "../layouts/screen-title";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function ClassGroupIndex(props: any) {
    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [filtered, setFilteredClassGroup] = useState<ClassGroup[]>([]);
    const [query, setQuery] = useState('');
    const [classGroup, setClassGroup] = useState<ClassGroup[]>([])
    const [selectedItem, setSelectedItem] = useState("")
    const [sessionClassSubject, setSubject] = useState<SelectItem>({ value: '', text: '', lookUpId: '' });

    const snapPoints = useMemo(() => ["90%"], []);
    const bottomSheetModalRef = useRef<BottomSheetModalMethods>(null);
    const [modalActionState, setModalActionState] = useState(false);
    const openOrCloseModal = (shouldOpenModal: boolean) => {
        setModalActionState(shouldOpenModal)
        if (shouldOpenModal && bottomSheetModalRef.current) {
            bottomSheetModalRef.current.present();
        } else if (bottomSheetModalRef.current) {
            bottomSheetModalRef.current.close();
        }
    };

    useEffect(() => {
        sessionClassSubject && props.getAll(sessionClass.value, sessionClassSubject.value).then((result: any) => {
            setClassGroup(result);
        });
        props.getSubjects(sessionClass?.value);
    }, [sessionClass.value, sessionClassSubject]);


    const showDialog = () => {
        Alert.alert(
            'Delete Class Group',
            'Are you sure you want to delete this class group ?',
            [
                {
                    text: 'CANCEL',
                    onPress: () => { '' },
                },
                {
                    text: 'YES',
                    onPress: () => {
                        props.delete([selectedItem], sessionClass.value, sessionClassSubject.value, setClassGroup)
                    },
                },
            ],
            { cancelable: false }
        );
    };
    return (

        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Class Group">
            <BottomSheetModalProvider>
                <Stack style={{ flex: 0, marginHorizontal: 21 }}>
                    <HStack style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center' }}>
                        <ScreenTitle icon={<FontAwesome5 name="user-friends" color="white" size={25} />} title={'-' + sessionClass.text + ' GROUP'} />
                        <Box w={184}  >
                            <CustomDropdownInput data={props.classSubjects}
                                searchPlaceHolder="Search"
                                height={50}
                                defaultButtonText="Select Subject"
                                // search={true}
                                buttonTextAfterSelection={(selectedItem: ClassSubjects, index: any) => {
                                    return selectedItem.subjectName
                                }}
                                rowTextForSelection={(item: ClassSubjects, index: any) => {
                                    return item.subjectName
                                }}
                                onSelect={(selectedItem: ClassSubjects, index: any) => {
                                    setSubject({ value: selectedItem.sessionClassSubjectId, text: selectedItem.subjectName, lookUpId: selectedItem.subjectid })
                                }}
                            />
                        </Box>
                    </HStack>
                </Stack>
                <View style={styles.container}>
                    <FloatingButton>
                        <Pressable
                            onPress={() => {
                                if (!sessionClassSubject.value) {
                                    props.setErrorToastState('Subject must be selected');
                                    return;
                                };
                                props.navigation.navigate({
                                    name: screens.scenes.mainapp.scenes.tutor.screens.classGroup.screen.create.name,
                                    params: {
                                        sessionClass: sessionClass,
                                        sessionClassSubject: sessionClassSubject,
                                        setClassGroup: setClassGroup,
                                    }
                                });

                            }}>
                            <MaterialCommunityIcons
                                name="plus"
                                size={50}
                                color={AppButtonColorDark}
                            />
                        </Pressable>
                    </FloatingButton>
                    {/* <ScrollView style={{ zIndex: -2 }}>
                        {
                            classGroup?.map((group: ClassGroup, idx: number) => {
                                return (
                                    <Pressable
                                        onPress={() => {
                                            setSelectedItem(group.groupId)
                                            openOrCloseModal(!modalActionState)
                                        }}
                                        key={idx} style={styles.student}>
                                        <View style={styles.avata}>
                                            <Text style={styles.textStyle}>{group.groupName.charAt(0)}</Text>
                                        </View>
                                        <View style={styles.detail}>
                                            <Text style={[styles.textStyle, { fontWeight: 'bold', fontSize: 20 }]}>{group.groupName}</Text>
                                            <Text style={styles.textStyle}><Text style={styles.textStyle}>No of Students in Grp: </Text>{group?.numberOfStudentsInGroup}</Text>
                                            <Text style={styles.textStyle}><Text style={styles.textStyle}>No of Students not in Grp: </Text>{group?.numberOfStudentNotInGroup}</Text>
                                        </View>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView> */}
                    <ScrollView horizontal={true} style={{ marginTop: 10, zIndex: -2 }} >
                        <View>
                            <View style={[styles.tableHeader]}>
                                <Text style={[styles.headerItem, { width: 150 }]}>Group Name</Text>
                                <Text style={[styles.headerItem, { width: 150 }]}>No of Students in Grp</Text>
                                <Text style={[styles.headerItem, { width: 150 }]}>No of Students Not in Grp</Text>
                            </View>

                            <FlatList
                                data={classGroup}
                                keyExtractor={item => item?.groupName}
                                renderItem={({ item, idx }: any) => (
                                    <View key={idx} style={[styles.tableRow]}>
                                        <Pressable
                                            onPress={() => {
                                                setSelectedItem(item?.groupId)
                                                openOrCloseModal(!modalActionState)
                                            }}
                                            key={idx} style={styles.student}>
                                            <Text style={[styles.tableItem, { width: 150 }]}>{item?.groupName}</Text>
                                            <Text style={[styles.tableItem, { width: 150 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item?.numberOfStudentsInGroup} /></Text>
                                            <Text style={[styles.tableItem, { width: 150 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item?.numberOfStudentNotInGroup} /></Text>
                                        </Pressable> 
                                            </View>
                                )}
                            /></View>
                    </ScrollView>


                </View>

                <BottomUpComponent bottomSheetModalRef={bottomSheetModalRef} snapPoints={snapPoints} openOrCloseModal={openOrCloseModal}>
                    <Stack>
                        <ListComponent text={'Update'} icon={<Feather name="file-plus" size={20} />} onPress={() => {
                            openOrCloseModal(false)
                            props.navigation.navigate({
                                name: screens.scenes.mainapp.scenes.tutor.screens.classGroup.screen.update.name,
                                params: {
                                    sessionClass: sessionClass,
                                    sessionClassSubject: sessionClassSubject,
                                    groupId: selectedItem,
                                    setClassGroup: setClassGroup,
                                }
                            })
                        }} />

                        <ListComponent text={'Delete'} icon={<AntDesign name="delete" size={20} />} onPress={() => {
                            openOrCloseModal(false)
                            showDialog()

                        }} />
                    </Stack>
                </BottomUpComponent>
            </BottomSheetModalProvider>
        </ProtectedTeacher>
    )
}

function mapStateToProps(state: any) {
    return {
        classSubjects: state.classPropsState.classSubjects,
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        setErrorToastState: (error: string) => displayError(error)(dispatch),
        delete: (item: string, sessionClassId: string, sessionClassSubjectId: string, setClassGroup: any) => deleteClassGroup(item, sessionClassId, sessionClassSubjectId, setClassGroup)(dispatch),
        getSubjects: (sessionClassId: string) => GetClassSubjects(sessionClassId)(dispatch),
        getAll: (classId: string, sessionClassSubjectId: string) => GetClassGroups2(classId, sessionClassSubjectId)(dispatch),
    };
}

const styles = StyleSheet.create({
    searchContainer: {
        height: Dimensions.get('window').height / 8,
        width: '90%',
        borderRadius: 20,
        marginTop: 20,
        justifyContent: 'center',
        padding: 5
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },

    student: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        margin: 10
    },
    avata: {
        borderWidth: 1,
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        borderColor: AppLightBlue,
    },
    detail: {
        borderRadius: 100,
        width: '90%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10,
        zIndex: -2,
    },
    textStyle: {
        color: 'white',
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    headerItem: {
        color: 'white',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10

    },
    tableItem: {
        color: 'white',
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(ClassGroupIndex);