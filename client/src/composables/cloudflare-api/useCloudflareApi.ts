import { useApiRequest } from '../database-api/useApiRequest';

export function useCloudflareApi() {
  const { makeRequest, isLoading, error } = useApiRequest();

  return {
    isLoading,
    error,

    /**
     * Verify Cloudflare Turnstile token
     * @param token - The Turnstile response token from the widget
     * @param secretKey - The secret key for Turnstile verification
     * @returns Promise with verification result
     */
    verifyTurnstileToken: async (token: string, secretKey: string) => {
      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      
      return makeRequest<{
        success: boolean;
        challenge_ts?: string;
        hostname?: string;
        'error-codes'?: string[];
        action?: string;
        cdata?: string;
      }>('POST', verifyUrl, {
        body: {
          secret: secretKey,
          response: token
        }
      });
    }
  };
}
