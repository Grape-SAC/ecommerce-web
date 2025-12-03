import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = cookies() as any;
  const refresh = cookieStore.get('refresh_token')?.value;

  if (!refresh) {
    return Response.json(null, { status: 401 });
  }

  const backendRes = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Cookie: `refresh_token=${refresh}`
    }
  });

  if (!backendRes.ok) return Response.json(null, { status: 401 });

  const setCookie = backendRes.headers.get('set-cookie');

  return new Response(null, {
    status: 200,
    headers: setCookie
      ? { 'Set-Cookie': setCookie }
      : {}
  });
}
