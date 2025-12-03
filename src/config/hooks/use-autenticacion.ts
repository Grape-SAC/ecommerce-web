import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '@/store/slices/autenticacion.slice';
import { usePathname } from 'next/navigation';

export function useAutenticacion() {
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    console.log('[useAutenticacion] ejecutado en ruta:', pathname);

    dispatch(setLoading(true));

    const fetchUser = async () => {
      const meResponse = await fetch('/api/me', { credentials: 'include' });
      console.log('Respuesta de /api/me:', meResponse);
      if (meResponse.ok) {
        console.log('Usuario autenticado.');
        const usuario = await meResponse.json();
        dispatch(setUser(usuario));
        return;
      }

      const refreshResponse = await fetch('/api/refresh', { method: 'POST', credentials: 'include' });
      console.log('Respuesta de /api/refresh:', refreshResponse);
      if (!refreshResponse.ok) {
        console.log('No se pudo refrescar el token, usuario no autenticado.');
        dispatch(setUser(null));
        return;
      }
      console.log('Token refrescado, obteniendo datos del usuario nuevamente.');
      const meResponse2 = await fetch('/api/me', { credentials: 'include' });
      console.log('Segunda respuesta de /api/me:', meResponse2);
      if (meResponse2.ok) {
        console.log('Usuario autenticado después de refrescar el token.');
        const usuario = await meResponse2.json();
        dispatch(setUser(usuario));
        return;
      }
      console.log('No se pudo autenticar al usuario después de refrescar el token.');
      // no sé si esto es necesario.
      // dispatch(setUser(null));
    };

    fetchUser();
  }, [dispatch, pathname]);
}
