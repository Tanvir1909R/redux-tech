import {configureStore} from '@reduxjs/toolkit';
import cartReducer from '../redux/features/cart/cartSlice'
import productReducer from '../redux/features/product/productSlice'
import api from './api/apiSlice';
import userReducer from '../redux/features/user/userSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer,
        [api.reducerPath]:api.reducer,
        user:userReducer
    },
    middleware:(defaultMiddleware)=> defaultMiddleware().concat(api.middleware)
})

export type iState = ReturnType<typeof store.getState >
type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<iState> = useSelector

export default store