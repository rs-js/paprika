import {createStore, applyMiddleware, compose, Store} from 'redux';
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

const middleware = [epicMiddleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middleware.push(createDebugger());
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware)),
);

// if (__DEV__) {
//   const reselectDebugger = require('reselect-debugger-flipper');
//   reselectDebugger.configure({
//     selectors,
//     stateGetter: store.getState,
//   });
// }

let persistor = persistStore(store);

epicMiddleware.run(rootEpic);

export {store, persistor};
