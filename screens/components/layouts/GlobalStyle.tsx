import * as rn from "react-native";
//const isDarkMode = useColorScheme() === 'dark';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default rn.StyleSheet.create({

  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1
  },
  lightTheme : {
    backgroundColor: Colors.lighter,
    color: 'black'
  },
  darkTheme : {
    backgroundColor: Colors.darker,
    color: 'white',
  },
  lightText : {
    color: 'white'
  },
  darkText : {
    color: 'black',
  }
});


