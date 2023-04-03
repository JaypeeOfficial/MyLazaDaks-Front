import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

export const lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 280,
      sm: 400,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#fafafa",
    },
  },
  action: {
    hover: "#fff",
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#DB7093",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#FFB6C1",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&:hover fieldset": {
            borderColor: "red",
          },
          "&.Mui-focused fieldset": {
            borderColor: "pink",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "pink",
          "&:hover": {
            backgroundColor: "white",
          },
          "&:focus": {
            backgroundColor: "#FFB6C1",
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1500,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#11cb5f",
    },
    secondary: {
      main: "#C71585",
    },
  },
});
