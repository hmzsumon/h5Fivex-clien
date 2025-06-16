import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
const initialState = {
	btnLogin: false,
	user: null,
	token: null,
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setBtnLogin: (state) => {
			state.btnLogin = !state.btnLogin;
		},
		setUser: (state, action) => {
			// console.log('action.payload', action.payload);
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;
		},
		loadUser: (state, action) => {
			state.user = action.payload.user;
		},
		logoutUser: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
		},
	},
});

export const { setBtnLogin, setUser, logoutUser, loadUser } = authSlice.actions;
export default authSlice.reducer;
