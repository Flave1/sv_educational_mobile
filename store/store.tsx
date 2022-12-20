import { appStateReducer } from './reducers/app-state-reducer'
import { authReducer } from './reducers/auth-reducer'
import { persistStore, persistReducer } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
    appState: persistReducer(persistConfig, appStateReducer),
    authState: persistReducer(persistConfig, authReducer)
})

const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default store;

