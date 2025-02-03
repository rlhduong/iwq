import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query';
import { toast } from 'sonner';
import { create } from 'domain';

const customBaseQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
  });

  try {
    const result: any = await baseQuery(args, api, extraOptions);

    if (result.error) {
      if (result.error.data.message) {
        toast.error(result.error.data.message);
      }
    }

    const isMutationRequest =
      (args as FetchArgs).method && (args as FetchArgs).method !== 'GET';

    if (isMutationRequest) {
      const successMessage = result.data?.message;
      if (successMessage) toast.success(successMessage);
    }

    if (result.data) {
      result.data = result.data.data;
    } else if (
      result.error?.status === 204 ||
      result.meta?.response?.status === 24
    ) {
      return { data: null };
    }

    return result;
  } catch (error: unknown) {
    console.error('Error:', error);
  }
};

export const api = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'api',
  tagTypes: ['Featured Guides', 'Guides', 'User'],
  endpoints: (build) => ({
    /*
      ====================
      USER
      ====================
    */

    validatSession: build.query<User, void>({
      query: () => 'user/status',
      providesTags: ['User'],
    }),

    login: build.mutation<User, { email: string; password: string }>({
      query: (body) => ({
        url: 'user/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    register: build.mutation<User, Partial<User>>({
      query: (body) => ({
        url: 'user/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: 'user/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User'],
    }),

    /**
		 ====================
     GUIDES
		 ====================
     */

    getFeaturedGuides: build.query<Guide[], void>({
      query: () => 'guides?featured=true',
      providesTags: ['Featured Guides'],
    }),

    getGuides: build.query<Guide[], void>({
      query: () => 'guides',
      providesTags: ['Guides'],
    }),

    getMyGuides: build.query<Guide[], void>({
      query: () => 'guides/my',
      providesTags: ['Guides'],
    }),

    getFavouriteGuides: build.query<Guide[], void>({
      query: () => 'guides/favourites',
      providesTags: ['Guides'],
    }),

    getGuide: build.query<Guide, string>({
      query: (id) => `guides/${id}`,
      providesTags: ['Guides'],
    }),

    createGuide: build.mutation<void, Partial<Guide>>({
      query: (body) => ({
        url: 'guides',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Guides'],
    }),

    deleteGuide: build.mutation<void, string>({
      query: (id) => ({
        url: `guides/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Guides'],
    }),
  }),
});

export const {
  useValidatSessionQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetFeaturedGuidesQuery,
  useGetGuidesQuery,
  useGetMyGuidesQuery,
  useGetFavouriteGuidesQuery,
  useGetGuideQuery,
  useDeleteGuideMutation,
  useCreateGuideMutation,
} = api;
