import type { Theme } from '@/constants/theme';
import { THEMES } from '@/constants/theme';
import { setFollowSystem, setTheme, toggleTheme } from '@/store/app-slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.app.theme);
  const followSystem = useAppSelector((state) => state.app.followSystem);

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
