import { Badge, Pressable,Text } from "@react-native-material/core";
import React,{useEffect,useState} from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { actions } from "../../store/action-types/app-state-action-types";
import { screens } from "../../screen-routes/navigation";
import { connect } from "react-redux";
import { GetClassStudents, GetClassSubjects, getClassInfoWithoutSubj } from "../../store/actions/class-properties-actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import sessionClass from "../session-class";
import { SelectItem } from "../../models/select-item";

const ClassStudentInfo = (props:any) => {
        return (
            <>
             <ScrollView style={{ marginHorizontal:10}}>
                    <ScrollView horizontal={true}>
                    <View style={[styles.tableHeader]}>
                        <Text style={[styles.headerItem, { width: 100 }]}>Student(s) Name</Text>
                        <Text style={[styles.headerItem, { width: 200 }]}>Registration No</Text>
                        <Text style={[styles.headerItem, { width: 50 }]}>Action</Text>
                    </View>
                    <View style={[styles.tableRow]}>
                                <Text style={[styles.tableItem, { width: 100 }]}>{props.classStudents.firstName} {props.classStudents.lastName}</Text>
                                <Text style={[styles.tableItem, { width: 200 }]}><Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={props.classStudents.registrationNumber}/></Text>
                               <Pressable onPress={()=>{
                                props.navigation.navigate({
                                  name: screens.scenes.mainapp.scenes.tutor.screens.classStudents.screens.info.name,
                                  params: {
                                      sessionClass: sessionClass,
                                  }})
                               }}> <Text style={[styles.tableItem,{backgroundColor:"green", width:20}]}>icon={<MaterialCommunityIcons name="info" color="white" size={30} />}</Text></Pressable>
                            </View>
                    </ScrollView>
                </ScrollView>
            </>
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


export default ClassStudentInfo;