import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: "white",
          },
        },
      },
    },
  },
});
