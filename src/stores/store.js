import { 
    configureStore, 
    combineReducers 
} from "@reduxjs/toolkit";

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    // insert reducers here
});

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: [apiSlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }).concat(apiSlice.middleware),

    devTools: process.env.NODE_ENV === "development"
});