import { createContext, useContext } from 'react';

interface MyTheme {
  primaryColor: string;
  white: string;
  backgroundColor: string;
  iconColor: string;
  spacing: number;
}

const Theme = createContext({} as MyTheme);

export const ThemeProvider = Theme.Provider;

export const useTheme = () => useContext(Theme);
