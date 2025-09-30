"use client";

import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  PaletteMode,
} from "@mui/material";

type ThemeMode = PaletteMode;

const ThemeModeContext = createContext({
  mode: "light" as ThemeMode,
  toggleMode: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>("light");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode") as ThemeMode | null;
    if (savedMode) setMode(savedMode);
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "#1976d2" },
                background: { default: "#f5f5f5", paper: "#ffffff" },
              }
            : {
                primary: { main: "#90caf9" },
                background: { default: "#121212", paper: "#1e1e1e" },
              }),
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              body: {
                backgroundColor: themeParam.palette.background.default,
                color: themeParam.palette.text.primary,
                "--background": themeParam.palette.background.default,
                "--foreground": themeParam.palette.text.primary,
              },
            }),
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
