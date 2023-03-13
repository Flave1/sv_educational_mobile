import { Box, HStack, Text } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { string } from "yup";
import { AppDark } from "../../../tools/color";

export function AttachmentList({ attachments, openOrCloseStudentAttachmentModal }: any) {

    class AttachedFiles {
        name: string = '';
        extension: string = '';
        path: string = '';
    }

    const [files, setFiles] = useState<AttachedFiles[]>(new Array<AttachedFiles>());
    console.log('attachments', files);
    useEffect(() => {

        for (let i = 0; i < attachments.length; i++) {
            const ele = attachments[i];
            const splitedString = ele.split('.');
            const file = {
                name: splitedString[2].substring(splitedString[2].length - 6) + "." + splitedString[3],
                extension: splitedString[3],
                path: ele
            }
            setFiles([...files, file]);
        }
    }, [attachments])

    const word = <MaterialCommunityIcons name="file-word" color="blue" size={150} />;
    const excel = <MaterialCommunityIcons name="microsoft-excel" color="green" size={150} />;
    const pdf = <FontAwesome5 name="file-pdf" color="red" size={150} />;
    const txt = <Feather name="file-text" color="black" size={150} />;
    const img = <Entypo name="image" color="black" size={150} />;
    const zip = <FontAwesome name="file-zip-o" color="yellow" size={150} />;

    const fileComponent = (file: AttachedFiles, idx: number) => {

        if (file.extension === "jpeg")
            return <Files key={idx} icon={img} text={file.name} />
        else if (file.extension === "png")
            return <Files key={idx} icon={img} text={file.name} />
        else if (file.extension === "xlsx" || file.extension === "xls")
            return <Files key={idx} icon={excel} text={file.name} />
        else if (file.extension === "pdf")
            return <Files key={idx} icon={pdf} text={file.name} />
        else if (file.extension === "txt")
            return <Files key={idx} icon={txt} text={file.name} />
        else if (file.extension === "docx" || file.extension === "doc")
            return <Files key={idx} icon={word} text={file.name} />
        else if (file.extension === "zip")
            return <Files key={idx} icon={zip} text={file.name} />
    }
    return (
        <>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center' }}>
                <HStack style={{ justifyContent: 'flex-end', paddingEnd: 30 }} onTouchStart={() => openOrCloseStudentAttachmentModal(false)}>
                    <FontAwesome name="close" color={AppDark} size={20} />
                </HStack>
                <HStack style={[{ flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }]}>
                    {files.map((item: AttachedFiles, idx: number) => fileComponent(item, idx))}
                </HStack>
            </ScrollView>
        </>
    )
}


function Files({ icon, onPress, text }: any) {
    return (
        <Pressable onPress={onPress} >
            <Box w={150} h={180} m={10} style={[{ alignItems: 'center' }]}>
                <Box w={150} h={150} radius={100} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </Box>
                <Box style={{ width: '100%', alignItems: 'center' }}>
                    <Text textBreakStrategy="balanced" style={{ fontWeight: 'bold', fontSize: 20, color: 'blue', textDecorationColor: 'blue', textDecorationLine: 'underline', textDecorationStyle: 'solid' }}>{text}</Text>
                </Box>

            </Box>
        </Pressable>
    )
}


const style = StyleSheet.create({
    border: {
        borderColor: 'red',
        borderWidth: 1
    }
})