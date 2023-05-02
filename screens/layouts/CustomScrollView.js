import { ScrollView, StyleSheet } from "react-native";
import { Stack } from "@react-native-material/core";
import { useRef, useState, useEffect } from "react";
import { AppButtonColorDark } from "../../tools/color";

function CustomScrollview({ children, totalPages, pageNumber, getAction, params }) {
    const scrollViewRef = useRef(null);
    const [isEndReached, setIsEndReached] = useState(false);

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height;
        setIsEndReached(isEnd);
    };

    const handleContentSizeChange = (width, height) => {
        const scrollViewHeight = scrollViewRef.current?.getHeight;
        setIsEndReached(height - scrollViewHeight <= 0);
    };

    useEffect(() => {
        if (isEndReached === true && pageNumber !== totalPages) {
            params.pageNumber = pageNumber + 1;
            getAction(params)
        }
    }, [isEndReached])

    return (
        <ScrollView
            ref={scrollViewRef}
            onScroll={handleScroll}
            onContentSizeChange={handleContentSizeChange}
            style={styles.container}>
            <Stack spacing={10} style={{ flex: 1 }} >
                {children}
            </Stack>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: AppButtonColorDark,
        borderRadius: 10,
        flex: 1,
        padding: 5,
        paddingTop: 10,
        borderBottomWidth: 0,
        borderTopWidth: 0
    }
})

export default CustomScrollview;