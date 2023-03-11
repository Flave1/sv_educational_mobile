import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, useColorScheme, View } from "react-native";
import { AppDark } from "../../../tools/color";

const BottomUpComponent = ({ children , bottomSheetModalRef, snapPoints}: any) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <BottomSheetModal
                    enableOverDrag={true}
                    enableContentPanningGesture={true}
                    enableDismissOnClose={true}
                    enableHandlePanningGesture={true}
                    enablePanDownToClose={true}
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    style={{ backgroundColor: "#868C8E" }}>
                    <View style={{flex:1}}>
                        {children}
                    </View>
                </BottomSheetModal>
    )
}

const style = StyleSheet.create({
    bottomUpView: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    upView: { width: '100%' },
    bottomView: {
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 10,
    },
    close: {
        margin: 7,
        height: '5%',
    },
    children: {
        height: '95%',
        width: '100%',
        padding: 20
    }
})
export default BottomUpComponent;