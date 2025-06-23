export const runtime = 'nodejs';

import { cookies } from 'next/headers';
import { AuthUserResponseType } from '@/app/(no-ui)/auth/register/types/auth-user-response.type';

export async function GET() {
  const cookieStore = cookies() as any; // ya no da error
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return Response.json(null, { status: 401 });
  }

  const backendResponse = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
    headers: {
      Cookie: `access_token=${accessToken}`,
    },
    credentials: 'include',
  });

  if (!backendResponse.ok) {
    return Response.json(null, { status: 401 });
  }

  const user: AuthUserResponseType = await backendResponse.json();

  return Response.json(user);
}
