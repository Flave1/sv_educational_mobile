import { Badge, Pressable } from "@react-native-material/core";
import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { actions } from "../../../../store/action-types/app-state-action-types";
import { screens } from "../../../../screen-routes/navigation";

export function HomeAssessmentFeedbackList({ students, openOrCloseModal, dispatch, sessionClass, navigation }: any) {
    function feedbackStatus(item: any) {
        if (item.status == "not started")
            return <Badge color="red" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
        else if (item.status === "submitted")
            return <Badge color="green" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
        else
            return <Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
    }

    

    function handleOnclick(item: any) {
        if (item.status == "not started") {
            dispatch({ type: actions.REQUEST_FAILED, payload: "Student has not yet started feedback" });
            return;
        }
        else if (item.status == "uncompleted") {
            dispatch({ type: actions.REQUEST_FAILED, payload: "Student has not yet completed feedback" });
            return;
        } else {
            navigation.navigate({
                name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.detail.screens.feedback.name,
                params: { 
                    homeAsessmentFeedbackId:  item.homeAsessmentFeedbackId, 
                    sessionClass: { sessionClass } }
            });
            openOrCloseModal(false);
            
        }

    }
    return (
        <>
            <ScrollView horizontal={true}>
                <View>
                    <View style={[styles.tableHeader]}>
                        <Text style={[styles.headerItem, { width: 250 }]}>Name</Text>
                        <Text style={[styles.headerItem, { width: 100 }]}>Status</Text>
                        <Text style={[styles.headerItem, { width: 50 }]}>Score</Text>
                    </View>
                    <FlatList
                        data={students}
                        keyExtractor={item => item.studentName}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => {
                                    handleOnclick(item)
                                }}
                                style={[styles.tableRow]}>
                                <Text style={[styles.tableItem, { width: 250 }]}>{item.studentName}</Text>
                                <Text style={[styles.tableItem, { width: 100 }]}>{feedbackStatus(item)}</Text>
                                <Text style={[styles.tableItem, { width: 50 }]}>{item.score}</Text>
                            </Pressable>
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