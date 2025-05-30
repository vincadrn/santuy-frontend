import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useMatches, useNavigate, useParams } from 'react-router-dom';
import { AppBar, Box, Container, ImageList, ImageListItem, Typography, IconButton, CircularProgress, private_createTypography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { theme, GlobalThemeProvider } from "../theme";
import { ThemeProvider } from '@mui/material/styles';
import pLimit from 'p-limit';
import { useItinerary } from '../../hooks/itinerary/useItinerary';
import usePicture from '../../hooks/media/usePicture';
import { number } from 'yup';
import useUser from '../../hooks/account/useUser';
import { Itinerary } from '../../services/itineraryService';
import { PictureResponse } from '../../services/mediaService';
import { AxiosResponse } from 'axios';

// Limit async worker to only 2 at once
// Backend infra is cheap and fragile :(
const limit = pLimit(2);

type TripImageItemProps = {
  children?: React.ReactNode,
  url: string,
}

type TripImageAlbumProps = {
  itinerary: Itinerary,
};

const TripImageItem: React.FC<TripImageItemProps> = ({ url }) => {
  return (
    <ImageListItem key={url}>
      <img src={url} alt={'img'} />
    </ImageListItem>
  );

}

const TripImageAlbum: React.FC<TripImageAlbumProps> = ({ itinerary }) => {
  const { data: pictures, status: status, isFetching: isFetching } = usePicture('itinerary', itinerary.itinerary_id);
  
  return (
    <>
      {pictures && pictures.data && Array.isArray(pictures.data) ? (
        <ImageList cols={2} gap={8}>
          {pictures.data.map(picture => (
            <TripImageItem key={picture.picture_uri} url={picture.picture_uri} />
          ))}
        </ImageList>
      ) : isFetching ? (
        <CircularProgress />
      ) : (
        <Typography>No pictures found</Typography>
      )}
    </>
  );
}

const TripImageAlbumList = () => {
  const navigate = useNavigate();
  const param = useParams();

  useEffect(() => {
    console.log(param);
    console.log(param.day);
  }, [ param ]);

  const { data: currentUser, isFetching: currentUserIsFetching } = useUser();
  const { response: itinerariesResponse, status: itinerariesStatus } = useItinerary(); 

  // Ensure itinerary updates when day changes
  //const itinerary = param && param.day && itinerariesResponse
  //? itinerariesResponse.data[Number(param.day) - 1]
  //: undefined;
  const itinerary = useMemo(() => {
    return param && param.day ? itinerariesResponse?.data[Number(param.day) - 1] : undefined;
  }, [ param ]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalThemeProvider>
        <Box>
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: '#0A2647', px: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
            <IconButton
              color="inherit"
              onClick={() => navigate(-1)}
              sx={{
                '&:hover': {
                  color: '#B0B0B0',
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
            {currentUserIsFetching
              ? <CircularProgress />
              : currentUser && currentUser.data
                ? `Hi ${currentUser.data.user_name}!`
                : ''
            }
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Ini album foto selama trip kita
          </Typography>
          {
            itinerary
              ? <TripImageAlbum itinerary={itinerary} />
              : <></>
          }
        </Container>
      </Box>
      </GlobalThemeProvider>
    </ThemeProvider>
  );
}

export default TripImageAlbumList;
