import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getSharedNoteClasses, sendClassNotes } from "../../store/actions/classnote-actions";
import { HStack, Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScreenTitle from "../layouts/screen-title";
import CustomButton from "../layouts/CustomButton";
import { CustomCheckBox } from "../layouts/checkbox-component";

function SendClassnote(props: any) {
    const [classArray, setClassArray] = useState<any>([]);
    const screenLocalColor = "#868C8E";

    useEffect(() => {
        props.getSharedNoteClasses(props.teacherClassNoteId);
    }, [props.teacherClassNoteId]);

    useEffect(() => {
        props.sendClassnoteModal &&
            setClassArray(props.staffClasses?.filter((c: any) => c.isSent === true).map((c: any) => c.classId));
    }, [props.staffClasses]);

    useEffect(() => {
        if (props.sendClassnoteModal == false) {
            setClassArray([])
        }
    }, [props.sendClassnoteModal]);


    const handleCheck = (item: any, isSelected: Boolean) => {
        const classArrayValues = classArray.filter((obj: any) => obj !== item.classId);

        if (isSelected === false) {
            return [...classArrayValues];
        } else {
            return [...classArrayValues, item.classId];
        }
    }


    return (
        <>
            <Stack style={{ flex: 0 }}>
                <HStack style={{ alignItems: 'center' }}>
                    <ScreenTitle icon={<MaterialIcons name="note" color="white" size={20} />} title={'Class List'} />
                </HStack>
            </Stack>
            <ScrollView style={{ padding: 5 }}>
                {props.staffClasses?.map((item: any, idx: number) => {
                    return (
                        <View key={idx} style={{ padding: 10, display: "flex", flexDirection: 'row' }}>
                            <Text style={[styles.tableItem, { width: 200 }]}>{item.sessionClass}</Text>
                            <CustomCheckBox
                                style={{ width: 200 }}
                                isSelected={classArray?.find((i: any) => i === item.classId) ? true : false}
                                onValueChange={() => {
                                    const classArrayValues = handleCheck(item, !item.isSent)
                                    setClassArray(classArrayValues);
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
                    <CustomButton title="SUBMIT" onPress={() => { props.sendClassNotes(props.teacherClassNoteId, classArray, props.openOrCloseSendClassnoteModal) }} />
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
})
function mapStateToProps(state: any) {
    return {
        staffClasses: state.classnotesState.staffClasses
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSharedNoteClasses: (teacherClassNoteId: string) =>
            getSharedNoteClasses(teacherClassNoteId)(dispatch),

        sendClassNotes: (teacherClassNoteId: string, classArray: string[], openOrCloseSendClassnoteModal: any) =>
            sendClassNotes(teacherClassNoteId, classArray, openOrCloseSendClassnoteModal)(dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SendClassnote)