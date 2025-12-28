import type { Theme } from '@/constants/theme';
import { THEMES } from '@/constants/theme';
import type { RootState } from '@/store';
import { setFollowSystem, setTheme, toggleTheme } from '@/store/app-slice';
import { useDispatch, useSelector } from 'react-redux';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.app.theme);
  const followSystem = useSelector((state: RootState) => state.app.followSystem);

  const changeTheme = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  };

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const setFollowSystemTheme = (follow: boolean) => {
    dispatch(setFollowSystem(follow));
  };

  const isDark = theme === THEMES.DARK;
  const isLight = theme === THEMES.LIGHT;

  return {
    theme,
    isDark,
    isLight,
    followSystem,
    changeTheme,
    toggle,
    setFollowSystemTheme
  };
};
