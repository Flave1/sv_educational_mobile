import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import * as DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CustomFileInput = ({ label, onSelect,type }:any) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleFileSelect = async () => {
//     try {
//       const result:any = await DocumentPicker.pick({
//         type:type, // set the file type you want to allow here
       
//       });

//       if (result.type === 'success') {
//         setSelectedFile(result);
//         onSelect(result);
//       }
//     } catch (error) {
//       console.log(error);
//     }
};

  return (
    <View>
      {selectedFile ? (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="file" size={24} color="#000" />
          <Text style={{ marginLeft: 8 }}>{selectedFile.name}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleFileSelect}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="file-upload" size={24} color="#000" />
            <Text style={{ marginLeft: 8 }}>{label}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomFileInput;
