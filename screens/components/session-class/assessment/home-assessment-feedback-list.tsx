import { Badge, HStack, Stack } from "@react-native-material/core";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { screens } from "../../../../screen-routes/navigation";
import CustomText from "../../layouts/CustomText";

export function HomeAssessmentFeedbackList({ students, openOrCloseModal, navigation, sessionClass }: any) {
    function feedbackStatus(item: any) {
        if (item.status == "not started")
            return <Badge color="red" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
        else if (item.status === "submitted")
            return <Badge color="green" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
        else
            return <Badge color="blue" labelStyle={{ color: 'white', fontWeight: 'bold' }} label={item.status} />
    }
    return (
        <>
            <ScrollView>
                <Stack style={{ padding: 5 }}>
                    <HStack spacing={5}>
                        <Stack style={[{ flex: 5 }]}><Text style={style.label}>Student Name</Text></Stack>
                        <Stack style={{ flex: 3 }}><Text style={style.label}>Status</Text></Stack>
                        <Stack style={{ flex: 1 }}><Text style={style.label}>Score</Text></Stack>
                        <Stack style={{ flex: 1 }}><Text style={style.label}></Text></Stack>
                    </HStack>
                    {
                        students.map((item: any, idx: any) => {
                            return (
                                <HStack overflow="scroll" style={{ overflow: 'scroll', marginTop: 10 }} key={idx}>
                                    <Stack style={[{ width: '50%' }]}>
                                        <Text style={style.text}>{item.studentName}</Text>
                                    </Stack>
                                    <Stack style={{ width: '30%' }}>
                                        <CustomText
                                            style={style.text}
                                            title={feedbackStatus(item)} />
                                    </Stack>
                                    <Stack style={{ width: '10%' }}>
                                        <Text style={style.text}>{item.score}</Text>
                                    </Stack>
                                    <Stack style={[{ width: '10%', display: item.status == "submitted" ? 'flex' : 'none' }]}
                                        onTouchStart={() => {
                                            openOrCloseModal(false)
                                            navigation.navigate({
                                                name: screens.scenes.mainapp.scenes.tutor.screens.sessionClass.screen.assessment.screen.detail.screens.feedback.name,
                                                params: {
                                                    sessionClass: sessionClass,
                                                    homeAsessmentFeedbackId: item.homeAsessmentFeedbackId
                                                }
                                            })
                                        }}>
                                        <Text style={[style.text, style.badge]}>open</Text>
                                    </Stack>
                                </HStack>
                            )
                        })
                    }
                </Stack>
            </ScrollView>
        </>
    )
}

const style = StyleSheet.create({
    label: {
        color: 'grey', fontWeight: 'bold'
    },
    border: {
        borderColor: 'red',
        borderWidth: 1
    },
    text: { textTransform: 'capitalize', fontWeight: 'bold', flexWrap: 'wrap', color: 'black', borderRadius: 10 },
    badge: { backgroundColor: '#139C85', color: 'white', borderRadius: 50, textAlign: 'center' }
})