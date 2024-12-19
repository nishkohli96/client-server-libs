/**
 * The following HTTP methods are supported:
 * GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS.
 *
 * If an unsupported method is called, Next.js will return a
 * 405 Method Not Allowed response. The function can be both sync or async.
 *
 * Api Routing works in a similar way to Next.js AppRouter Navigation.
 * There cannot be a route.js file at the same route segment level as page.js.
 *
 * For handling multiple HTTP methods, export separate functions for
 * GET, POST, etc., in the same route.ts.
 *
 * Route Handlers are not cached by default
 */

/**
 * To cache a GET method, use a route config option like the one
 * used for this route. Read more at the link below:
 *
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
export const dynamic = 'force-static';

export function GET() {
  return Response.json('Hello World');
}
