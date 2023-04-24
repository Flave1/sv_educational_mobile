import { ScrollView, View } from "react-native";
import ProtectedTeacher from "../../authentication/protected-teacher";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SelectItem } from "../../../models/select-item";
import ScreenTitle from "../layouts/screen-title";
import { HStack, Stack } from "@react-native-material/core";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { ClassStudents } from "../../../models/class-properties/students";

const AttendanceIndex = (props: any) => {

    const [sessionClass, setClass] = useState<SelectItem>(props.route.params);
    const [selectItemId, setSelectedItem] = useState<string>('');
    const [students, setStudents] = useState<ClassStudents[]>();

    useEffect(() => {
        props.classStudents && setStudents(props.classStudents.filter((x: ClassStudents) => x.sessionClassID === sessionClass.value))
    }, [props.classStudents]);


    console.log('attendanceList', props.attendanceList);
    
 

    return (<>
        <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Attendance" params={props.params}>
            <ScrollView style={{ flex: 1 }}>
                    <Stack spacing={10} style={{ flex: 1 }} >
                        <Stack style={{ flex: 0, marginHorizontal: 21 }}>
                            <HStack style={{ alignItems: 'center' }}>
                                <ScreenTitle icon={<MaterialIcons name="app-registration" color="white" size={25} />} title={'-' + sessionClass.text} />
                            </HStack>
                        </Stack>
                        <View>
                            <HStack style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                                {
                                    // attendanceList.map((item: HomeAssessment, idx: number) => {
                                    //     return (
                                    //         <></>
                                    //         // <Pressable
                                    //         //     key={idx}
                                    //         //     onTouchStart={() => {
                                    //         //         setSelectedItem(item.homeAssessmentId)
                                    //         //         openOrCloseModal(!modalActionState);
                                    //         //     }}>

                                    //         //     <HomeAssessmentBox
                                    //         //         title={item.title}
                                    //         //         deadlineDate={item.dateDeadLine + ':' + item.timeDeadLine}
                                    //         //         status={item.status}
                                    //         //         group={item.sessionClassGroupName}
                                    //         //         subject={item.sessionClassSubjectName} />
                                    //         // </Pressable>
                                    //     )
                                    // })
                                }
                            </HStack>
                        </View>


                    </Stack>

            </ScrollView>
        </ProtectedTeacher>
    </>)
}



function mapStateToProps(state: any) {
    return { 
        classStudents: state.classPropsState.classStudents,
        attendanceList: state.attendanceState.attendanceList
     };
}

function mapDispatchToProps(dispatch: any) {
    return {
        // getAll: (values: any, navigate: any) => Login(values, navigate)(dispatch) 

    };
}



export default connect(mapStateToProps, mapDispatchToProps)(AttendanceIndex);
