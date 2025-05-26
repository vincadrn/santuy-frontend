import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0A2647",
    },
    background: {
      default: "#F5F4FF", 
    },
  },
  typography: {
    fontFamily: "Poppins", 
  },
});

const GlobalThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: "#F5F4FF" } }} />
      {children}
    </ThemeProvider>
  );
};

export { theme, GlobalThemeProvider };
