import { useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Typography,
    styled,
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
  import { ThemeProvider, createTheme } from '@mui/material/styles';
  import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
    },
  });
  
  // Custom styled button for dark blue buttons
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
        <Box sx={{ flexGrow: 1, bgcolor: '#FFFFFF' }}>
          {/* App Bar */}
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
                  src="src\assets\logo.png"  
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
              <Typography variant="h6" sx={{ p: 2 }}>  
                TRAVELONIKA  
              </Typography>  
              <List>  
                <ListItemButton component={Link} to="/home">  
                  <ListItemText primary="Overview Trip" />  
                </ListItemButton>  
                <ListItemButton component={Link} to="/album">  
                  <ListItemText primary="Album" />  
                </ListItemButton>  
                <ListItemButton component={Link} to="/keuangan">  
                  <ListItemText primary="Keuangan" />  
                </ListItemButton>  
                <ListItemButton component={Link} to="/personal-stuff">  
                  <ListItemText primary="Pribadi Stuff" />  
                </ListItemButton>  
              </List>  
            </Box>  
          </Drawer>  
  
          {/* Main Content */}
          <Container maxWidth="sm" sx={{ py: 3 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Hi Angel !
              </Typography>
              <Typography color="text.secondary">
                Ini Pribadi Stuff kamu
              </Typography>
            </Box>
  
            {/* Action Buttons */}
            <Box sx={{ mt: 4, }}>
              <StyledButton variant="contained" onClick={() => navigate('/personal-stuff/list')}>
                List Barang yang harus dibawa
              </StyledButton>
              
              <StyledButton variant="contained" onClick={() => navigate('/personal-stuff/finance')}>
                Keuangan Pribadi
              </StyledButton>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }