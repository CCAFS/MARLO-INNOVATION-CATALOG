import { useApiRequest } from './useApiRequest';
import type { User, Post, CreatePostRequest, CreatePostResponse } from '~/interfaces/api-example.interface';
import type { InnovationCatalogV2, InnovationCatalogV2Stats } from '~/interfaces/innovation-catalog-v2.interface';

export function useApi() {
  const apiBaseUrl = import.meta.env.PUBLIC_API || '';

  const { makeRequest, isLoading, error } = useApiRequest();

  return {
    apiBaseUrl,
    isLoading,
    error,

    getUsers: (params?: Record<string, any>) => makeRequest<User[]>('GET', `${apiBaseUrl}/users`, { params }),

    getUserById: (id: string | number) => makeRequest<User>('GET', `${apiBaseUrl}/users/${id}`),

    getPosts: (params?: Record<string, any>) => makeRequest<Post[]>('GET', `${apiBaseUrl}/posts`, { params }),

    postCreatePost: (body: CreatePostRequest) => makeRequest<CreatePostResponse>('POST', `${apiBaseUrl}/posts`, { body }),

    getInnovations: (params?: {
      phase?: string;
      offset?: number;
      limit?: number;
      readinessScale?: number;
      innovationTypeId?: number;
      sdgId?: number;
      countryId?: number;
    }) => makeRequest<InnovationCatalogV2>('GET', `${apiBaseUrl}/innovations/search-simple`, { params }),

    getInnovationStats: (params?: { phaseId?: string }) =>
      makeRequest<InnovationCatalogV2Stats>('GET', `${apiBaseUrl}/innovations/stats`, { params })
  };
}

/*
Usage example:

import { useApi } from '~/composables/useApi';
import type { User, Post } from '~/interfaces/api-example.interface';

const { getUsers, getUserById, getPosts, postCreatePost, isLoading, error } = useApi();

// Simple GET - returns User[]
const users = await getUsers();
console.log(users[0].name); // TypeScript knows this is a string

// GET with ID - returns User
const user = await getUserById('123');
console.log(user.email); // TypeScript autocomplete works!

// GET with query params - returns Post[]
const posts = await getPosts({ limit: 10, offset: 0 });
console.log(posts[0].title); // Fully typed

// POST with body - returns CreatePostResponse
const newPost = await postCreatePost({
  title: 'New Post',
  body: 'Content here',
  userId: 1
});
console.log(newPost.id); // TypeScript validates the response structure
*/
