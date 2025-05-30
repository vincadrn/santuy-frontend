import { useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    CircularProgress,
    Container,
    Drawer,
    IconButton,
    Typography,
    styled,
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import { ThemeProvider } from '@mui/material/styles';
  // import { BrowserRouter as Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  import { theme, GlobalThemeProvider } from "../theme";
  import SidebarNavigation from '../Components/SidebarNavigation';
import useUser from '../../hooks/account/useUser';

  const StyledButton = styled(Button)(({ }) => ({
    backgroundColor: '#0A2647',
    color: 'white',
    padding: '12px',
    width: '100%',
    marginBottom: '16px',
    '&:hover': {
      backgroundColor: '#283593',
    },
  }));

  export default function PersonalStuffPage() {
    const { data: currentUser, isFetching: currentUserIsFetching } = useUser();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open: any) => (event: any) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDrawerOpen(open);
    };

    return (
      <ThemeProvider theme={theme}>
        <GlobalThemeProvider>
          <Box sx={{ flexGrow: 1}}>
            <AppBar position="static" sx={{ bgcolor: '#0A2647' }}>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                py: 1
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    component="img"
                    src="src/UI/assets/logo.png"
                    alt="Logo"
                    sx={{ width: 40, height: 40, borderRadius: '50%' }}
                  />
                  <Typography variant="h6">TRAVELONIKA</Typography>
                </Box>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </AppBar>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <SidebarNavigation />
              </Box>
            </Drawer>

            {/* Main Content */}
            <Container maxWidth="sm" sx={{ py: 3 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {currentUserIsFetching
                    ? <CircularProgress />
                    : currentUser && currentUser.data
                      ? `Hi ${currentUser.data.user_name}!`
                      : ''
                  }
                </Typography>
                <Typography>
                  Ini personal stuff kamu
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ mt: 4, }}>
                <StyledButton variant="contained" onClick={() => navigate('/personal-stuff/list')}>
                  List Barang yang harus dibawa
                </StyledButton>

                <StyledButton variant="contained" onClick={() => navigate('/personal-stuff/personal-finance')}>
                  Keuangan Pribadi
                </StyledButton>
              </Box>
            </Container>
          </Box>
        </GlobalThemeProvider>
      </ThemeProvider>
    );
  }
