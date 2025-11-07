import { useApiRequest } from './useApiRequest';
import type { User, Post, CreatePostRequest, CreatePostResponse } from '~/interfaces/api-example.interface';
import {
  type InnovationType,
  type InnovationCatalogV2,
  type InnovationCatalogV2Stats,
  type SdgResume,
  type PDFInfo
} from '~/interfaces/innovation-catalog-v2.interface';
import type { SearchComplete } from '~/interfaces/search-complete.interface';

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
      countryIds?: number[];
    }) => makeRequest<InnovationCatalogV2>('GET', `${apiBaseUrl}/innovations/search-simple`, { params }),

    getInnovationStats: (params?: { phaseId?: string }) =>
      makeRequest<InnovationCatalogV2Stats>('GET', `${apiBaseUrl}/innovations/stats`, { params }),

    getInnovationsComplete: (params?: {
      phase?: string;
      offset?: number;
      limit?: number;
      readinessScale?: number;
      innovationTypeId?: number;
      sdgId?: number;
      countryId?: number;
    }) => makeRequest<SearchComplete>('GET', `${apiBaseUrl}/innovations/search-complete`, { params }),

    getInnovationPDFById: (id: string | number) =>
      makeRequest<PDFInfo>('GET', `${apiBaseUrl}/innovations/pdf/url/custom`, {
        params: {
          innovationId: id,
          cycle: 'Reporting',
          year: 2025
        }
      }),

    postInnovationReport: (body: {
      innovation_id: number;
      user_name: string;
      user_lastname: string;
      user_email: string;
      interest_narrative: string;
      modification_justification: string;
    }) => makeRequest('POST', `${apiBaseUrl}/innovation-reports`, { body }),

    getInnovationTypes: () => makeRequest<InnovationType[]>('GET', `${apiBaseUrl}/innovations/innovation-types`),

    getSustainableDevelopmentGoals: () => makeRequest<SdgResume[]>('GET', `${apiBaseUrl}/sustainable-development-goals`),

    postInnovationComment: (body: {
      innovation_id: number;
      user_name: string;
      user_lastname: string;
      user_email: string;
      comment: string;
      modification_justification: string;
    }) => makeRequest('POST', `${apiBaseUrl}/innovation-comments`, { body }),

    getCommunityStories: (params?: { limit?: number }) => makeRequest('GET', `${apiBaseUrl}/innovation-comments`, { params }),

    getCommunityStoriesByInnovationId: (innovationId: number) =>
      makeRequest('GET', `${apiBaseUrl}/innovation-comments/innovation/${innovationId}`)
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
