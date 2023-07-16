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
            iconName="clock"
            title="We seek to revolutionize the way school, college and university administrations manage their operations"
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
            iconName="video"
            title="Platform for conducting virtual meetings and classes, presentations, or discussions"
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
            iconName="frown"
            title="Child gadget monitor monitor to manage children use of electronic devices to promote responsible and safe technology usage"
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