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

  const data = await backendRes.json();

  return Response.json(data);
}
