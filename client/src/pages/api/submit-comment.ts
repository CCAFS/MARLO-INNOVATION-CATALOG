import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const text = await request.text();
    if (!text) {
      return new Response(JSON.stringify({ error: 'Request body is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = JSON.parse(text);
    const { token, commentData } = body;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Turnstile token is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify Turnstile token
    const secretKey = import.meta.env.TURNSTILE_SECRET_KEY;
    const isDevelopment = import.meta.env.DEV;

    // Skip Turnstile in development if secret key is not set
    if (!secretKey && isDevelopment) {
      console.warn('⚠️ DEVELOPMENT MODE: Skipping Turnstile verification (no secret key configured)');
    } else if (!secretKey) {
      console.error('TURNSTILE_SECRET_KEY is not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error: Missing Turnstile secret key' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      // Verify with Cloudflare
      console.log('Verifying Turnstile token...');
      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const verifyResponse = await fetch(verifyUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token
        })
      });

      const verifyResult = await verifyResponse.json();
      console.log('Turnstile verification result:', verifyResult);

      if (!verifyResult.success) {
        console.error('Turnstile verification failed:', verifyResult['error-codes']);
        return new Response(
          JSON.stringify({
            error: 'Turnstile verification failed',
            details: verifyResult['error-codes'],
            message: 'Please refresh the page and try again'
          }),
          {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      console.log('Turnstile verification successful');
    }

    // Submit comment to database API
    const apiBaseUrl = import.meta.env.PUBLIC_API || '';
    const dbResponse = await fetch(`${apiBaseUrl}/innovation-comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
    });

    if (!dbResponse.ok) {
      throw new Error(`Database API error: ${dbResponse.status}`);
    }

    const dbResult = await dbResponse.json();

    return new Response(JSON.stringify({ success: true, data: dbResult }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in submit-comment API:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
