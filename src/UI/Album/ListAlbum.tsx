import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, Grid, Typography, Button, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ListAlbum = () => {
  const navigate = useNavigate();

  const dummyAlbums = [
    {
      day: 'Day 1 - OTW Bandara',
      images: Array(9).fill(''), // Dummy data for 9 images
    },
    {
      day: 'Day 1 - isi sendiri',
      images: Array(9).fill(''), // Dummy data for 9 images
    },
  ];

  return (
    <Box>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#0A2647', px: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
          <IconButton
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{
              '&:hover': {
                color: '#B0B0B0', // Ganti dengan warna yang diinginkan
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TRAVELONIKA
          </Typography>
        </Box>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Hi Angel!
        </Typography>
        <Typography sx={{ mb: 4 }}>
          Ini ALBUM Foto selama trip kita
        </Typography>

        {dummyAlbums.map((album, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {album.day}
            </Typography>
            <Grid container spacing={2}>
              {album.images.map((_, idx) => (
                <Grid
                  item
                  xs={4}
                  key={idx}
                  sx={{
                    height: 100,
                    backgroundColor: '#0A2647',
                    borderRadius: 1,
                  }}
                ></Grid>
              ))}
            </Grid>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#0A2647',
                '&:hover': {
                  backgroundColor: '#283593',
                },
              }}
            >
              See More
            </Button>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default ListAlbum;
