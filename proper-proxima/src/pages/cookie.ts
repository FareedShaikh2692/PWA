import type { APIRoute } from "astro";

// Save cookie
export const post: APIRoute = async ({ request }) => {
  const authHeader = request.headers.get("Authorization") || "";
  const token = authHeader.replace("Bearer ", ""); // Strip "Bearer " if present

  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `jwt_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`
  );

  return new Response(null, {
    status: 200,
    headers,
  });
};

// Delete cookie
export const get: APIRoute = ({ request }) => {
  const headers = new Headers();
  headers.append(
    "Set-Cookie",
    `jwt_token=; Path=/; Max-Age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`
  );

  return new Response(null, {
    status: 200,
    headers,
  });
};
