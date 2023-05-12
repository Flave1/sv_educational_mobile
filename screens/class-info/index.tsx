import { Badge, Pressable,Text } from "@react-native-material/core";
import React,{useEffect,useState} from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { actions } from "../../store/action-types/app-state-action-types";
import { screens } from "../../screen-routes/navigation";
import { connect } from "react-redux";
import { GetClassStudents, GetClassSubjects, getClassInfoWithoutSubj } from "../../store/actions/class-properties-actions";
import sessionClass from "../session-class";
import { SelectItem } from "../../models/select-item";
import ClassSubjectsInfo from "./classSubjectsInfo";
import ClassStudentInfo from "../session-class/class-student-info";
import ProtectedTeacher from "../authentication/protected-teacher";
import { Row } from "native-base";

const ClassInfoIndex = (props:any) => {
const [sessionClass] = useState<SelectItem>(props.route.params.sessionClass);
const [navToStudents, setnavToStudents] = useState<Boolean>(false);

useEffect(() => {
 props.getClassInfo(sessionClass.value);
 props.getClassSubjects(sessionClass.value);
 props.getClassStudents(sessionClass.value);
 }, []);
console.log("props",props.classInfoWithoutSubj);

        return (
             <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="ClassInfo">
             <ScrollView style={{ marginHorizontal:10}}>
             <View>
                  <Text color="black" style={{fontSize:30,marginVertical:20}}>Class Details</Text>
                  </View>
                <ScrollView horizontal={true}>
                    <View >
                             <View  style={[styles.tableRow]}>
                                    <Text style={[styles.headerItem, { width: 200 }]}>Class</Text>
                                    <Text style={[styles.tableItem, { width: 200 }]}>{props.classInfoWithoutSubj?.class}</Text>
                                    </View>
                                    <View  style={[styles.tableRow]}>
                                    <Text style={[styles.headerItem, { width: 200 }]}>Form Teacher</Text>
                                    <Text style={[styles.tableItem, { width: 200 }]}>{props.classInfoWithoutSubj?.formTeacher}</Text>
                                    </View>
                                    <View  style={[styles.tableRow]}>
                                    <Text style={[styles.headerItem, { width: 200 }]}>No of Subjects</Text>
                                    <Text style={[styles.tableItem, { width: 200 }]}><Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={props.classSubjects?.length}/></Text>
                                    </View>
                                    <View  style={[styles.tableRow]}>
                                    <Text style={[styles.headerItem, { width: 200 }]}>No of Students</Text>
                                    <Text style={[styles.tableItem, { width: 200 }]}><Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={props.classStudents?.length}/></Text>
                                    </View>
                                    <View  style={[styles.tableRow]}>
                                    <Text style={[styles.headerItem, { width: 200 }]}>Assessment Score</Text>
                                    <Text style={[styles.tableItem, { width: 200 }]}><Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={props.classInfoWithoutSubj?.assessmentScore}/></Text>
                                    </View>
                                    <View  style={[styles.tableRow]}>
                                    <Text style={[styles.headerItem, { width: 200 }]}>Exam Score</Text>
                                    <Text style={[styles.tableItem, { width: 200 }]}><Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={props.classInfoWithoutSubj?.examScore}/></Text>
                                    </View>
                                    <View  style={[styles.tableRow]}>
                                    <Text style={[styles.headerItem, { width: 200 }]}>Pass Mark</Text>
                                    <Text style={[styles.tableItem, { width: 200 }]}><Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={props.classInfoWithoutSubj?.passMark}/></Text>
                                    </View>
                        
                    </View>
                </ScrollView>

                <View style={{ marginTop:20}}>
                    <Row>
                    {!navToStudents ? <Pressable onPress={()=>setnavToStudents(false)}><View style={{ backgroundColor: 'blue', padding:20,width:50 }}><Text color="white">Subjects</Text></View></Pressable>  : <Text> Subjects</Text> }
                    {navToStudents ? <Pressable onPress={()=>setnavToStudents(true)}><View style={{ backgroundColor: 'blue', padding:20,width:50 }}><Text color="white">Students</Text></View></Pressable>  : <Text> Students</Text> }
                    </Row>
                    <ScrollView>
                   <ClassSubjectsInfo classSubjects ={props.classSubjects} />
                   <ClassStudentInfo classStudents ={props.classStudents} />
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
  badge: { backgroundColor: '#139C85', color: 'white', borderRadius: 50, textAlign: 'center' },
  tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10,
  },
  headerItem: {
      color: 'black',
  },
  tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      padding: 10

  },
  tableItem: {
      color: 'black',
  },
})
function mapStateToProps(state: any) {
    return {
        classInfoWithoutSubj: state.classPropsState.classInfoWithoutSubj,
        classSubjects: state.classPropsState.classSubjects,
        classStudents: state.classPropsState.classStudents,

    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        getClassInfo: (sessionClassId: string) => getClassInfoWithoutSubj(sessionClassId)(dispatch),
        getClassSubjects: (sessionClassId: string) => GetClassSubjects(sessionClassId)(dispatch),
        getClassStudents: (sessionClassId: string) => GetClassStudents(sessionClassId)(dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassInfoIndex);