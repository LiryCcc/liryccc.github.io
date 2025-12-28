import { THEMES } from '@/constants/theme';
import type { RootState } from '@/store';
import { store } from '@/store';
import { syncSystemTheme } from '@/store/app-slice';
import { darkTheme, lightTheme } from '@/theme';
import type { OnlyChildrenFC } from '@/typings/component';
import { getSystemTheme, watchSystemTheme } from '@/utils/theme';
import { FluentProvider } from '@fluentui/react-components';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';

const ThemeProvider: OnlyChildrenFC = ({ children }) => {
  const theme = useSelector((state: RootState) => state.app.theme);
  const followSystem = useSelector((state: RootState) => state.app.followSystem);
  const fluentTheme = theme === THEMES.DARK ? darkTheme : lightTheme;

  useEffect(() => {
    if (!followSystem) {
      return;
    }

    // 初始化时同步系统主题
    const systemTheme = getSystemTheme();
    store.dispatch(syncSystemTheme(systemTheme));

    // 监听系统主题变化
    const unwatch = watchSystemTheme((newTheme) => {
      store.dispatch(syncSystemTheme(newTheme));
    });

    return unwatch;
  }, [followSystem]);

  return <FluentProvider theme={fluentTheme}>{children}</FluentProvider>;
};

const LiryProvider: OnlyChildrenFC = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};

export default LiryProvider;
