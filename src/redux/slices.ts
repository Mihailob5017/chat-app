import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import YupPassword from 'yup-password';
import { CredentialsInterface } from '../helpers/types';

interface State {
  username: string | null;
  isLoggedIn: boolean;
}

const initialState: State = {
  username: '',
  isLoggedIn: false,
};

export const storeSlice = createSlice({
  name: 'state',
  initialState: initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    setCredentials: (state, action: PayloadAction<CredentialsInterface>) => {
      state.username = action.payload.user.username;
      state.isLoggedIn = true;
    },
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});
export const actions = storeSlice.actions;
export default storeSlice.reducer;
