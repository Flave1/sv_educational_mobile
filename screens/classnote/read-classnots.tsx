import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { displayFullScreen } from "../../store/actions/app-state-actions";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import RenderHtml from 'react-native-render-html';
import { ClassService } from "../../services/Class-service";
import { ClassNote } from "../../models/class-properties/Tutor-class";

function ReadClassnote(props: any) {


    useEffect(() => {
        props.displayFullScreen(true);
        return () => {
            props.displayFullScreen(false);
        }
    }, []);
    const [classNote, setClassNote] = useState<ClassNote>(new ClassNote());
    useEffect(() => {
        ClassService.getSingleClassNote(props.teacherClassNoteId, props.classnotes).then(result => {
            setClassNote(result);
        });
    });
    console.log('result', classNote.noteContent);
    return (
        <>
            <View style={{ flexDirection: 'row', position: 'absolute' }}>
                <MaterialCommunityIcons onPress={() => console.log('ok')} name="cellphone-dock" size={30} color={'black'} style={styles.docks} />
                <MaterialCommunityIcons name="dock-right" size={30} color={'black'} style={styles.docks} />
            </View>
            <View style={styles.divider} />
            <ScrollView style={{ padding: 5 }}>
                <Text style={styles.title}>{classNote.noteTitle}</Text>
                <RenderHtml

                    source={{ html: classNote?.noteContent }}
                    contentWidth={200}
                />
            </ScrollView>
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        classnotes: state.classnotesState.classnotes
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        displayFullScreen: (display: boolean) => dispatch(displayFullScreen(display))
    }
}

const styles = StyleSheet.create({
    docks: {
        paddingHorizontal: 10
    },
    divider: {
        backgroundColor: 'grey',
        height: 2,
        width: '90%',
        margin: 20,
        alignSelf: 'center',
    },
    bew: {
        borderColor: 'red', borderWidth: 1
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: 'black',
        alignSelf: 'center'
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(ReadClassnote);