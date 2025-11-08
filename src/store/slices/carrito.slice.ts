
import { CarritoProductoType } from '@/app/cart/types/cart-item.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CarritoState {
  productos: CarritoProductoType[];
}

const estadoInicial: CarritoState = { productos: [] };

const carritoSlice = createSlice({
  name: 'carrito',
  initialState: estadoInicial,
  reducers: {
    agregarProducto: (state, action: PayloadAction<CarritoProductoType>) => {
      const productoExistente = state.productos.find(producto => producto.id === action.payload.id);

      if (productoExistente) {
        productoExistente.cantidad += action.payload.cantidad;
      } else {
        state.productos.push(action.payload);
      }
    },
    actualizarCantidad: (state, action: PayloadAction<{ id: string; cantidad: number }>) => {
      const item = state.productos.find((producto) => producto.id === action.payload.id);

      if (item) {
        item.cantidad = action.payload.cantidad;
      }
    },
    eliminarProducto: (state, action: PayloadAction<{ id: string }>) => {
      state.productos = state.productos.filter(producto => producto.id !== action.payload.id);
    },
    vaciarCarrito: () => estadoInicial
  }
});

export const { agregarProducto, actualizarCantidad, eliminarProducto, vaciarCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;
