
import { Toaster } from 'react-hot-toast';
import RootNavigator from './navigation/RootNavigator';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
        <Toaster />
      </PersistGate>
    </Provider>
  );
}

export default App;
