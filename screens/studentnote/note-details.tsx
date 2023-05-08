import React, { useState, useEffect, useMemo, useRef } from "react";
import { HStack, Pressable, Stack } from "@react-native-material/core";
import ScreenTitle from "../layouts/screen-title";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CustomText from "../layouts/CustomText";
import BottomUpComponent from "../layouts/bottom-up-component";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import RenderHtml from 'react-native-render-html';
import { SelectItem } from "../../models/select-item";
import { ClassService } from "../../services/Class-service";
import { StudentNote } from "../../models/class-properties/Tutor-class";
import ProtectedTeacher from "../authentication/protected-teacher";
import { connect } from "react-redux";
const StudentnoteDetails = (props:any) => {
    const [studentNote, setStudentNote] = useState<StudentNote>(new StudentNote());
    useEffect(() => {
        ClassService.getSingleStudentNote(props.route.params.studentNoteId, props.studentnotes).then(result => {
            setStudentNote(result);
        });
    })
  return (
    <ProtectedTeacher backgroundColor={props.backgroundColor} currentScreen="Assessment">
    <BottomSheetModalProvider>
        <ScrollView>
            <Stack spacing={10} style={{ flex: 1, margin: 10, }}>
                <Stack style={{ flex: 0 }}>
                    <HStack style={{ alignItems: 'center' }}>
                        <ScreenTitle icon={<MaterialIcons name="assessment" color="white" size={20} />} title={'Student Note Details'} />
                       
                        <CustomText title={<MaterialIcons name="zoom-out-map" size={20} />} />
                    </HStack>
                </Stack>

                <Stack spacing={10} style={{ height: '60%' }}>

                    <Stack spacing={5}>
                        <Stack>
                            <HStack>
                                <Text style={style.label}>Title: </Text> <CustomText style={{ textTransform: 'capitalize', fontWeight: 'bold' }} title={studentNote?.noteTitle} />
                            </HStack>
                            <HStack>
                                <Text style={style.label}>Subject: </Text>
                                <CustomText style={style.text} title={studentNote?.subjectName} />
                            </HStack>
                            <HStack>
                                <Text style={style.label}>Submition Date: </Text>
                                <CustomText style={style.text} title={studentNote?.dateSubmitted} />
                            </HStack>
                        </Stack>
                        <Stack style={{
                            padding: 5,
                            borderColor: 'grey',
                            borderWidth: 1, flex: 1,
                            borderRadius: 10,
                            minHeight: 400
                        }}>
                            <ScrollView style={{
                                flex: 1,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                padding: 3
                            }} >
                                {
                                    studentNote?.noteContent &&
                                    <RenderHtml
                                        source={{ html: studentNote.noteContent }}
                                        contentWidth={200}
                                    />
                                }
                            </ScrollView>
                        </Stack>
                        
                    </Stack>
                </Stack>
            </Stack>
        </ScrollView>
   


    </BottomSheetModalProvider>
</ProtectedTeacher>
  )
}

const style = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold'
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap', color: 'black' },
})
function mapStateToProps(state: any) {
    return {
        studentnotes: state.studentnotesState.studentnotes
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentnoteDetails)