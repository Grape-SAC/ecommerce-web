import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/auth.slice';
import { AuthUserResponseType } from '@/app/(no-ui)/auth/register/types/auth-user-response.type';
import { refreshToken } from '../services/refresh-token.service';

export function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const response: Response = await fetch('/api/me', { credentials: 'include' });

      if (response.ok) {
        const user: AuthUserResponseType = await response.json();

        dispatch(setUser(user));

        return;
      }

      const user: AuthUserResponseType | null = await refreshToken();

      if (user) {
        dispatch(setUser(user));

        return;
      }

      dispatch(setUser(null));
    };

    fetchUser();
  }, [dispatch]);
}
