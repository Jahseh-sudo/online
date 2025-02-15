import React, { createContext, useContext, useState } from "react";
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from "react-native-paper";
import { useColorScheme } from "react-native";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = isDarkMode ? DarkTheme : DefaultTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};
