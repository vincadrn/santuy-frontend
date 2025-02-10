import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';  

const Album = () => {
  const [days, setDays] = useState([]); // State for days from backend
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer
  const [loading, setLoading] = useState(true); // State for loading

  const dummyDays = ['Day 1', 'Day 2', 'Day 3'];
  const navigate = useNavigate();

  const theme = createTheme({  
    palette: {  
      primary: {  
        main: '#0A2647',  
      },  
    },  
  });  

  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Fetch data from backend
//   useEffect(() => {
//     const fetchDays = async () => {
//       try {
//         const response = await fetch('https://api.example.com/album-days'); // Ganti dengan URL API backend Anda
//         const data = await response.json();
//         setDays(data); // Asumsikan data berupa array: ["Day 1", "Day 2", "Day 3"]
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching days:', error);
//         setLoading(false);
//       }
//     };

//     fetchDays();
//   }, []);

  return (
    <ThemeProvider theme={theme}> 
      <Box sx={{ flexGrow: 1 }}>
        {/* App Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            py: 1,
            backgroundColor: '#0A2647',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box  
                component="img"  
                src="src\assets\logo.png"  
                alt="Logo"  
                sx={{ width: 40, height: 40, borderRadius: '50%' }}  
              />  
            <Typography variant="h6" sx={{ color: 'white' }}>
              TRAVELONIKA
            </Typography>
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ color: 'white' }}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Drawer */}
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
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
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Hi Angel!
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Ini ALBUM FOTO kita selama trip kita
          </Typography>

          {/* Render buttons for each day
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (
            days.map((day, index) => (
              <Button
                key={index}
                variant="contained"
                fullWidth
                sx={{
                  mb: 2,
                  backgroundColor: '#1a237e',
                  '&:hover': {
                    backgroundColor: '#283593',
                  },
                }}
              >
                {day}
              </Button>
            ))
          )} */}

          {/* Render dummy buttons */}
          {dummyDays.map((day, index) => (
            <Button
              key={index}
              variant="contained"
              fullWidth
              sx={{
                mb: 2,
                backgroundColor: '#0A2647',
                '&:hover': {
                  backgroundColor: '#283593',
                },
              }}
              onClick={() => navigate(`/album/${day.toLowerCase().replace(' ', '-')}`)}
            >
              {day}
            </Button>
          ))}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Album;
