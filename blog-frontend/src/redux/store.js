import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from "redux-persist/es/persistStore";

// combining all reducers
const rootReducer = combineReducers({
    user : userReducer,
    theme : themeReducer,
})

const persistConfig = {
    key : 'root',
    storage,
    version : 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer :  persistedReducer,
    middleware : (getDefaultMiddlewre) => 
        getDefaultMiddlewre({ serializableCheck : false}),
});

export const persistor = persistStore(store);