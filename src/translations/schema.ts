import { z } from 'zod/v4';

export const translationSchema = z.object({
  common: z.object({
    welcome: z.string().describe('The welcome message'),
    hello: z.string().describe('The hello message'),
    loading: z.string().describe('The loading message'),
    notFound: z.string().describe('The 404 page not found message'),
    notFoundTitle: z.string().describe('The 404 page title'),
    notFoundMessage: z.string().describe('The 404 page message'),
    notFoundPath: z.string().describe('The text before the path in 404 page'),
    goHome: z.string().describe('The button text to go to home page'),
    errorTitle: z.string().describe('The error boundary title'),
    errorMessage: z.string().describe('The error boundary message'),
    errorDetails: z.string().describe('The error details label'),
    errorReset: z.string().describe('The error reset button text')
  }),
  layout: z.object({
    title: z.string().describe('The layout title'),
    home: z.string().describe('The home navigation link'),
    about: z.string().describe('The about navigation link'),
    footer: z.string().describe('The footer text'),
    language: z.string().describe('The language label'),
    switchLanguage: z.string().describe('The switch language button label')
  }),
  home: z.object({
    welcome: z.string().describe('The home page welcome message'),
    description: z.string().describe('The home page description')
  }),
  gomoku: z.object({
    title: z.string().describe('The gomoku game title'),
    reset: z.string().describe('The reset game button text'),
    undo: z.string().describe('The undo move button text'),
    currentPlayer: z.string().describe('The current player label'),
    black: z.string().describe('The black player name'),
    white: z.string().describe('The white player name'),
    blackWin: z.string().describe('The black player win message'),
    whiteWin: z.string().describe('The white player win message'),
    draw: z.string().describe('The draw game message')
  })
});

export type Translation = z.infer<typeof translationSchema>;
