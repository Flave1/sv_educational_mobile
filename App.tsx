import React, { useEffect } from 'react';
import SplashScreen from "react-native-splash-screen";
import Entry from './screens/entry';
import { useDispatch, useSelector } from 'react-redux';
import AppToast from './screens/components/layouts/SnackBar';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './screen-routes/RootNavigation';
import { persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react'
import FlexendSpinner from './screens/components/layouts/spinner/flex-end-spinner';


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);


  return (
    <>

      <NavigationContainer ref={navigationRef}>
        <PersistGate loading={null} persistor={persistor}>
          <AppToast state={state} dispatch={dispatch} />
          <Entry dispatch={dispatch} state={state} />
        </PersistGate>
      </NavigationContainer>
      <FlexendSpinner state={state} dispatch={dispatch} />
    </>
  );
};

export default App;




/*{ <SafeAreaView style={backgroundStyle}>
      
       <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
 
          
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section> 
 
 
        </View>
      </ScrollView> 
    </SafeAreaView>}*/
