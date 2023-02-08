import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import YupPassword from 'yup-password';
import { CredentialsInterface } from '../helpers/types';

interface State {
  username: string;
  password: string;
  isLogedIn: boolean;
}

const initialState: State = {
  username: '',
  password: '',
  isLogedIn: false,
};

export const storeSlice = createSlice({
  name: 'state',
  initialState: initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      console.log(state, action);
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    setCredentials: (state, action: PayloadAction<CredentialsInterface>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isLogedIn = true;
    },
    logIn: (state) => {
      state.isLogedIn = true;
    },
    logOut: (state) => {
      state.isLogedIn = false;
    },
  },
});
export const actions = storeSlice.actions;
export default storeSlice.reducer;
