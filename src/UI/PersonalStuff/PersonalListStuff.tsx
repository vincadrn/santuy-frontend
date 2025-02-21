import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Checkbox,
  Container,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2647',
    },
  },
});

const ListStuff = () => {
  const navigate = useNavigate();
  const [items] = useState([
    {
      category: 'Skincare',
      items: [
        { name: 'Moisturizer', checked: false },
        { name: 'Serum', checked: false },
      ],
    },
    {
      category: 'Pakaian',
      items: [
        { name: 'Baju 2 pcs', checked: false },
        { name: 'Celana dalam 1pcs', checked: false },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}}>
        {/* App Bar with Back Button */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate(-1)} // Go back to the previous page
              aria-label="back"
              sx={{
                '&:hover': {
                  color: '#B0B0B0', // Ganti dengan warna yang diinginkan
                },
                mr: 1,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              TRAVELONIKA
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            Hi Angel !
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Ini Pribadi Stuff kamu
          </Typography>

          <List>
            {items.map((category, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="subtitle1" fontWeight="medium" sx={{ mb: 1 }}>
                  {category.category}
                </Typography>
                {category.items.map((item, itemIndex) => (
                  <ListItem key={itemIndex} disableGutters sx={{ pl: 2 }}>
                    <ListItemText primary={`• ${item.name}`} />
                    <Checkbox edge="end" />
                  </ListItem>
                ))}
              </Box>
            ))}
          </List>
        </Container>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            width: 70,
            height: 70,
            '&:hover': {
                  backgroundColor: '#283593',
                },
          }}
        >
          <AddIcon />
        </Fab>
      </Box>
    </ThemeProvider>
  );
};

export default ListStuff;
