import { createContext, useContext } from 'react';

interface Theme {
  primaryColor: string;
  white: string;
  backgroundColor: string;
  iconColor: string;
  spacing: number;
}

const Theme = createContext({} as Theme);

export const ThemeProvider = Theme.Provider;

export const useTheme = () => useContext(Theme);
