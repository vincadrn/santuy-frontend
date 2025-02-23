import { useEffect } from 'react';
import { Box, Button, Container, Typography, AppBar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const LoginPage = () => {
  const navigate = useNavigate();

  const clientId = 'YOUR_GOOGLE_OAUTH_CLIENT_ID'; // Replace with your Google OAuth Client ID

  const onSuccess = (response: any) => {
    // You can send this token to your backend to verify and authenticate the user
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

  const onFailure = (response: any) => {
    console.error('Login failed', response);
    alert('Login failed! Redirecting to the homepage...');
    navigate('/home'); // Redirect to the landing page
  };

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
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
