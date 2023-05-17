import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import ProtectedTeacher from "../authentication/protected-teacher";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { AppButtonColorDark, AppLightBlue, AppPurple } from "../../tools/color";
import { GetTeacherDetails, getTeacherClassAndSubject } from "../../store/actions/profile-actions";
import { Avatar, Stack } from "@react-native-material/core";
import CustomButton from "../layouts/CustomButton";
import { screens } from "../../screen-routes/navigation";


const TeacherProfile = (props:any) => {

    useEffect(() => {
        props.getDetails(props?.onboardedUser.id);
        props.getClassAndSubject(props?.onboardedUser.id);
    }, [])
    console.log("props",props.teacherDetail);
    
        return (
            <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Profile">
                <BottomSheetModalProvider>
                    <ScrollView style={{ padding: 0 }}>
                        <View style={styles.topSection}>
    
                            <View style={styles.avata}>
                            <Avatar size={150} image={{
                            uri: props.teacherDetail?.photo ? props.teacherDetail?.photo
                                : 'https://img.lovepik.com/free-png/20211213/lovepik-mens-business-avatar-icon-png-image_401551171_wh1200.png'
                        }} />
                            </View>
    
                            <View style={{ flexDirection:'row', alignItems:'stretch'}}>
                                <Text style={styles.fullname}>{props.teacherDetail?.fullName}</Text>
                            </View>
                        </View>
                        <View style={styles.bottomSection}>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}> First Name</Text>
                                <Text style={styles.item}>{props.teacherDetail?.firstName}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}> Last Name</Text>
                                <Text style={styles.item}>{props.teacherDetail?.lastName}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}> Middle Name</Text>
                                <Text style={styles.item}>{props.teacherDetail?.middleName}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}>Marital Status</Text>
                                <Text style={styles.item}>{props.teacherDetail?.email}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}>Gender</Text>
                                <Text style={styles.item}>{props.teacherDetail?.gender}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}>Date Of Birth</Text>
                                <Text style={styles.item}>{props.teacherDetail?.dob}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}>Phone</Text>
                                <Text style={styles.item}>{props.teacherDetail?.phone}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}>Address</Text>
                                <Text style={styles.item}>{props.teacherDetail?.address}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}>Classes As Form Teacher</Text>
                                { props.teacherClassAndSubject?.classesAsFormTeacher?.map((item: string, idx: number) => {
                                            return (
                                                <Text key={idx} style={styles.item}>{item}</Text>
                                            )
                                        })}
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.label}>Subjects As Subject Teacher</Text>
                               { props.teacherClassAndSubject?.subjectsAsSubjectTeacher?.map((subj: string, idx: number) => {
                                            return (
                                                <Text key={idx} style={styles.item}>{subj}</Text>
                                            )
                                        })}
                              
                            </View>
                            <Stack style={{ marginHorizontal: 50, marginTop: 10, alignItems: 'center' }}>
                        <CustomButton
                            width={200}
                            title={'EDIT'}
                            onPress={() => {
                                props.navigation.navigate(screens.scenes.auth.screens.profile.screens.profileedit.name)
                            }}
                            />
                    </Stack>
                           
    
                        </View>
                    </ScrollView>
                </BottomSheetModalProvider>
            </ProtectedTeacher>
    
    
    
   
  )
}
function mapStateToProps(state: any) {
    return {
        onboardedUser: get(state.appState.onboardedUser),
        teacherDetail: state.profileState.teacherDetail,
        teacherClassAndSubject:state.profileState.teacherClassAndSubject,
    }
}
function mapDispatchToProps(dispatch: any) {
    return {
        getDetails: (teacherAccountId: string) => GetTeacherDetails(teacherAccountId)(dispatch),
        getClassAndSubject:(teacherAccountId: string) => getTeacherClassAndSubject(teacherAccountId)(dispatch),
    };
}
function get(onboardedUser: any) {
    try {
        return JSON.parse(onboardedUser)
    } catch (error) {
        return JSON.parse(JSON.stringify(onboardedUser))
    }
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
        borderColor: 'none',
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
    fullname: {
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
export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfile);
