import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from 'redux-persist/lib/storage' 

export const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // whitelist: [
    //   'appState', 
    //   'authState', 
    //   'dasboardState', 
    //   'announcementState', 
    //   'classPropsState', 
    //   'assessmentState'
    // ]
  };