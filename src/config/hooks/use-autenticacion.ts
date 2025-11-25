import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setUser } from '@/store/slices/autenticacion.slice';
import { refreshToken } from '../services/refresh-token.service';
import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';

export function useAutenticacion() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const fetchUser = async () => {
      const responseHttp: Response = await fetch('/api/me', { credentials: 'include' });

      if (responseHttp.ok) {
        const usuarioResponse: UsuarioAutenticacionType = await responseHttp.json();

        dispatch(setUser(usuarioResponse));

        return;
      }

      // const usuarioResponse: UsuarioAutenticacionType | null = await refreshToken();
      const refreshed: Response = await fetch('/api/refresh', { method: 'POST' });

      // if (usuarioResponse) {
      //   dispatch(setUser(usuarioResponse));

      //   return;
      // }

      // dispatch(setUser(null));

      if (!refreshed.ok) {
        dispatch(setUser(null));
        return;
      }

      const usuarioResponse: UsuarioAutenticacionType = await refreshed.json();
      dispatch(setUser(usuarioResponse));
      return;

    };

    fetchUser();
  }, [dispatch]);
}
