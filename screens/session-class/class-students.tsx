import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { connect } from "react-redux";
import ProtectedTeacher from "../authentication/protected-teacher";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ScreenTitle from "../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { SelectItem } from "../../models/select-item";
import { ClassStudent } from "../../models/class-properties/students";
import { AppLightBlue } from "../../tools/color";
import { Dimensions } from "react-native";
import CustomTextInput from "../layouts/CustomTextInput";
import { screens } from "../../screen-routes/navigation";

function ClassStudents(props: any) {

    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [students, setStudents] = useState<ClassStudent[]>([]);
    const [filtered, setFilteredStudents] = useState<ClassStudent[]>(students);
    const [query, setQuery] = useState('');
    const [selectItemId, setSelectedItem] = useState<string>('');

    useEffect(() => {
        setFilteredStudents(students);
    }, [students])
    useEffect(() => {
        props.classStudents && setStudents(props.classStudents.filter((x: any) => x.sessionClassID === sessionClass.value));
    }, [sessionClass.value]);



    const handleSearch = (text: any) => {
        setQuery(text);
        const filteredData = students.filter(item => {

            if (text === '') {
                return item;
            } else if (item.firstName.toLowerCase().includes(text.toLowerCase())) {
                return item;
            } else if (item.lastName.toLowerCase().includes(text.toLowerCase())) {
                return item;
            } else if (item.registrationNumber.toLowerCase().includes(text.toLowerCase())) {
                return item;
            } else
                item
        });
        setFilteredStudents(filteredData);
    };

    return (

        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Class Students">
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    {/* <ScreenTitle icon={<MaterialIcons name="app-registration" color="white" size={25} />} title={'-' + sessionClass.text + ' STUDENTS'} /> */}
                    <View style={styles.searchContainer}>
                        <CustomTextInput
                            icon={<MaterialIcons name={'search'} size={16} />}
                            placeholder='Search .....'
                            autoCapitalize='none'
                            autoCompleteType='text'
                            keyboardType='text'
                            keyboardAppearance='dark'
                            onChangeText={handleSearch}
                            value={query}
                        // onChange={(e: any) => {
                        //     handleChange('title');
                        //     setFieldValue('title', e.nativeEvent.text)
                        // }}
                        />
                    </View>
                    <View style={styles.studentsContainer}>
                        <ScrollView>
                            {
                                filtered.map((std: ClassStudent, idx: number) => {
                                    return (
                                        <Pressable
                                            onPress={() => {
                                                props.navigation.navigate({
                                                    name: screens.scenes.mainapp.scenes.tutor.screens.classStudents.screens.info.name,
                                                    params: { studentContactId: std.studentAccountId }
                                                })
                                            }}
                                            key={idx} style={styles.student}>
                                            <View style={styles.avata}>
                                                <Text style={{color:'white', }}>{std.lastName.charAt(0)}</Text>
                                            </View>
                                            <View style={styles.detail}>
                                                <Text style={{ fontWeight: 'bold', fontSize: 20,color:'white', }}>{std.lastName + " " + std.firstName + " " + std.middleName}</Text>
                                                <Text style={{color:'white', }}>{std.registrationNumber.toUpperCase()}</Text>
                                            </View>
                                        </Pressable>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View>

            </BottomSheetModalProvider>
        </ProtectedTeacher>
    )
}

function mapStateToProps(state: any) {
    return {
        classStudents: state.classPropsState.classStudents,
        totalPages: state.classnotesState.totalPages,
        pageNumber: state.classnotesState.pageNumber,
    };
}

const styles = StyleSheet.create({
    searchContainer: {
        height: Dimensions.get('window').height / 8,
        width: '90%',
        borderRadius: 20,
        marginTop: 10,
        justifyContent: 'center',
        padding: 5
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    studentsContainer: {
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
    }
})


export default connect(mapStateToProps, null)(ClassStudents);