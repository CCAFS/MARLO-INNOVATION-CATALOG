import { phaseId } from '~/content/vars';
import { useApiRequest } from './useApiRequest';
import type { User, Post, CreatePostRequest, CreatePostResponse } from '~/interfaces/api-example.interface';
import {
  type InnovationType,
  type InnovationCatalog,
  type InnovationCatalogStats,
  type SdgResume,
  type PDFInfo
} from '~/interfaces/innovation-catalog.interface';
import type { SearchComplete } from '~/interfaces/search-complete.interface';
import {
  filterInnovationCatalogResponse,
  filterSearchCompleteResponse
} from '~/utils/innovations/filterInnovationCatalogResponse';
import type { InnovationFacets } from '~/interfaces/innovation-facets.interface';

const isFullPoolRequest = (limit?: number) => !limit || limit >= 1000;

const buildQueryString = (params?: Record<string, any>) => {
  const queryParams = new URLSearchParams();

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    queryParams.append(key, Array.isArray(value) ? value.join(',') : value.toString());
  });

  return queryParams.toString();
};

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

    getInnovations: async (params?: {
      phase?: string;
      offset?: number;
      limit?: number;
      readinessScale?: number;
      innovationTypeId?: number;
      sdgId?: number;
      countryIds?: number[];
      actorIds?: number[];
      search?: string;
    }) => {
      const data = await makeRequest<InnovationCatalog>('GET', `${apiBaseUrl}/innovations/search-simple`, { params });
      return filterInnovationCatalogResponse(data, { updateTotalCount: isFullPoolRequest(params?.limit) });
    },

    getInnovationStats: (params?: { phaseId?: string }) =>
      makeRequest<InnovationCatalogStats>('GET', `${apiBaseUrl}/innovations/stats`, {
        params,
        retry: 2, // Retry up to 2 times (3 total attempts)
        retryDelay: 2000 // Wait 2 seconds between retries
      }),

    getInnovationsComplete: async (params?: {
      phase?: string;
      offset?: number;
      limit?: number;
      readinessScale?: number;
      innovationTypeId?: number;
      sdgId?: number;
      countryIds?: number[];
      countryId?: number;
      actorIds?: number[];
      search?: string;
    }) => {
      const data = await makeRequest<SearchComplete>('GET', `${apiBaseUrl}/innovations/search-complete`, { params });
      return filterSearchCompleteResponse(data, { updateTotalCount: isFullPoolRequest(params?.limit) });
    },

    getInnovationFacets: async (params?: {
      phase?: string;
      readinessScale?: number;
      innovationTypeId?: number;
      sdgId?: number;
      countryIds?: number[];
      actorIds?: number[];
      search?: string;
    }) => {
      const queryString = buildQueryString(params);
      const requestUrl = `${apiBaseUrl}/innovations/facets${queryString ? '?' + queryString : ''}`;
      const response = await fetch(requestUrl);

      if (!response.ok) {
        const error = new Error(`Request failed with status ${response.status}`);
        (error as Error & { status?: number }).status = response.status;
        throw error;
      }

      return (await response.json()) as InnovationFacets;
    },

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

    getCommunityStories: (params?: { limit?: number }) =>
      makeRequest<
        {
          id: number;
          innovation_id: number;
          innovation_name: string;
          user_name: string;
          user_lastname: string;
          user_email: string;
          comment: string;
          is_active: boolean;
          active_since: string;
          modification_justification: string;
        }[]
      >('GET', `${apiBaseUrl}/innovation-comments`, { params }),

    getCommunityStoriesByInnovationId: (innovationId: number) =>
      makeRequest<
        {
          id: number;
          innovation_id: number;
          user_name: string;
          user_lastname: string;
          user_email: string;
          comment: string;
          is_active: boolean;
          active_since: string;
          modification_justification: string;
        }[]
      >('GET', `${apiBaseUrl}/innovation-comments/innovation/${innovationId}`, { params: { phaseId: phaseId } }),

    postNewsletterSubscription: (email: string) =>
      makeRequest('POST', `${apiBaseUrl}/innovations/subscriptions`, {
        body: { email }
      })
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
