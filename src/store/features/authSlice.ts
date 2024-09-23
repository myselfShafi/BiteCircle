import {createSlice} from '@reduxjs/toolkit';
import {AuthInitialState} from '../../configs/types';

let initialState: AuthInitialState = {
  isLoading: true,
  status: false,
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLoaded: state => {
      state.isLoading = false;
    },
    authLogin: (state, action) => {
      state.status = true;
      state.data = action.payload;
    },
    authLogout: state => {
      state.status = false;
      state.data = null;
    },
    authSignup: (state, action) => {
      // temp store few data when new user registers
      state.data = action.payload;
    },
  },
});

export const {authLoaded, authLogin, authLogout, authSignup} =
  authSlice.actions;

export default authSlice.reducer;
