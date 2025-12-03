export const runtime = 'nodejs';

import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies() as any;
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return Response.json(null, { status: 401 });
  }

  const backendResponse = await fetch(`${process.env.BACKEND_URL}/auth/obtener-mi-perfil`, {
    headers: {
      Cookie: `access_token=${accessToken}`,
    },
    // credentials: 'include',
  });

  if (!backendResponse.ok) {
    return Response.json(null, { status: 401 });
  }

  const usuarioResponse: UsuarioAutenticacionType = await backendResponse.json();

  return Response.json(usuarioResponse);
}
