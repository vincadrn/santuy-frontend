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
   
const OverviewTrip = () => <Typography>Overview Trip Page</Typography>;  
const Album = () => <Typography>Album Page</Typography>;  
const Keuangan = () => <Typography>Keuangan Page</Typography>;  
const PribadiStuff = () => <Typography>Pribadi Stuff Page</Typography>;  
  
const theme = createTheme({  
  palette: {  
    primary: {  
      main: '#1976d2',  
    },  
  },  
});  
  
const UploadBox = styled(Paper)(({ theme }) => ({  
  backgroundColor: '#1a237e',  
  height: 200,  
  display: 'flex',  
  flexDirection: 'column',  
  justifyContent: 'center',  
  alignItems: 'center',  
  marginBottom: theme.spacing(3),  
  color: 'white',  
}));  
  
const Timeline = ({ items }) => {  
  return (  
    <List>  
      {items.map((item, index) => (  
        <ListItemButton key={index}>  
          <ListItemText primary={`${item.time} - ${item.activity}`} />  
        </ListItemButton>  
      ))}  
    </List>  
  );  
};  
  
const App = () => {  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);  
  const [requirementsOpen, setRequirementsOpen] = useState(false);  
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer  
  
  const timelineItems = [  
    { time: "07:00 - 08:00", activity: "Otw Bandara CGK/SMD/BPN" },  
    { time: "isi jam", activity: "isi aktivitas" },  
    { time: "isi jam", activity: "isi aktivitas" },  
    { time: "isi jam", activity: "isi aktivitas" },  
  ];  
  
  const handleImageUpload = (event) => {  
    // ... (existing image upload code)  
  };  
  
  const toggleDrawer = (open) => (event) => {  
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {  
      return;  
    }  
    setDrawerOpen(open);  
  };  
  
  return (  
    <Router>  
      <ThemeProvider theme={theme}>  
        <Box sx={{ flexGrow: 1 }}>  
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
                  src="/api/placeholder/40/40"  
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
                <ListItemButton component={Link} to="/">  
                  <ListItemText primary="Overview Trip" />  
                </ListItemButton>  
                <ListItemButton component={Link} to="/album">  
                  <ListItemText primary="Album" />  
                </ListItemButton>  
                <ListItemButton component={Link} to="/keuangan">  
                  <ListItemText primary="Keuangan" />  
                </ListItemButton>  
                <ListItemButton component={Link} to="/pribadi-stuff">  
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
                      borderColor: 'white',  
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'  
                    }  
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
  
        <Routes>  
          <Route path="/" element={<OverviewTrip />} />  
          <Route path="/album" element={<Album />} />  
          <Route path="/keuangan" element={<Keuangan />} />  
          <Route path="/pribadi-stuff" element={<PribadiStuff />} />  
        </Routes>  
      </ThemeProvider>  
    </Router>  
  );  
};  
  
export default App;  
