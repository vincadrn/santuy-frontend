import { useState } from 'react';  
import {  
  AppBar,  
  Box,  
  Button,  
  Container,  
  Dialog,  
  DialogActions,  
  DialogContent,  
  DialogTitle,  
  IconButton,  
  Paper,  
  Typography,  
  styled,  
  List,  
  ListItemButton,  
  ListItemText,  
  Drawer,  
} from '@mui/material';  
import MenuIcon from '@mui/icons-material/Menu';  
import { ThemeProvider, createTheme } from '@mui/material/styles';  
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  

interface TimelineItem {
  time: string;
  activity: string;
}

interface TimelineProps {
  items: TimelineItem[];
}
   
const OverviewTrip = () => <Typography>Overview Trip Page</Typography>;  
const Album = () => <Typography>Album Page</Typography>;  
const Keuangan = () => <Typography>Keuangan Page</Typography>;  
const PribadiStuff = () => <Typography>Pribadi Stuff Page</Typography>;  
  
const theme = createTheme({  
  palette: {  
    primary: {  
      main: '#0A2647',  
    },  
  },  
});  
  
const UploadBox = styled(Paper)(({ theme }) => ({  
  backgroundColor: '#0A2647',  
  height: 200,  
  display: 'flex',  
  flexDirection: 'column',  
  justifyContent: 'center',  
  alignItems: 'center',  
  marginBottom: theme.spacing(3),  
  color: 'white',  
}));  
  
const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box>
      <List>
        {items.map((item: any, index: any) => (
          <ListItemButton key={index} onClick={() => handleItemClick(item)}>
            <ListItemText primary={`${item.time} - ${item.activity}`} />
          </ListItemButton>
        ))}
      </List>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        {/* <DialogTitle>{selectedItem?.time}</DialogTitle> */}
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {/* {selectedItem?.activity} */}
          </Typography>
          <Button variant="outlined" fullWidth>
            CEK FOTO
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="contained" fullWidth>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
  
const LandingPage = () => {  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);  
  const [requirementsOpen, setRequirementsOpen] = useState(false);  
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer  
  
  const timelineItems = [
    { time: '07:00 - 08:00', activity: 'Otw Bandara CGK/SMD/BPN' },
    { time: '08:30 - 09:00', activity: 'Check-in dan boarding' },
    { time: '10:00 - 12:00', activity: 'Perjalanan menuju destinasi' },
    { time: '12:30 - 13:00', activity: 'Makan siang' },
  ];
  
  const handleImageUpload = (event: any) => {  
    // ... (existing image upload code)  
  };  
  
  const toggleDrawer = (open: any) => (event: any) => {  
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {  
      return;  
    }  
    setDrawerOpen(open);  
  };  

  // BACKEND CONNECTION
  // const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer
  // const [timelineItems, setTimelineItems] = useState([]); // State for timeline items
  // const [loading, setLoading] = useState(true); // State for loading

  // const toggleDrawer = (open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setDrawerOpen(open);
  // };

  // // Fetch data from backend
  // useEffect(() => {
  //   const fetchTimelineItems = async () => {
  //     try {
  //       const response = await fetch('https://api.example.com/timeline'); // Ganti URL dengan endpoint backend Anda
  //       const data = await response.json();
  //       setTimelineItems(data); // Asumsikan data dari backend berbentuk array [{ time, activity }]
  //       setLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching timeline items:', error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchTimelineItems();
  // }, []);
  
  return (  
    <ThemeProvider theme={theme}>  
      <Box sx={{ flexGrow: 1,  }}>  
        <AppBar position="static">  
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

        <Container maxWidth="md" sx={{ py: 3 }}>  
          <Typography variant="h5" sx={{ mb: 1 }}>  
            Hi Angel !  
          </Typography>  
          <Typography sx={{ mb: 4 }}>  
            Ini daftar trip kamu.. Happy holidayyy !!  
          </Typography>  

          <Typography variant="h6" sx={{ mb: 2 }}>  
            Day 1  
          </Typography>  

          <UploadBox>  
            <Typography sx={{ mb: 2 }}>  
              Upload gambar destinasi  
            </Typography>  
            <input  
              type="file"  
              accept="image/*"  
              onChange={handleImageUpload}  
              style={{ display: 'none' }}  
              id="upload-button"  
            />  
            <label htmlFor="upload-button">  
              <Button  
                variant="outlined"  
                component="span"  
                sx={{   
                  color: 'white',  
                  borderColor: 'white',  
                  '&:hover': {
                    backgroundColor: '#283593',
                  },
                }}  
              >  
                UPLOAD  
              </Button>  
            </label>  
          </UploadBox>  

          {/* Render the Timeline component here */}  
          <Timeline items={timelineItems} />  

          <Button  
            variant="outlined"  
            fullWidth  
            onClick={() => setRequirementsOpen(true)}  
            sx={{ mt: 4 }}  
          >  
            hal yang harus disiapkan  
          </Button>  

          <Dialog   
            open={requirementsOpen}   
            onClose={() => setRequirementsOpen(false)}  
            fullWidth  
            maxWidth="sm"  
          >  
            <DialogTitle>Requirements</DialogTitle>  
            <DialogContent>  
              <Typography>List of things to prepare...</Typography>  
            </DialogContent>  
            <DialogActions>  
              <Button   
                onClick={() => setRequirementsOpen(false)}   
                variant="contained"  
                fullWidth  
              >  
                Confirm  
              </Button>  
            </DialogActions>  
          </Dialog>  
        </Container>  
      </Box>  

      {/* <Routes>  
        <Route path="/home" element={<OverviewTrip />} />  
        <Route path="/album" element={<Album />} />  
        <Route path="/keuangan" element={<Keuangan />} />  
        <Route path="/personal" element={<PribadiStuff />} />  
      </Routes>   */}
    </ThemeProvider>  
  );  
};  
  
export default LandingPage;  