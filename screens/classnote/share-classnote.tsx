import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { getAllOtherStaff, getSharedNoteClasses, sendClassNotes, shareClassNotesToStaff } from "../../store/actions/classnote-actions";
import { HStack, Stack } from "@react-native-material/core";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScreenTitle from "../layouts/screen-title";
import CustomButton from "../layouts/CustomButton";
import { CustomCheckBox } from "../layouts/checkbox-component";

function ShareClassnote(props: any) {
    const [staffArray, setStaffArray] = useState<any>([]);
    const screenLocalColor = "#868C8E";
    
    useEffect(() => {
        props.classNoteId &&
        props.getAllOtherStaff(props.classNoteId);
      }, [props.classNoteId]);

      useEffect(() => {
        props.shareClassnoteModal &&
          setStaffArray(props.otherStaffList?.filter((c:any) => c.isShared === true).map((c:any) => c.teacherAccountId));
      }, [props.otherStaffList]);
    
      useEffect(() => {
        if (props.shareClassnoteModal == false) {
          setStaffArray([])
        }
      }, [props.shareClassnoteModal]);

      const handleCheck = (item: any, isSelected: Boolean) => {
        const classArrayValues = staffArray.filter((obj: any) => obj !== item.teacherAccountId );

        if (isSelected === false) {
            return [...classArrayValues];
        } else {
            return [...classArrayValues,item.teacherAccountId];
        }
    }

    return (
        <>
           <Stack style={{ flex: 0 }}>
                        <HStack style={{ alignItems: 'center'}}>
                            <ScreenTitle icon={<MaterialIcons name="note" color="white" size={20} />} title={'Staff List'} />
                        </HStack>
                    </Stack>
            <ScrollView style={{ padding: 5 }}>
            {props.otherStaffList?.map((staff: any, idx: number) => {
                                return (
                                    <View key={idx} style={{padding:10,display:"flex",flexDirection:'row'}}>
                                        <Text style={[styles.tableItem, { width: 250 }]}> {staff.firstName} {staff.middleName} {staff.lastName}</Text>
                                        <CustomCheckBox
                                            style={{ width: 200 }}
                                            isSelected={staffArray?.find((s:any)=>s === staff.teacherAccountId)? true : false}
                                            onValueChange={() => {
                                                     const classArrayValues= handleCheck(staff, !staff.isShared)
                                                     setStaffArray(classArrayValues);
                                            }}  />
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
                                <CustomButton title="SUBMIT" onPress={()=>{ props.shareClassNotesToStaff(props.classNoteId, staffArray, props.openOrCloseShareClassNoteModal)}} />
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
        otherStaffList: state.classnotesState.otherStaffList
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getAllOtherStaff: (classNoteId: string) => getAllOtherStaff(classNoteId)(dispatch),
        shareClassNotesToStaff: (classNoteId:string, staffArray:string[], openOrCloseShareClassNoteModal:any) =>  shareClassNotesToStaff(classNoteId, staffArray, openOrCloseShareClassNoteModal)(dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShareClassnote);