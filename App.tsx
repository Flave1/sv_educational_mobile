import React, { useEffect } from 'react';
import SplashScreen from "react-native-splash-screen";
import Entry from './screens/entry';
import { useDispatch, useSelector } from 'react-redux';
import AppToast from './screens/components/layouts/SnackBar';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './screen-routes/RootNavigation';
import FlexendSpinner from './screens/components/layouts/spinner/flex-end-spinner';
// import SyncAdapter from 'react-native-sync-adapter'

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state);


  return (
    <>

      <NavigationContainer ref={navigationRef}>
        <AppToast state={state} dispatch={dispatch} />
        <Entry dispatch={dispatch} state={state} />
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
