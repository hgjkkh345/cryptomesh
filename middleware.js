// Vercel Edge Middleware: proxies /api/* to the backend and adds a secret header,
// so the backend can reject requests that bypass Vercel.
// Set API_PROXY_SECRET and API_ORIGIN in Vercel env (secret must match the backend).

export const config = {
  matcher: "/api/:path*",
}

export default async function middleware(request) {
  const url = new URL(request.url)
  const headers = new Headers(request.headers)
  headers.delete("host")
  headers.set("x-proxy-secret", process.env.API_PROXY_SECRET || "")

  return fetch(`${process.env.API_ORIGIN}${url.pathname}${url.search}`, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD" ? undefined : request.body,
    redirect: "manual",
  })
}
