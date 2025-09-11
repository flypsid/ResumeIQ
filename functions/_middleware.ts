interface Context {
  request: Request;
  next: () => Promise<Response>;
  env: {
    ASSETS: {
      fetch: (url: URL) => Promise<Response>;
    };
  };
}

export async function onRequest(context: Context): Promise<Response> {
  const { request, next } = context;
  const url = new URL(request.url);

  // Handle client-side routing for React Router
  if (url.pathname.startsWith('/assets/') ||
      url.pathname.startsWith('/favicon') ||
      url.pathname.includes('.')) {
    return next();
  }

  // For all other routes, serve the index.html
  const page = await next();
  const response = new Response(page.body, page);

  // If it's a 404, serve the index.html for client-side routing
  if (response.status === 404) {
    const notFoundResponse = await context.env.ASSETS.fetch(
      new URL('/index.html', request.url)
    );

    return new Response(notFoundResponse.body, {
      ...notFoundResponse,
      headers: {
        ...notFoundResponse.headers,
        'Content-Type': 'text/html',
      },
    });
  }

  return response;
}
