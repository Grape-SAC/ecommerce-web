import { UsuarioAutenticacionType } from '@/shared/types/usuario-autenticacion-response.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AutemticacionState {
    usuario: UsuarioAutenticacionType | null;
    isLoading: boolean;
}

const estadoInicial: AutemticacionState = {
    usuario: null,
    isLoading: true, // <-- Empieza en true por defecto
};

const authSlice = createSlice({
    name: 'auth',
    initialState: estadoInicial,
    reducers: {
        setUser: (state, action: PayloadAction<UsuarioAutenticacionType | null>) => {
            state.usuario = action.payload;
            state.isLoading = false; // <-- Cuando se setea el usuario, ya no carga
        },
        logout: (state) => {
            state.usuario = null;
            state.isLoading = false; // <-- Si hacemos logout, ya no carga
        },
        // Opcional: una acción para iniciar la carga
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        }
    },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
