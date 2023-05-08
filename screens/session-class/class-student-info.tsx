import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ProtectedTeacher from "../authentication/protected-teacher";
import { displayFullScreen } from "../../store/actions/app-state-actions";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { AppButtonColorDark, AppLightBlue, AppPurple } from "../../tools/color";
import { GetSingleStudent } from "../../store/actions/class-properties-actions";
import { ClassStudentInfo as Student } from "../../models/class-properties/students";
function ClassStudentInfo(props: any) {

    const [studentContactId] = useState<string>(props.route.params.studentContactId);
    const [student, setStudent] = useState<Student>(new Student())

    useEffect(() => {
        props.displayFullScreen(true);
        return () => {
            props.displayFullScreen(false);
        }
    }, []);
    useEffect(() => {
        studentContactId && props.get(studentContactId).then((res: any) => {
            setStudent(res);
        });
    }, [studentContactId])
    return (
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Class Students">
            <BottomSheetModalProvider>
                <ScrollView style={{ padding: 0 }}>
                    <View style={styles.topSection}>

                        <View style={styles.avata}>
                            {/* <Image source={''}/> */}
                        </View>

                        <View style={{ flexDirection:'row', alignItems:'stretch'}}>
                            <Text style={styles.regNu}>{student.registrationNumber}</Text>
                            {/* <Text style={styles.class}>{student.sessionClass}</Text> */}
                        </View>
                    </View>
                    <View style={styles.bottomSection}>
                        <View style={styles.sectionStyle}>
                            <Text style={styles.label}>Name</Text>
                            <Text style={styles.item}>{student.firstName + " " + student.lastName + " " + student.middleName}</Text>
                        </View>
                        <View style={styles.sectionStyle}>
                            <Text style={styles.label}>Email</Text>
                            <Text style={styles.item}>{student.email}</Text>
                        </View>
                        <View style={styles.sectionStyle}>
                            <Text style={styles.label}>Address</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>{'city: '}</Text>
                                <Text style={{ fontSize: 17 }}>{student.cityId}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.label}>{'country: '}</Text>
                                <Text style={{ fontSize: 17 }}>{student.countryId}</Text>
                            </View>
                        </View>
                        <View style={styles.sectionStyle}>
                            <Text style={styles.label}>Hobbies</Text>
                            <View style={{ minHeight: 80, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    student.hobbies?.map((hobby: string, idx: number) => {
                                        return (
                                            <Text key={idx} style={styles.badges}>{hobby}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={styles.sectionStyle}>
                            <Text style={styles.label}>Address</Text>
                            <View style={{ minHeight: 80, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    student.bestSubjectNames?.map((subj: string, idx: number) => {
                                        return (
                                            <Text key={idx} style={styles.badges}>{subj}</Text>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={styles.sectionStyle}>
                            <Text style={styles.label}>Bio</Text>
                            <View style={{ height: 80 }}>
                                <Text style={styles.item}>{''}</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </BottomSheetModalProvider>
        </ProtectedTeacher>
    )
}

function mapDispatchToProps(dispatch: any) {
    return {
        displayFullScreen: (display: boolean) => dispatch(displayFullScreen(display)),
        get: (studentContactId: string) => GetSingleStudent(studentContactId)(dispatch)
    };
}



const styles = StyleSheet.create({
    topSection: {
        height: Dimensions.get('window').height / 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppLightBlue,
        padding: 5
    },
    bottomSection: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: .5,
        marginTop: 25
    },
    avata: {
        borderColor: 'grey',
        borderWidth: .5,
        width: Dimensions.get('window').width / 3,
        height: '80%',
        borderRadius: 100,
        justifyContent: 'flex-end'
    },
    sectionStyle: {
        borderRadius: 10,
        backgroundColor: AppButtonColorDark,
        margin: 5,
        width: '90%',
        padding: 10,
        justifyContent: 'center'
    },
    label: {
        color: 'grey'
    },
    item: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    badges: {
        fontSize: 17,
        backgroundColor: AppLightBlue,
        padding: 3,
        borderRadius: 10,
        margin: 3,
        color: 'black'
    },
    regNu: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: AppButtonColorDark,
        borderRadius: 5,
        padding: 3,
        // alignSelf: 'flex-start',
        opacity: 4,
        textTransform: 'uppercase'
    },
    class: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: AppButtonColorDark,
        borderRadius: 5,
        padding: 3,
        // alignSelf: 'flex-end',
        opacity: 4,
        textTransform: 'uppercase',

        borderColor: 'grey',
        borderWidth: .5,
    }
})
export default connect(null, mapDispatchToProps)(ClassStudentInfo);

