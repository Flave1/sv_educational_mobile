import { StyleSheet, View } from "react-native";
import { AppButtonColorDark, AppLightBlue } from "../../tools/color";

export function FloatingButton({ children }: any) {
    return (
        <View style={styles.addButtonContainer} >
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    addButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '85%',
        left: '83%',
        width: 60,
        height: 60,
        zIndex: -1,
        backgroundColor: AppLightBlue,
        borderRadius: 25,
        // borderColor: AppLightBlue,
        // borderWidth:4
    },

});