import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme, GlobalThemeProvider } from "../theme";

const LoginSuccessPage = () => {
  const navigate = useNavigate();

  // Redirect otomatis setelah beberapa detik (opsional)
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/dashboard"); // Redirect ke dashboard atau halaman lain
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [navigate]);

  return (
    <ThemeProvider theme={theme}>
        <GlobalThemeProvider>
            <Container
            maxWidth="xs"
            sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            }}
        >
            <Typography sx={{ mb: 2 }}>Do you already have any vacation group?</Typography>

            <Button
            variant="outlined"
            fullWidth
            sx={{ mb: 2, borderColor: "#0A2647", color: "#0A2647", "&:hover": { backgroundColor: "#D6E4FF" } }}
            onClick={() => navigate("/join-create-group/insert-code")}
            >
            Join Group
            </Button>

            <Typography sx={{ mb: 2, fontWeight: "medium", color: "#0A2647" }}>or Create New</Typography>

            <Button
            variant="outlined"
            fullWidth
            sx={{ borderColor: "#0A2647", color: "#0A2647", "&:hover": { backgroundColor: "#D6E4FF" } }}
            onClick={() => navigate("/join-create-group/create-group")}
            >
            Create New
            </Button>
            </Container>
        </GlobalThemeProvider>
    </ThemeProvider>
  );
};

export default LoginSuccessPage;
