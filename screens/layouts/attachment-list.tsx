import { Box, HStack, Text } from "@react-native-material/core";
import { useEffect, useState } from "react";
import { Linking, Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function AttachmentList({ attachments }: any) {

    class AttachedFiles {
        name: string = '';
        extension: string = '';
        path: string = '';
    }

    const [files, setFiles] = useState<any>([]);

    useEffect(() => {

        for (let i = 0; i < attachments.length; i++) {
            const ele = attachments[i];
            const splitedString = ele.split('.');
            const file = {
                name: splitedString[2].substring(splitedString[2].length - 6) + "." + splitedString[3],
                extension: splitedString[3],
                path: ele
            }
            files.push(file);
            setFiles([...files]);
        }
    }, [attachments])

    const word = <MaterialCommunityIcons name="file-word" color="blue" size={150} />;
    const excel = <MaterialCommunityIcons name="microsoft-excel" color="green" size={150} />;
    const pdf = <FontAwesome5 name="file-pdf" color="red" size={150} />;
    const txt = <Feather name="file-text" color="black" size={150} />;
    const img = <Entypo name="image" color="black" size={150} />;
    const zip = <FontAwesome name="file-zip-o" color="yellow" size={150} />;

    function openFile(url: string) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                //something else
            }
        });
    }
    const fileComponent = (file: AttachedFiles, idx: number) => {

        if (file.extension === "jpeg" || file.extension === "jpg")
            return <Files key={idx} icon={img} text={file.name} path={file.path} openFile={openFile}/>
        else if (file.extension === "png")
            return <Files key={idx} icon={img} text={file.name} path={file.path} openFile={openFile}/>
        else if (file.extension === "xlsx" || file.extension === "xls")
            return <Files key={idx} icon={excel} text={file.name} path={file.path} openFile={openFile}/>
        else if (file.extension === "pdf")
            return <Files key={idx} icon={pdf} text={file.name} path={file.path} openFile={openFile}/>
        else if (file.extension === "txt")
            return <Files key={idx} icon={txt} text={file.name} path={file.path} openFile={openFile}/>
        else if (file.extension === "docx" || file.extension === "doc")
            return <Files key={idx} icon={word} text={file.name} path={file.path} openFile={openFile} />
        else if (file.extension === "zip")
            return <Files key={idx} icon={zip} text={file.name} path={file.path} openFile={openFile} />
    }



    return (
        <>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center' }}>
               
                <HStack style={[{ flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }]}>
                    {files.map((item: AttachedFiles, idx: number) => fileComponent(item, idx))}
                </HStack>
            </ScrollView>
        </>
    )
}


function Files({ icon, onPress, text, path, openFile }: any) {
    return (
        <Pressable onPress={onPress} >
            <Box w={150} h={180} m={10} style={[{ alignItems: 'center' }]}>
                <Box w={150} h={150} radius={100} style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {icon}
                </Box>
                <Box style={{ width: '100%', alignItems: 'center' }}>
                    <Pressable onPress={() => openFile(path)}>
                        <Text textBreakStrategy="balanced" style={style.name}>{text}</Text>
                    </Pressable>
                </Box>
            </Box>
        </Pressable>
    )
}


const style = StyleSheet.create({
    border: {
        borderColor: 'red',
        borderWidth: 1
    },
    name: { fontWeight: 'bold', fontSize: 20, color: 'blue', textDecorationColor: 'blue', textDecorationLine: 'underline', textDecorationStyle: 'solid' }
})