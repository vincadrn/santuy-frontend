import { Box, Container, Typography, CssBaseline, GlobalStyles, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { theme } from "./theme";
import { useLogin } from '../hooks/auth/useLogin';
import { useSession } from '../hooks/auth/useSession';
import travelonikaLogo from '../assets/logo.png';

export const OAuthPage = () => {
  const { status } = useSession(window.location.toString());
  const navigate = useNavigate();

  if (status == "success") {
    navigate("/");
  } else if (status == "error") {
    navigate("/login");
  }

  return (
    <>
    {status == 'pending' ? 'Redirecting' : ''}
    </>
  )
}

const LoginPage = () => {
  const { executeLogin, status } = useLogin();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{ body: { backgroundColor: '#F5F4FF' } }} />

      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}
      >
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <img
            src={travelonikaLogo}
            alt="Travelonika Logo"
            style={{ width: 50, height: 50 }}
          />
          <Typography variant="h4">Welcome to Travelonika</Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          Please sign in with Google to continue
        </Typography>

        {status == "pending" ?
          <CircularProgress /> :
          <Box sx={{ mt: 4 }}>
            <GoogleButton
            onClick={async () => await executeLogin()}
            style={{ backgroundColor: '#0A2647' }}
            ></GoogleButton>
          </Box>
        }
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
