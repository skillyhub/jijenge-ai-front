import { combineReducers, configureStore } from '@reduxjs/toolkit'
import rootReducer from './slices/serviceSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { splitApi } from './services/api';


const persistConfig = {
  key: 'root',
  storage,
  // Specify the , // In this example, we persist the 'user' reducer
}
const reducers=combineReducers({
  rootReducer,
  [splitApi.reducerPath]:splitApi.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)


  export const  store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck:false
    })
  })
  export const persistor = persistStore(store)