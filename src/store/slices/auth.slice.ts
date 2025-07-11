import { AuthUserResponseType } from '@/app/(no-ui)/auth/register/types/auth-user-response.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: AuthUserResponseType | null;
}

const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthUserResponseType | null>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
