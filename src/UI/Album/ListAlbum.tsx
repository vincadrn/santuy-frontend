import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Container, Grid, Item, ImageList, ImageListItem, Typography, Button, IconButton, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { theme, GlobalThemeProvider } from "../theme";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { a } from 'framer-motion/client';
import { base } from 'framer-motion/m';
import pLimit from 'p-limit';

// Limit async worker to only 2 at once
// Backend infra is cheap and fragile :(
const limit = pLimit(2);

type TripImageItemProps = {
  identifier: string,
  url: string,
}

type TripImageAlbumProps = {
  sources: TripImageItemProps[],
};

const TripImageItem: React.FC<TripImageItemProps> = ({identifier, url}) => {
  const [imageData, setImageData] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const imageRef = useRef<HTMLLIElement>(null); // null reference to img for observer

  useEffect(() => {
    let abortFetch = false; // useEffect cleanup

    // Look in session storage first
    const cachedData = sessionStorage.getItem(identifier)
    if (cachedData) {
      setImageData(cachedData);
      return;
    }

    // Fetch only if cache miss happens
    const fetchImageData = async () => {
      if (!abortFetch && isVisible) {
        await fetch(url)
          .then(response => response.json())
          .then(data => data.image as string)
          .then(img => {
            // Apart from updating state, insert img in cache
            setImageData(img);
            sessionStorage.setItem(identifier, img);
          })
          .catch(error => {
            console.error(error);
          })
      }
    }

    limit(() => fetchImageData());

    return () => {
      abortFetch = true;
    }
  }, [url, isVisible]);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.2 }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Once visible, it will stay that way
        setIsVisible(prev => prev === false ? entry.isIntersecting : prev);
      });
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    }
  }, [imageRef]);

  return (
    <ImageListItem key={identifier} ref={imageRef}>
      {
        imageData !== "" ? (
          <img src={imageData} alt={identifier} />
        ) : (
          <CircularProgress />
        )
      }
    </ImageListItem>
  );
}

const TripImageAlbum: React.FC<TripImageAlbumProps> = ({sources}) => {
  return (
    <>
      {
        sources.map(source => (
          <TripImageItem key={source.identifier} identifier={source.identifier} url={source.url} />
        ))
      }
    </>
  );
}

// TODO: Should use the actual response instead of the mock one
const TripImageAlbumList = () => {
  const navigate = useNavigate();

  const mockTripAlbumResponse = [
    {
      day: "Day 1 - desc 1",
      endpoints: [
        { identifier: "1", url: "http://localhost:9000/v1/picture/1"},
        { identifier: "2", url: "http://localhost:9000/v1/picture/1"},
        { identifier: "3", url: "http://localhost:9000/v1/picture/1"},
        { identifier: "4", url: "http://localhost:9000/v1/picture/1"},
        { identifier: "5", url: "http://localhost:9000/v1/picture/1"},
      ],
    },
    {
      day: "Day 1 - desc 2",
      endpoints: [
        { identifier: "6", url: "http://localhost:9000/v1/picture/1"},
        { identifier: "7", url: "http://localhost:9000/v1/picture/1"},
        { identifier: "8", url: "http://localhost:9000/v1/picture/1"},
        { identifier: "9", url: "http://localhost:9000/v1/picture/1"},
        { identifier: "10", url: "http://localhost:9000/v1/picture/1"},
      ],
    },
  ];

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
            Hi Angel!
          </Typography>
          <Typography sx={{ mb: 4 }}>
            Ini ALBUM Foto selama trip kita
          </Typography>
            {
              mockTripAlbumResponse.map(({day, endpoints}) => (
                <Box key={day} sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {day}
                  </Typography>
                  <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    <TripImageAlbum sources={endpoints}/>
                  </ImageList>
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
              ))
            }
        </Container>
      </Box>
      </GlobalThemeProvider>
    </ThemeProvider>
  );
}

export default TripImageAlbumList;
