import { Badge, Pressable, Text } from "@react-native-material/core";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { GetClassStudents, getSessionClassSubjects, getSessionClassWithoutSubj } from "../../store/actions/class-properties-actions";
import { SelectItem } from "../../models/select-item";
import ProtectedTeacher from "../authentication/protected-teacher";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { screens } from "../../screen-routes/navigation";
import { AppButtonColorDark } from "../../tools/color";

const ClassInfoIndex = (props: any) => {
    const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
    const [navToStudents, setnavToStudents] = useState<Boolean>(false);
    const [classInfoWithoutSubj, setClassInfoWithoutSubj] = useState<any>({})
    const [sessionClassSubj, setSessionClassSubj] = useState<any[]>([])

    useEffect(() => {
        props.getClassInfo(sessionClass.value).then((result: any) => {
            setClassInfoWithoutSubj(result);
        });
        props.getClassSubjects(sessionClass.value).then((result: any[]) => {
            setSessionClassSubj(result);
        });
        props.getClassStudents(sessionClass.value);
    }, []);

    return (
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="ClassInfo">
            <ScrollView style={{ marginHorizontal: 10 }}>
                <View>
                    <Text color="white" style={{ fontSize: 30, marginVertical: 20 }}>Class Details</Text>
                </View>
                <ScrollView horizontal={true}>
                    <View >
                        <View style={[styles.tableRow]}>
                            <Text color="white" style={[styles.headerItem, { width: 200 }]}>Class</Text>
                            <Text color="white" style={[styles.tableItem, { width: 200 }]}>{classInfoWithoutSubj?.class}</Text>
                        </View>
                        <View style={[styles.tableRow]}>
                            <Text color="white" style={[styles.headerItem, { width: 200 }]}>Form Teacher</Text>
                            <Text color="white" style={[styles.tableItem, { width: 200 }]}>{classInfoWithoutSubj?.formTeacher}</Text>
                        </View>
                        <View style={[styles.tableRow]}>
                            <Text color="white" style={[styles.headerItem, { width: 200 }]}>No of Subjects</Text>
                            <Text color="white" style={[styles.tableItem, { width: 200 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={sessionClassSubj?.length} /></Text>
                        </View>
                        <View style={[styles.tableRow]}>
                            <Text color="white" style={[styles.headerItem, { width: 200 }]}>No of Students</Text>
                            <Text color="white" style={[styles.tableItem, { width: 200 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={props.classStudents?.length} /></Text>
                        </View>
                        <View style={[styles.tableRow]}>
                            <Text color="white" style={[styles.headerItem, { width: 200 }]}>Assessment Score</Text>
                            <Text color="white" style={[styles.tableItem, { width: 200 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={classInfoWithoutSubj?.assessmentScore} /></Text>
                        </View>
                        <View style={[styles.tableRow]}>
                            <Text color="white" style={[styles.headerItem, { width: 200 }]}>Exam Score</Text>
                            <Text color="white" style={[styles.tableItem, { width: 200 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={classInfoWithoutSubj?.examScore} /></Text>
                        </View>
                        <View style={[styles.tableRow]}>
                            <Text color="white" style={[styles.headerItem, { width: 200 }]}>Pass Mark</Text>
                            <Text color="white" style={[styles.tableItem, { width: 200 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={classInfoWithoutSubj?.passMark} /></Text>
                        </View>

                    </View>
                </ScrollView>

                <View style={{ marginTop: 20 }}>
                    <View style={[styles.row]}>
                        {!navToStudents ? <View style={{ backgroundColor: AppButtonColorDark, borderRadius: 50, paddingHorizontal: 10, width: 120 }}><Text onPress={() => setnavToStudents(true)} color="white" >Subjects</Text></View> : <Text onPress={() => setnavToStudents(false)} color="white" > Subjects</Text>}
                        {navToStudents ? <View style={{ backgroundColor: AppButtonColorDark, borderRadius: 50, paddingHorizontal: 10, width: 120, marginLeft: 10 }}><Text onPress={() => setnavToStudents(false)} color="white" >Students</Text></View> : <Text onPress={() => setnavToStudents(true)} color="white"> Students</Text>}
                    </View>
                    <ScrollView>
                        <View>
                            {!navToStudents &&
                                <ScrollView horizontal={true} style={{ marginTop: 10 }} >
                                    <View>
                                        <View style={[styles.tableHeader]}>
                                            <Text style={[styles.headerItem, { width: 100 }]}>Subject</Text>
                                            <Text style={[styles.headerItem, { width: 200 }]}>Teacher</Text>
                                            <Text style={[styles.headerItem, { width: 100 }]}>Exam Score</Text>
                                            <Text style={[styles.headerItem, { width: 100 }]}>Assessment</Text>
                                        </View>

                                        <FlatList
                                            data={sessionClassSubj}
                                            keyExtractor={item => item.subjectName}
                                            renderItem={({ item, idx }: any) => (
                                                <View key={idx} style={[styles.tableRow]}>
                                                    <Text style={[styles.tableItem, { width: 100 }]}>{item.subjectName}</Text>
                                                    <Text style={[styles.tableItem, { width: 200 }]}>{item.subjectTeacherName}</Text>
                                                    <Text style={[styles.tableItem, { width: 100 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.examSCore} /></Text>
                                                    <Text style={[styles.tableItem, { width: 100 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.assessment} /></Text>
                                                </View>
                                            )}
                                        /></View>
                                </ScrollView>

                            }
                        </View>
                        <View>
                            {navToStudents &&
                                <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                                    <View>
                                        <View style={[styles.tableHeader]}>
                                            <Text style={[styles.headerItem, { width: 100 }]}>Student(s) Name</Text>
                                            <Text style={[styles.headerItem, { width: 200 }]}>Registration No</Text>
                                            <Text style={[styles.headerItem, { width: 50 }]}>Action</Text>
                                        </View>

                                        {
                                            props.classStudents.map((item: any, idx: number) => {
                                                return (
                                                    <View key={idx} style={[styles.tableRow]}>
                                                        <Text style={[styles.tableItem, { width: 100 }]}>{item.firstName} {item.lastName}</Text>
                                                        <Text style={[styles.tableItem, { width: 200 }]}><Badge color={AppButtonColorDark} labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.registrationNumber} /></Text>
                                                        <Text style={[{ width: 30 }]}
                                                            onPress={() => {
                                                                props.navigation.navigate({
                                                                    name: screens.scenes.mainapp.scenes.tutor.screens.classStudents.screens.info.name,
                                                                    params: {
                                                                        sessionClass: sessionClass,
                                                                    }
                                                                })
                                                            }} >
                                                            {<MaterialIcons name="info" color="white" size={30} />}
                                                        </Text>
                                                    </View>
                                                )
                                            })
                                        }

                                    </View>
                                </ScrollView>
                            }
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </ProtectedTeacher>

    )
}

const styles = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold'
    },
    border: {
        borderColor: 'red',
        borderWidth: 1
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap', color: 'black', borderRadius: 10 },
    badge: { backgroundColor: AppButtonColorDark, color: 'white', borderRadius: 50, textAlign: 'center' },
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
    row: {
        flexDirection: 'row',
    }
})
function mapStateToProps(state: any) {
    return {
        classStudents: state.classPropsState.classStudents,

    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        getClassInfo: (sessionClassId: string) => getSessionClassWithoutSubj(sessionClassId)(dispatch),
        getClassSubjects: (sessionClassId: string) => getSessionClassSubjects(sessionClassId)(dispatch),
        getClassStudents: (sessionClassId: string) => GetClassStudents(sessionClassId)(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassInfoIndex);