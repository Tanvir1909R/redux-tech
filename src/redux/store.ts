import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../redux/features/cart/cartSlice'
import productReducer from '../redux/features/product/productSlice'
import api from './api/apiSlice';

const store = configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer,
        [api.reducerPath]:api.reducer
    },
    middleware:(defaultMiddleware)=> defaultMiddleware().concat(api.middleware)
})

export type iState = ReturnType<typeof store.getState >

export default store