
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./combineReducer";
import userReducer from "./userSlice";
import {persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage";


const persistConfig = { 
  key: 'root',
  storage,
  version: 1,
}


const persistedReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducers,
  user: userReducer, 

});


export const  persistor = persistStore(store);
