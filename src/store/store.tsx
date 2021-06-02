import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import settings from '../store/reducers/settings';
import {PersistConfig} from '../constants/helpers';
import auth from './reducers/auth';

const authConfig: any = new PersistConfig('auth', 'userData', 'isLogin');
const settingsConfig: any = new PersistConfig('settingsConfig', 'onboarding');

const rootReducer = combineReducers({
  settings: persistReducer(settingsConfig, settings),
  auth: persistReducer(authConfig, auth),
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
