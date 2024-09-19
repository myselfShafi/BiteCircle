import {createSlice} from '@reduxjs/toolkit';
import {AuthInitialState} from '../../configs/types';

let initialState: AuthInitialState = {
  status: false,
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogin: (state, action) => {
      state.status = true;
      state.data = action.payload;
    },
    authLogout: (state, action) => {
      state.status = false;
      state.data = null;
    },
  },
});

export const {authLogin, authLogout} = authSlice.actions;

export default authSlice.reducer;
