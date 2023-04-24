import { appStateReducer } from './reducers/app-state-reducer'
import { authReducer } from './reducers/auth-reducer'
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { createStore, combineReducers } from 'redux';
import { dasboardReducer } from './reducers/dashboard-reducer';
import { announcementReducer } from './reducers/announcement-reducer';
import { classPropertiesReducer } from './reducers/class-properties-reducer';
import { assessmentReducer } from './reducers/assessment-reducer';
import { attendanceReducer } from './reducers/attendance-reducer';

const rootReducer = combineReducers({
    appState: appStateReducer,
    authState: authReducer,
    dasboardState: dasboardReducer,
    announcementState: announcementReducer,
    classPropsState: classPropertiesReducer,
    assessmentState: assessmentReducer,
    attendanceState: attendanceReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

