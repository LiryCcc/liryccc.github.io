import type { Theme } from '@/constants/theme';
import { THEMES } from '@/constants/theme';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  theme: Theme;
  followSystem: boolean;
}

const initialState: AppState = {
  theme: THEMES.LIGHT,
  followSystem: true
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
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

export const { setTheme, toggleTheme, setFollowSystem, syncSystemTheme } = appSlice.actions;
export default appSlice.reducer;
