import { auth } from '@/lib/firebase';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export interface iInitialState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}
const initialState: iInitialState = {
  user: {
    email: null,
  },
  isError: false,
  isLoading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data.user.email
  }
);
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const data = await signInWithEmailAndPassword(auth, email, password);
    return data.user.email
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action)=>{
      state.user.email = action.payload
    },
    setLoading:(state,action)=>{
      state.isLoading = action.payload
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(createUser.pending,(state)=>{
        state.isLoading = true
    }).addCase(createUser.fulfilled,(state,action)=>{
      state.isLoading = false,
      state.user.email = action.payload
    }).addCase(createUser.rejected,(state,action)=>{
      state.user.email = null
      state.isError = true
      state.error = action.error.message!
    })
    .addCase(loginUser.pending,(state)=>{
        state.isLoading = true
    }).addCase(loginUser.fulfilled,(state,action)=>{
      state.isLoading = false,
      state.user.email = action.payload
    }).addCase(loginUser.rejected,(state,action)=>{
      state.user.email = null
      state.isError = true
      state.error = action.error.message!
    })
  }
});

export const {setUser,setLoading} = userSlice.actions
export default userSlice.reducer;
