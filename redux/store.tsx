import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

import { apiSlice } from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';
import miningReducer from './features/mining/miningSlice';
import depositMethodReducer from './depositMethodSlice';
import signUpData from './signupDataSlice';
import stepperSlice from './stepperSlice';
import resetPassSlice from './resetPassSlice';
import verificationSlice from './verificationSlice';
import tradeReducer from './features/trade/tradeSlice';

const persistConfig = {
	key: 'root',
	storage: storage,
	whitelist: ['auth', 'trade', 'resetPass'],
};

export const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	auth: authReducer,
	mining: miningReducer,
	depositMethod: depositMethodReducer,
	signUpData,
	stepper: stepperSlice,
	resetPass: resetPassSlice,
	verification: verificationSlice,
	trade: tradeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(apiSlice.middleware);
	},
});
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
