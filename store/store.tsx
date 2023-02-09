import { appStateReducer } from './reducers/app-state-reducer'
import { authReducer } from './reducers/auth-reducer'
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { dasboardReducer } from './reducers/dashboard-reducer';
import { announcementReducer } from './reducers/announcement-reducer';
import { classPropertiesReducer } from './reducers/class-properties-reducer';
import { assessmentReducer } from './reducers/assessment-reducer';
const rootReducer = combineReducers({
    appState: persistReducer(persistConfig, appStateReducer),
    authState: persistReducer(persistConfig, authReducer),
    dasboardState: dasboardReducer,
    announcementState: announcementReducer,
    classPropsState: classPropertiesReducer,
    assessmentState: assessmentReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default store;

