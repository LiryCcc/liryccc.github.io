import type { Theme } from '@/constants/theme';
import { THEMES } from '@/constants/theme';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  count: number;
  theme: Theme;
  followSystem: boolean;
}

const initialState: AppState = {
  count: 0,
  theme: THEMES.LIGHT,
  followSystem: true
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    reset: (state) => {
      state.count = 0;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      state.followSystem = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      state.followSystem = false;
    },
    setFollowSystem: (state, action: PayloadAction<boolean>) => {
      state.followSystem = action.payload;
    },
    syncSystemTheme: (state, action: PayloadAction<Theme>) => {
      if (state.followSystem) {
        state.theme = action.payload;
      }
    }
  }
});

export const {
  increment,
  decrement,
  incrementByAmount,
  reset,
  setTheme,
  toggleTheme,
  setFollowSystem,
  syncSystemTheme
} = appSlice.actions;
export default appSlice.reducer;
