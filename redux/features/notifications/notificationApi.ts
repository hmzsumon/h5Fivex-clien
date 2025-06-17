import { apiSlice } from '../api/apiSlice';

export const notificationApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// get notifications
		getNotifications: builder.query<any, void>({
			query: () => '/my-unread-notifications',
			providesTags: ['Notifications'],
		}),

		// update notification isRead true
		updateNotification: builder.mutation<any, any>({
			query: (id) => ({
				url: `/admin/notification/${id}`,
				method: 'PUT',
			}),
		}),

		// get my-unread-notifications-count
		getUnreadNotificationsCount: builder.query<any, void>({
			query: () => '/my-unread-notifications-count',
			providesTags: ['Notifications'],
		}),

		// /update-notification/:id
		updateNotificationStatus: builder.mutation<any, { id: string }>({
			query: ({ id }) => ({
				url: `/update-notification/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: ['Notifications'],
		}),
	}),
});

export const {
	useGetNotificationsQuery,
	useUpdateNotificationMutation,
	useGetUnreadNotificationsCountQuery,
	useUpdateNotificationStatusMutation,
} = notificationApi;
