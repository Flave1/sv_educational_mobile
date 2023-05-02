import { Pressable, StyleSheet, View } from "react-native";
import { AppButtonColorDark, AppLightBlue, AppPurple } from "../../tools/color";
import CustomText from "../layouts/CustomText";
import { Stack, HStack, Text } from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function ClassnotesBox(props: any) {
    return (
        <Pressable
            onPress={props.onPress}
            key={props.idx} style={styles.pressable}>
            <HStack style={styles.badgebar}>
                <View style={styles.shortdate}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>{props.item.dateCreated}</Text>
                </View>
                <View style={styles.ellipsis}>
                    <FontAwesome5 style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }} name="ellipsis-h" size={25} />
                </View>
            </HStack>
            <Stack style={{ borderRadius: 12 }}>
                <Text
                    style={styles.title}
                    >{props.item.authorName}</Text>
                <Text
                    style={styles.shortDescription}
                    >{props.item.noteTitle}</Text>
                <View style={styles.divider}></View>
                <HStack style={styles.taskbar}>
                    <Text style={styles.taskbarItem}>{props.item.approvalStatusName}</Text>
                    <Text style={[styles.taskbarItem, {color:'#EBF1EE'} ]}>{props.item.subjectName}</Text>
                </HStack>
            </Stack>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        width: 330,
        height: 150,
        borderColor: AppLightBlue,
        borderWidth: 1,
        backgroundColor: AppButtonColorDark,
        borderRadius: 20,
        margin: 7,
        padding: 5,
    },
    badgebar: {
        justifyContent: 'space-between',
        padding: 5,
        height: 30,
        alignItems: 'center',
        marginBottom: 5
    },
    shortdate: {
        backgroundColor: AppLightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        width: 120
    },
    ellipsis: {
        backgroundColor: AppLightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        width: 30
    },
    title: {
        color: '#EBF1EE',
        fontSize: 11,
        paddingHorizontal: 5
    },
    shortDescription: {
        fontWeight: 'bold',
        color: '#EBF1EE',
        fontSize: 18,
        paddingHorizontal: 5
    },
    divider: {
        width: '80%',
        height: 2,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    taskbar:{
        justifyContent: 'space-between',
        padding: 5,
        height: 30,
    },
    date: {
        color: '#EBF1EE',
        alignSelf: 'flex-end',
        fontStyle: 'italic',
        fontSize: 13,
        fontWeight: 'bold'
    },
    taskbarItem:{
        fontWeight: 'bold',
        color: AppLightBlue,
        fontSize: 13,
        paddingHorizontal: 5
    }
})

export default ClassnotesBox;