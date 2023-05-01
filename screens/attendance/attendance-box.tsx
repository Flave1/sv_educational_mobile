import { Pressable, StyleSheet, View } from "react-native";
import { AppButtonColorDark, AppLightBlue, AppPurple } from "../../tools/color";
import CustomText from "../layouts/CustomText";
import { Stack, HStack, Text } from "@react-native-material/core";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

function AttendanceBox(props: any) {
    return (
        <Pressable
            onPress={props.onPress}
            key={props.idx} style={styles.pressable}>
            <Stack style={{ borderRadius: 12 }}>
                <CustomText
                    color={AppPurple}
                    style={styles.title}
                    title={props.item?.classRegisterLabel} />
                <View style={styles.divider}></View>
                <HStack spacing={10} style={{ marginTop: 5 }}>
                    <HStack spacing={1}>
                        <CustomText
                            title={<FontAwesome5 size={15} name="user-check" color={'white'} />} />
                        <CustomText
                            style={{ fontSize: 15 }}
                            title={props.item?.totalStudentPresent} />
                    </HStack>
                    <HStack spacing={1}>
                        <CustomText
                            title={<FontAwesome5 size={15} name="user-alt-slash" color={'white'} />} />
                        <CustomText
                            style={{ fontSize: 15 }}
                            title={props.item?.totalStudentAbsent}
                        />
                    </HStack>
                    <HStack spacing={1}>
                        <CustomText
                            title={<FontAwesome5 size={15} name="users" color={'white'} />} />
                        <CustomText
                            style={{ fontSize: 15 }}
                            title={props.totalStudents}
                        />
                    </HStack>
                </HStack>
                <Stack>
                    <Text style={styles.date}>{props.item?.dateTime}</Text>
                </Stack>
            </Stack>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pressable: {
        width: 150,
        height: 90,
        // borderColor: AppLightBlue,
        borderWidth: 1,
        backgroundColor: AppButtonColorDark,
        borderRadius: 10,
        margin: 7,
        padding: 5,
        borderLeftColor: AppLightBlue,
        borderLeftWidth: 6
    },
    title: {
        fontWeight: 'bold',
        color: AppPurple,
        fontSize: 12
    },
    divider: {
        width: '80%',
        height: 2,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    date: {
        color: AppLightBlue,
        alignSelf: 'flex-end',
        fontStyle: 'italic',
        fontSize: 13,
        fontWeight: 'bold'
    }
})

export default AttendanceBox;