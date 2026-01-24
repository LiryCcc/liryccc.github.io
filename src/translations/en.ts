import { type Translation } from './schema';

export const en: Translation = {
  common: {
    welcome: 'Welcome',
    hello: 'Hello',
    loading: 'Loading...',
    notFound: '404 - Page Not Found',
    notFoundTitle: 'Page Not Found',
    notFoundMessage: 'Sorry, the page you are looking for does not exist',
    notFoundPath: 'Accessed route:',
    goHome: 'Go to Home',
    errorTitle: 'Something went wrong',
    errorMessage: 'Sorry, the application encountered an error. Please try refreshing the page or contact support.',
    errorDetails: 'Error Details',
    errorReset: 'Try Again'
  },
  layout: {
    title: 'My App',
    home: 'Home',
    about: 'About',
    footer: '© 2024 My App. All rights reserved.',
    language: 'Language',
    switchLanguage: 'Switch Language'
  },
  home: {
    welcome: 'Welcome to My App',
    description: 'This is a modern responsive application that supports multiple devices and screen sizes.'
  },
  gomoku: {
    title: 'Gomoku',
    reset: 'Reset',
    undo: 'Undo',
    currentPlayer: 'Current Player',
    black: 'Black',
    white: 'White',
    blackWin: 'Black Wins!',
    whiteWin: 'White Wins!',
    draw: 'Draw!'
  }
};
