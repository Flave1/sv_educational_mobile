import { Button, Stack, Text } from "@react-native-material/core";
import { useState } from "react";
import { Platform, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import RNDateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";


export default function DateTime() {
    const [date, setDate] = useState(new Date());
    // const [mode, setMode] = useState('date');
    // const [show, setShow] = useState(false);
    // const [text, setText] = useState('Empty');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };

    // console.log('date', Platform.OS === 'android');
    console.log('isDatePickerVisible', isDatePickerVisible);

    // const onChange = (event: any, selectedDate: any) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'android');
    //     setDate(currentDate);

    //     let tempDate = new Date(currentDate);
    //     let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    //     let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    //     setText(fDate + '\n' + fTime);
    //     console.log(fDate + '\n' + fTime);
    // }
    // const showMode = (currentMode: any) => {
    //     setShow(true);
    //     setMode(currentMode);
    // }

    return (
        <Stack>
            {/* <Text style={{ color: 'white' }}>{text}</Text>
            <View style={{ width: 100 }}>
                <Button title={'date'} onPress={() => showMode('date')} />
                <Button title={'time'} onPress={() => showMode('time')} />
            </View> */}


            <View style={{ width: 300, height: 300 }}>
                <Button title="Show Date Picker" onPress={showDatePicker} />
                <DateTimePicker
                    // textColor="red"
                    // isVisible={true}
                    // mode="time"
                    // onConfirm={handleConfirm}
                    // onCancel={hideDatePicker}
                    style={{ borderColor: 'red', borderWidth: 1, height: 200, width: 200 }}
                        textColor={'red'}

                        
                        testID={'dateTimePicker'}
                        value={date}
                        mode={'date'}
                        is24Hour={true}
                        display={'default'}
                />
            </View>
        </Stack>
    )
}