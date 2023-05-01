import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {persistor, store} from './store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const ReduxProvider = () => {
  // BackgroundTaskPackage.useContext(this);

  // BackgroundTask.define(() => {

  //     // const attendanceTaskService = require('./services/attendanceTaskService');
  //     // attendanceTaskService.synchronizeAttendance();
  // });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ReduxProvider);
AppRegistry.registerHeadlessTask('attendanceTaskService', () =>
  require('./services/attendanceTaskService'),
);
