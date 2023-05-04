import { useEffect } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { displayFullScreen } from "../../store/actions/app-state-actions";

function ReadClassnote(props: any) {
    useEffect(() => {
        props.displayFullScreen(true);
        console.log('props', props);

    }, [])
    return (
        <View>
            <Text>Up and running</Text>
        </View>
    )
}

function mapStateToProps(state: any) {
    return { fullScreen: state.appState.fullScreen ?? false }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        displayFullScreen: (display: boolean) => dispatch(displayFullScreen(display))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReadClassnote);
// export default ReadClassnote;