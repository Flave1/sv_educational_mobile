import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { connect } from "react-redux";
import ProtectedTeacher from "../authentication/protected-teacher";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { SelectItem } from "../../models/select-item";
import { AppLightBlue } from "../../tools/color";
import { Dimensions } from "react-native";
import CustomTextInput from "../layouts/CustomTextInput";
import { screens } from "../../screen-routes/navigation";
import { GetClassSubjects2 } from "../../store/actions/class-properties-actions";
import { ClassSubjects as Subject } from "../../models/class-properties/class-subjects";

function ClassSubjects(props: any) {
    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [filtered, setFilteredSubjects] = useState<Subject[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        sessionClass.value && props.getAll(sessionClass.value).then((result: any) => {
            setSubjects(result);
        });
    }, [sessionClass.value]);

    useEffect(() => {
        subjects && setFilteredSubjects(subjects);
    }, [subjects]);
    const handleSearch = (text: any) => {
        setQuery(text);
        const filteredData = subjects.filter(item => {
            if (query === "") {
                return subjects;
            } else if (item.subjectName.toLowerCase().includes(query.toLowerCase())) {
                return item;
            } else if (item.subjectTeacher.toLowerCase().includes(query.toLowerCase())) {
                return item;
            } else
                subjects
        });
        setFilteredSubjects(filteredData);
    };

    return (

        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Class Subjects">
            <BottomSheetModalProvider>
                <View style={styles.container}>
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
                        />
                    </View>
                    <View style={styles.studentsContainer}>
                        <ScrollView>
                            {
                                filtered.map((sub: Subject, idx: number) => {
                                    return (
                                        <Pressable
                                            key={idx} style={styles.student}>
                                            <View style={styles.avata}>
                                                <Text style={styles.textStyle}>{sub.subjectName.charAt(0)}</Text>
                                            </View>
                                            <View style={styles.detail}>
                                                <Text style={[styles.textStyle,{ fontWeight: 'bold', fontSize: 20 }]}>{sub.subjectName}</Text>
                                                <Text style={styles.textStyle}><Text style={styles.textStyle}>teacher: </Text>{sub?.subjectTeacher?.toLowerCase()}</Text>
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
        classSubjects: state.classPropsState.classSubjects,
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        getAll: (classId: string) => GetClassSubjects2(classId)(dispatch),
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
        padding: 10
    },
    textStyle:{
        color:'white',
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ClassSubjects);