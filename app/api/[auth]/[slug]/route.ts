import { getRouteHandlers } from "@propelauth/nextjs/server/app-router";
import { type NextRequest } from "next/server";

// postLoginRedirectPathFn is optional, but if you want to redirect the user to a different page after login, you can do so here.
const routeHandlers = getRouteHandlers({
  postLoginRedirectPathFn: (_req: NextRequest) => {
    return "/admin/cms";
  },
});
export const GET = routeHandlers.getRouteHandler;
export const POST = routeHandlers.postRouteHandler;
