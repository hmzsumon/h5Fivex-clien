import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '@/config/baseUrl';
import { baseQueryWithReauth } from '@/redux/baseQueryWithReauth';

const url = `${baseUrl}/api/v1`;
// console.log('url', url);
export const apiSlice = createApi({
	reducerPath: 'api',

	baseQuery: baseQueryWithReauth, // ✅ Override with refresh-enabled baseQuery
	tagTypes: [
		'Users',
		'Admin',
		'Pxc',
		'Wallet',
		'Transactions',
		'User',
		'Withdraw',
		'Withdraws',
		'MyWithdraws',
		'Mining',
		'Deposits',
		'Notification',
		'Notifications',
		'Package',
		'Transaction',
		'Trade',
		'Trades',
		'Transfer',
		'Task',
	],
	endpoints: (builder) => ({}),
});

//https://wfc-api.herokuapp.com/api/v1
//http://localhost:5005/api/v1
