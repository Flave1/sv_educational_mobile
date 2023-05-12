import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getAllOtherStaff, shareClassNotesToStaff } from "../../store/actions/classnote-actions";
import { HStack, Stack } from "@react-native-material/core";
import CustomButton from "../layouts/CustomButton";
import { CustomCheckBox } from "../layouts/checkbox-component";
import { Teacher } from "../../models/class-properties/Tutor-class";

function ShareClassnote(props: any) {
    const [staffArray, setStaffArray] = useState<Teacher[]>([]);
    const screenLocalColor = "#868C8E";

    useEffect(() => {
        props.classNoteId &&
            props.getAllOtherStaff(props.classNoteId).then((result: Teacher[]) => {
                setStaffArray(result);
            });
    }, [props.classNoteId]);


    const handleCheck = (item: Teacher, isSelected: Boolean) => {
        const updatedStaffArray = staffArray.map((obj: any) => {
            if (obj.teacherAccountId === item.teacherAccountId) {
                return { ...obj, isShared: isSelected };
            }
            return obj;
        });
        setStaffArray(updatedStaffArray);
    }
    return (
        <>
            <Stack style={{ flex: 0 }}>
                <HStack style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold', paddingHorizontal: 10 }}>Share class to : </Text>
                </HStack>
            </Stack>
            <ScrollView style={{ padding: 5 }}>
                {staffArray?.map((staff: Teacher, idx: number) => {
                    return (
                        <View key={idx} style={[styles.tableRow]}>
                            <Text style={[styles.tableItem, { width: 300 }]}> {staff.firstName} {staff.middleName} {staff.lastName}</Text>
                            <CustomCheckBox
                                style={{ width: 100 }}
                                isSelected={staff.isShared}
                                onValueChange={() => {
                                    handleCheck(staff, !staff.isShared);
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
                            props.openOrCloseShareClassNoteModal(false)
                        }}
                    />
                </View>
                <View>
                    <CustomButton
                        title="SUBMIT"
                        onPress={() => {
                            props.shareClassNotesToStaff(props.classNoteId, staffArray.filter(d => d.isShared == true).map(d => d.teacherAccountId), props.openOrCloseShareClassNoteModal)
                        }}

                    />
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
        getAllOtherStaff: (classNoteId: string) => getAllOtherStaff(classNoteId)(dispatch),

        shareClassNotesToStaff: (classNoteId: string, staffArray: string[], openOrCloseShareClassNoteModal: any) =>
            shareClassNotesToStaff(classNoteId, staffArray, openOrCloseShareClassNoteModal)(dispatch),
    }
}


export default connect(null, mapDispatchToProps)(ShareClassnote);