import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FinalizaCompraState {
  precioEnvio: number;
  usuarioDireccionId: string | null;
  // puedes agregar otros campos como address, distrito seleccionado, etc.
}

const estadoInicial: FinalizaCompraState = {
  precioEnvio: 0,
  usuarioDireccionId: null,
};

export const finalizaCompraSlice = createSlice({
  name: 'finaliza-compra',
  initialState: estadoInicial,
  reducers: {
    setPrecioEnvio: (state, action: PayloadAction<number>) => {
      state.precioEnvio = action.payload;
    },
    setUsuarioDireccionId: (state, action: PayloadAction<string>) => {
      state.usuarioDireccionId = action.payload;
    },
  },
});

export const { setPrecioEnvio, setUsuarioDireccionId } = finalizaCompraSlice.actions;
export default finalizaCompraSlice.reducer;
