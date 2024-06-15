import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer  from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import themeReducer from './theme/themeSlice';

// it is used to add all the reducer once
const rootReducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

const persistConfig = {
    key : 'root',
    storage,
    version:1
};

const persistedReducer = persistReducer(persistConfig,rootReducer);

// configure store accepts a single configuration parameters
export const store = configureStore({
    reducer: persistedReducer,
//   add middleware to prevent default error
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:false}),
});

export const persistor = persistStore(store);