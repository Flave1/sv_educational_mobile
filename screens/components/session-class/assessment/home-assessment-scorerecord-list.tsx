import { Badge } from "@react-native-material/core";
import React, { useState } from "react";
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { includeClassToScoreRecord } from "../../../../store/actions/assessment-actions";
import { AppPurple } from "../../../../tools/color";
import CustomCheckBox from "../../layouts/checkbox-component";

export function HomeAssessmentScoreRecordList({ students, homeAssessmentId, dispatch, openOrCloseModal }: any) {

    function recordStatus(item: any) {
        if (item.status == "not started")
            return <Badge color="red" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
        else if (item.status === "submitted")
            return <Badge color="green" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
        else
            return <Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
    }

    const [isChecked, setIsChecked] = useState<boolean>(students.find((c: any) => c.included === true) != null);
    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const showDialog = () => {
        Alert.alert(
            'Include Assessment',
            !isChecked ? 'Are you sure you want to Include this assessment into score entry?' : 'Are you sure you want to exclude this assessment from score entry?',
            [
                {
                    text: 'CANCEL',
                    onPress: () => { '' },
                },
                {
                    text: 'YES',
                    onPress: () => {
                        includeClassToScoreRecord(homeAssessmentId, !isChecked, openOrCloseModal, handleCheck)(dispatch)
                    },
                },
            ],
            { cancelable: false }
        );
    };


    return (
        <>
            <View style={{ width: '100%', backgroundColor: AppPurple }}>
                <CustomCheckBox
                    text="Include scores into score entry"
                    isSelected={isChecked}
                    onValueChange={() => {
                        showDialog()
                    }}
                />
            </View>

            <ScrollView horizontal={true}>
                <View>
                    <View style={[styles.tableHeader]}>
                        <Text style={[styles.headerItem, { width: 200 }]}>Name</Text>
                        <Text style={[styles.headerItem, { width: 100 }]}>Status</Text>
                        <Text style={[styles.headerItem, { width: 50 }]}>Score</Text>
                        <Text style={[styles.headerItem, { width: 100 }]}>Included</Text>
                    </View>
                    <FlatList
                        data={students}
                        keyExtractor={item => item.studentName}
                        renderItem={({ item }) => (
                            <View style={[styles.tableRow]}>
                                <Text style={[styles.tableItem, { width: 200 }]}>{item.studentName}</Text>
                                <Text style={[styles.tableItem, { width: 100 }]}>{recordStatus(item)}</Text>
                                <Text style={[styles.tableItem, { width: 50 }]}>{item.score}</Text>
                                <Text style={[styles.tableItem, { width: 100 }]}>{item.included.toString()}</Text>
                            </View>
                        )}
                    />
                </View>
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