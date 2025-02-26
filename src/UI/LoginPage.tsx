import { useEffect } from 'react';
import { Box, Container, Typography, AppBar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const API_HOST: string = import.meta.env.VITE_API_HOST || '';

type LoginResponse = {
  status: number;
  oauth_url: string;
}

type SessionRequest = {
  redirect_uri: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export const OAuthPage = () => {
  const sessionURL = API_HOST + '/v1/auth/session';

  const navigate = useNavigate();

  const requestSession = async () => {
    const body: SessionRequest = {
      'redirect_uri': window.location.toString(),
    }

    console.log('Redirecting to ' + body.redirect_uri);

    const res = await fetch(sessionURL, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      //alert("Cannot create session!");
      navigate('/login');
    } else {
      navigate('/home');
    }
  }

  // Only one-time effect, no component render
  useEffect(() => {
    console.log("In effect...");
    requestSession();
  }, []);
}

const LoginPage = () => {
  const loginURL = API_HOST + '/v1/auth/login';

  const requestLogin = async () => {
    const requestURL: string = await fetch(loginURL, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then((data: LoginResponse) => data.oauth_url)
      .catch(() => {
        alert("Login failed!");
        return ""
      });

    window.location.href = requestURL;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary" sx={{ padding: 2 }}>
        <Typography variant="h6" align="center" color="inherit">
          TRAVELONIKA
        </Typography>
      </AppBar>
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
        <Typography variant="h4" gutterBottom>
          Welcome to Travelonika
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please sign in with Google to continue
        </Typography>

        <Box sx={{ mt: 4 }}>
          <GoogleButton
          onClick={async () => await requestLogin()}
          ></GoogleButton>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
