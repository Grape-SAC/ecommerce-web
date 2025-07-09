import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutState {
  shippingPrice: number;
  userAddressId: string | null;
  // puedes agregar otros campos como address, distrito seleccionado, etc.
}

const initialState: CheckoutState = {
  shippingPrice: 0,
  userAddressId: null,
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingPrice: (state, action: PayloadAction<number>) => {
      state.shippingPrice = action.payload;
    },
    setUserAddressId: (state, action: PayloadAction<string>) => {
      state.userAddressId = action.payload;
    },
  },
});

export const { setShippingPrice, setUserAddressId } = checkoutSlice.actions;
export default checkoutSlice.reducer;
