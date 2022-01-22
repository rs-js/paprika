import './utils/defaultProps';
import React from 'react';
import {AppContainer} from './navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store/store';
import {NativeBaseProvider} from 'native-base';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <AppContainer />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
