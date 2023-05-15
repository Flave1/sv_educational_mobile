import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getSharedNoteClasses, sendClassNotes } from "../../store/actions/classnote-actions";
import { HStack, Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScreenTitle from "../layouts/screen-title";
import CustomButton from "../layouts/CustomButton";
import { CustomCheckBox } from "../layouts/checkbox-component";
import { SendToClasses } from "../../models/class-properties/Tutor-class";

function SendClassnote(props: any) {
    const [classArray, setClassArray] = useState<SendToClasses[]>([]);
    const screenLocalColor = "#868C8E";

    useEffect(() => {
        props.teacherClassNoteId &&
        props.getSharedNoteClasses(props.teacherClassNoteId).then((result: SendToClasses[]) => {
                setClassArray(result);
            });
    }, [props.teacherClassNoteId]);


    useEffect(() => {
        if (props.sendClassnoteModal == false) {
            setClassArray([])
        }
    }, [props.sendClassnoteModal]);

    const handleCheck = (item: SendToClasses, isSelected: Boolean) => {
        const updatedClassArray = classArray.map((obj: any) => {
            if (obj.classId === item.classId) {
                return { ...obj, isSent: isSelected };
            }
            return obj;
        });
        setClassArray(updatedClassArray);
    }
   

    return (
        <>
            <Stack style={{ flex: 0 }}>
            <HStack style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', paddingHorizontal: 10 }}>Send class to : </Text>
                </HStack>
            </Stack>
            <ScrollView style={{ padding: 5 }}>
                {classArray?.map((item: SendToClasses, idx: number) => {
                    return (
                        <View key={idx} style={[styles.tableRow]}>
                            <Text style={[styles.tableItem, { width: 300 }]}>{item.sessionClass}</Text>
                            <CustomCheckBox
                                style={{ width: 100 }}
                                isSelected={item.isSent}
                                onValueChange={() => {
                                    handleCheck(item, !item.isSent);
                                }} />
                        </View>
                    )
                })}

            </ScrollView>
            <HStack spacing={3} style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <View>

                    <CustomButton
                        backgroundColor={screenLocalColor}
                        title="CLOSE" onPress={() => {
                            props.openOrCloseSendClassnoteModal(false)
                        }}
                    />
                </View>
                <View>
                    <CustomButton title="SUBMIT" onPress={() => {
                         props.sendClassNotes(
                            props.teacherClassNoteId,
                            classArray.filter(d => d.isSent == true).map(d => d.classId), 
                              props.openOrCloseSendClassnoteModal) }} />
                </View>
            </HStack>
        </>
    )
}
const styles = StyleSheet.create({
    tableItem: {
        color: 'black',
        alignSelf: 'center'
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10

    },
})

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSharedNoteClasses: (teacherClassNoteId: string) =>
            getSharedNoteClasses(teacherClassNoteId)(dispatch),

        sendClassNotes: (teacherClassNoteId: string, classArray: string[], openOrCloseSendClassnoteModal: any) =>
            sendClassNotes(teacherClassNoteId, classArray, openOrCloseSendClassnoteModal)(dispatch),
    }
}


export default connect(null, mapDispatchToProps)(SendClassnote)