import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritosState {
  productosIds: string[];
}

const estadoInicial: FavoritosState = {
  productosIds: [],
};

const favoritosSlice = createSlice({
  name: 'favoritos',
  initialState: estadoInicial,
  reducers: {
    toggleFavorito: (state, action: PayloadAction<string>) => {
      if (state.productosIds.includes(action.payload)) {
        state.productosIds = state.productosIds.filter(
          (id) => id !== action.payload
        );
      } else {
        state.productosIds.push(action.payload);
      }
    },
    limpiarFavoritos: () => estadoInicial,
  },
});

export const { toggleFavorito, limpiarFavoritos } = favoritosSlice.actions;
export default favoritosSlice.reducer;
