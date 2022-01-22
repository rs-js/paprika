import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {rootReducer, rootEpic} from './';

const epicMiddleware = createEpicMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['pending', 'error', 'exists'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const middleware = [epicMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
}

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware)),
);

let persistor = persistStore(store);

epicMiddleware.run(rootEpic);

export {store, persistor};
