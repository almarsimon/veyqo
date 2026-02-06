// theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4A4458",
      dark: "#3A3546",
      light: "#8E88A8",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#111111",
      secondary: "#555555",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 8,
          padding: "8px 20px",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#3A3546",
          },
          "&:active": {
            backgroundColor: "#2F2A38",
          },
          "&.Mui-disabled": {
            backgroundColor: "#B8B5BF",
            color: "#FFFFFF",
          },
        },
      },
    },
  },
});
