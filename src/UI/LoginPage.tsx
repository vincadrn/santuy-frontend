import { useEffect } from 'react';
import { Box, Button, Container, Typography, AppBar, CssBaseline, GlobalStyles } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2647',
    },
    background: {
      default: '#F5F4FF', 
    },
  },
});

const LoginPage = () => {
  const navigate = useNavigate();

  const clientId = 'YOUR_GOOGLE_OAUTH_CLIENT_ID'; // Replace with your Google OAuth Client ID

  const onSuccess = (response: any) => {
    const token = response.tokenId;

    fetch('http://your-backend-url/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/');
        } else {
          alert('Authentication failed!');
        }
      })
      .catch((err) => console.error(err));
  };

  const onFailure = () => {
    console.error('Login failed');
    //alert('Login failed! Redirecting to the homepage...');
    navigate('/JoinCreateGroup'); 
  };

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
            src="src\assets\logo.png" 
            alt="Travelonika Logo"
            style={{ width: 50, height: 50 }}
          />
          <Typography variant="h4">Welcome to Travelonika</Typography>
        </Box>

        <Typography variant="body1" gutterBottom>
          Please sign in with Google to continue
        </Typography>

        <Box sx={{ mt: 4 }}>
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
          />
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
