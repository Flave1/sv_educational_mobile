import React, { useRef, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import Page from './Page';
import { AppDark, AppLight } from '../../tools/color';
import { screens } from '../../screen-routes/navigation';
import Footer from '../layouts/Footer';

import GlobalStyles from '../layouts/GlobalStyle'
import { connect } from 'react-redux';


const Onboarding = (props: any) => {
  React.useEffect(() => {

    if(props.persistedUser){
      if (props?.persistedUser?.doneWithOnBoarding == true) {
        props.navigation.navigate(screens.scenes.auth.screens.signin.name)
      }
    }
  }, [props.onboardedUser])


  const pagerRef: any = useRef(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [LastPageRefNumber] = useState(3);

  const handlePageChange = (pageNumber: any) => {
    if (pageNumber > LastPageRefNumber) {
      pagerRef.current.setPage(pageNumber);
    } else {
      pagerRef.current.setPage(pageNumber);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? AppDark : AppDark,
  };
  return (
    <View style={[GlobalStyles.darkTheme, { flex: 1 }]}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor={backgroundStyle.backgroundColor}
            iconName="cpu"
            title="Welcome to school pro, as you take the next step of your 
            educational career by stepping into high school."
          />
          <Footer
            backgroundColor={backgroundStyle.backgroundColor}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              setPageNumber(pageNumber + 1)
              handlePageChange(pageNumber + 1);
            }}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor={backgroundStyle.backgroundColor}
            iconName="activity"
            title="A sought after tools and features in a School Management 
            Software; with capacity of handling all school activities"
          />
          <Footer
            backgroundColor={backgroundStyle.backgroundColor}
            rightButtonLabel="Next"
            rightButtonPress={() => {
              setPageNumber(pageNumber + 1)
              handlePageChange(pageNumber + 1);
            }}
            leftButtonLabel="Back"
            leftButtonPress={() => {
              setPageNumber(pageNumber - 1)
              handlePageChange(pageNumber - 1);
            }}
          />
        </View>

        <View key="3">
          <Page
            backgroundColor={backgroundStyle.backgroundColor}
            iconName="airplay"
            title="Get updates on weather"
          />
          <Footer
            backgroundColor={backgroundStyle.backgroundColor}
            leftButtonLabel="Back"
            leftButtonPress={() => {
              setPageNumber(pageNumber - 1)
              handlePageChange(pageNumber - 1);
            }}
            rightButtonLabel="Get Started"
            rightButtonPress={() => {
              props.navigation.navigate(screens.scenes.onBoarding.screens.setup.name);
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
      onboardedUser: state.appState
  }
}


export default connect(mapStateToProps, null)(Onboarding);