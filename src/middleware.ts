import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/temas(/.*)?", "/temas", "/temas/:slug", "/en/temas(/.*)?", "/en/temas", "/en/temas/:slug", "/qh/temas(/.*)?", "/qh/temas", "/qh/temas/:slug"])
export const onRequest = clerkMiddleware((auth, context) => {
  const { userId, redirectToSignIn } = auth();

  if(isProtectedRoute(context.request) && !userId) {
    return redirectToSignIn();
  }
}, {
  authorizedParties: ["https://warmidev.tech", "http://localhost:4321", "http://localhost:3005"],
});