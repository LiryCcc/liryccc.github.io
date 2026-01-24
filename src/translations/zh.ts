import { type Translation } from './schema';

export const zh: Translation = {
  common: {
    welcome: '欢迎',
    hello: '你好',
    loading: '加载中...',
    notFound: '404 - 页面未找到',
    notFoundTitle: '页面未找到',
    notFoundMessage: '抱歉，您访问的页面不存在',
    notFoundPath: '访问的路由：',
    goHome: '返回主页',
    errorTitle: '出现错误',
    errorMessage: '抱歉，应用遇到了一个错误。请尝试刷新页面或联系支持团队。',
    errorDetails: '错误详情',
    errorReset: '重试'
  },
  layout: {
    title: '我的应用',
    home: '首页',
    about: '关于',
    footer: '© 2024 我的应用. 保留所有权利.',
    language: '语言',
    switchLanguage: '切换语言'
  },
  home: {
    welcome: '欢迎来到我的应用',
    description: '这是一个现代化的响应式应用，支持多种设备和屏幕尺寸。'
  },
  gomoku: {
    title: '五子棋',
    reset: '重新开始',
    undo: '悔棋',
    currentPlayer: '当前玩家',
    black: '黑子',
    white: '白子',
    blackWin: '黑子获胜！',
    whiteWin: '白子获胜！',
    draw: '平局！'
  }
};
