import { appStateReducer } from './reducers/app-state-reducer';
import { authReducer } from './reducers/auth-reducer';
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { dasboardReducer } from './reducers/dashboard-reducer';
import { announcementReducer } from './reducers/announcement-reducer';
import { classPropertiesReducer } from './reducers/class-properties-reducer';
import { assessmentReducer } from './reducers/assessment-reducer';
import { attendanceReducer } from './reducers/attendance-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createDebugger from 'remote-redux-devtools';
import thunk from 'redux-thunk';

// const connectRemoteDevTools = (hostname: string, port: number) => {
//     const instance = createDebugger({ hostname, port });
//     return composeWithDevTools(instance);
// }

const rootReducer = combineReducers({
    appState: appStateReducer,
    authState: authReducer,
    dasboardState: dasboardReducer,
    announcementState: announcementReducer,
    classPropsState: classPropertiesReducer,
    assessmentState: assessmentReducer,
    attendanceState: attendanceReducer
})


// const enhancer = connectRemoteDevTools('localhost', 8081);

const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(rootReducer);//applyMiddleware(thunk),
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);