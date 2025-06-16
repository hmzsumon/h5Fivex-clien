import { apiSlice } from '../api/apiSlice';

export const taskApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: () => '/tasks',
			providesTags: ['Task'],
		}),

		// create task
		createTask: builder.mutation({
			query: (body) => ({
				url: '/task',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['Task', 'User'],
		}),

		// update task
		updateTask: builder.mutation({
			query: () => ({
				url: 'update-my-task-report',
				method: 'PUT',
			}),
			invalidatesTags: ['Task', 'User'],
		}),

		// my tasks
		myTasks: builder.query({
			query: () => '/my/tasks',
			providesTags: ['Task'],
		}),

		// get my task reports
		getMyTaskReport: builder.query({
			query: () => '/my-task-report',
			providesTags: ['Task'],
		}),
	}),
});

export const {
	useGetTasksQuery,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	useMyTasksQuery,
	useGetMyTaskReportQuery,
} = taskApi;
