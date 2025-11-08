import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AutemticacionState {
    usuario: UsuarioAutenticacionType | null;
}

const estadoInicial: AutemticacionState = {
    usuario: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: estadoInicial,
    reducers: {
        setUser: (state, action: PayloadAction<UsuarioAutenticacionType | null>) => {
            state.usuario = action.payload;
        },
        logout: (state) => {
            state.usuario = null;
        },
    },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
