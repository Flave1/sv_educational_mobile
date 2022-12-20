import { FunctionComponent } from "react";
import { Text, TextStyle, useColorScheme } from "react-native";

const App_Text: FunctionComponent<Text> = (props: any) => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        // <Text style={[isDarkMode ? GlobalStyles.lightText : GlobalStyles.darkText, {...passedStyles}]}>
        //     {children}
        // </Text>
        <Text style={[props.style]}>
            {props.children}
        </Text>
    )
}

export default App_Text;