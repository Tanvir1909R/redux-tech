import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface iCart {
  products: IProduct[];
  total: number;
}

const initialState: iCart = {
  products: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const exist = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (exist) {
        exist.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price;
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const exist = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (exist && exist.quantity! > 1) {
        exist.quantity! -= 1;
        state.total -= action.payload.price;
      }
    },
    removeFromCard: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
        state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCart, removeFromCard, removeOne } = cartSlice.actions;

export default cartSlice.reducer;
