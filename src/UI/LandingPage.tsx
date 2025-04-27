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
  TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { theme, GlobalThemeProvider } from './theme';
import { Divider } from '@mui/material';

interface TimelineItem {
  time: string;
  activity: string;
}

// Upload Box styled
const UploadBox = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0A2647',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    height: 150,
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  color: 'white',
}));

// Timeline Component
const Timeline = ({
  items,
  onEdit,
  onDelete,
}: {
  items: TimelineItem[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}) => (
  <Box>
    <List>
      {items.map((item, index) => (
        <Box key={index}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              justifyContent: 'space-between',
              pl: 2,
              gap: 1,
              py: 1,
            }}
          >
            <ListItemText primary={`${item.time} - ${item.activity}`} />
            <Box>
              <Button size="small" onClick={() => onEdit(index)}>Edit</Button>
              <Button size="small" color="error" onClick={() => onDelete(index)}>Hapus</Button>
            </Box>
          </Box>
          {index !== items.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  </Box>
);

// Main Landing Page
const LandingPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const numberOfDays = 3;
  const [currentDay, setCurrentDay] = useState<number | null>(null);

  const [requirementsList, setRequirementsList] = useState<string[]>([
    "Paspor dan visa",
    "Tiket pesawat",
    "Voucher hotel",
    "Uang tunai secukupnya",
    "Pakaian sesuai cuaca",
    "Charger HP dan Powerbank",
    "Obat-obatan pribadi",
  ]);

  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    { time: '07:00 - 08:00', activity: 'Otw Bandara CGK/SMD/BPN' },
    { time: '08:30 - 09:00', activity: 'Check-in dan boarding' },
    { time: '10:00 - 12:00', activity: 'Perjalanan menuju destinasi' },
    { time: '12:30 - 13:00', activity: 'Makan siang' },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editType, setEditType] = useState<'timeline' | 'requirement' | null>(null);

  const [addTimelineDialogOpen, setAddTimelineDialogOpen] = useState(false);
  const [newTime, setNewTime] = useState('');
  const [newActivity, setNewActivity] = useState('');

  const [addRequirementDialogOpen, setAddRequirementDialogOpen] = useState(false);
  const [newRequirement, setNewRequirement] = useState('');

  const handleImageUpload = (event: any) => {
    // handle upload (belum diisi, bisa diatur per hari)
  };

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleEdit = (index: number, type: 'timeline' | 'requirement') => {
    setEditType(type);
    setEditIndex(index);
    if (type === 'timeline') {
      const item = timelineItems[index];
      setEditValue(`${item.time} - ${item.activity}`);
    } else {
      setEditValue(requirementsList[index]);
    }
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null && editType) {
      if (editType === 'timeline') {
        const [time, ...activityParts] = editValue.split(' - ');
        const updatedTimeline = [...timelineItems];
        updatedTimeline[editIndex] = { time: time.trim(), activity: activityParts.join(' - ').trim() };
        setTimelineItems(updatedTimeline);
      } else if (editType === 'requirement') {
        const updatedRequirements = [...requirementsList];
        updatedRequirements[editIndex] = editValue.trim();
        setRequirementsList(updatedRequirements);
      }
    }
    setEditDialogOpen(false);
  };

  const handleDelete = (index: number, type: 'timeline' | 'requirement') => {
    if (type === 'timeline') {
      const updatedTimeline = [...timelineItems];
      updatedTimeline.splice(index, 1);
      setTimelineItems(updatedTimeline);
    } else if (type === 'requirement') {
      const updatedRequirements = [...requirementsList];
      updatedRequirements.splice(index, 1);
      setRequirementsList(updatedRequirements);
    }
  };

  const handleAddTimeline = () => {
    if (newTime.trim() && newActivity.trim()) {
      setTimelineItems([...timelineItems, { time: newTime, activity: newActivity }]);
      setNewTime('');
      setNewActivity('');
      setAddTimelineDialogOpen(false);
    }
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setRequirementsList([...requirementsList, newRequirement]);
      setNewRequirement('');
      setAddRequirementDialogOpen(false);
    }
  };

  return (
    <GlobalThemeProvider>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          {/* AppBar */}
          <AppBar position="static">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 2,
                py: 1,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src="src/UI/assets/logo.png"
                  alt="Logo"
                  sx={{
                    width: { xs: 30, sm: 40 },
                    height: { xs: 30, sm: 40 },
                    borderRadius: '50%',
                  }}
                />
                <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                  TRAVELONIKA
                </Typography>
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

          {/* Drawer */}
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              <Typography variant="h6" sx={{ p: 2 }}>
                TRAVELONIKA
              </Typography>
              <List>
                <ListItemButton component={Link} to="/home"><ListItemText primary="Overview Trip" /></ListItemButton>
                <ListItemButton component={Link} to="/album"><ListItemText primary="Album" /></ListItemButton>
                <ListItemButton component={Link} to="/finance"><ListItemText primary="Keuangan" /></ListItemButton>
                <ListItemButton component={Link} to="/personal-stuff"><ListItemText primary="Pribadi Stuff" /></ListItemButton>
              </List>
            </Box>
          </Drawer>
        </Box>

        {/* Main Content */}
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography variant="h5" sx={{ mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            Hi Angel!
          </Typography>
          <Typography sx={{ mb: 4, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            Ini daftar trip kamu. Happy holidayyy!!
          </Typography>

          {Array.from({ length: numberOfDays }).map((_, index) => (
          <Box key={index} sx={{ mb: 6 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Day {index + 1}
            </Typography>

            {/* Upload Box */}
            <UploadBox>
              <Typography sx={{ mb: 2, textAlign: 'center' }}>
                Upload gambar kamu disini!
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id={`upload-button-${index}`}
              />
              <label htmlFor={`upload-button-${index}`}>
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': {
                      backgroundColor: '#283593',
                    },
                  }}
                >
                  UPLOAD
                </Button>
              </label>
            </UploadBox>

            {/* Timeline */}
            <Timeline
              items={timelineItems}
              onEdit={(idx) => handleEdit(idx, 'timeline')}
              onDelete={(idx) => handleDelete(idx, 'timeline')}
            />

            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => setAddTimelineDialogOpen(true)}>
              + Tambah Timeline Baru
            </Button>

            <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => {
              setCurrentDay(index + 1);
              setRequirementsOpen(true);
            }}>
              Hal yang harus disiapkan
            </Button>

            {/* Tambah Divider antar Day, kecuali terakhir */}
            {index !== numberOfDays - 1 && <Divider sx={{ my: 4 }} />}
          </Box>
        ))}


          {/* Dialog untuk Requirements */}
          <Dialog
            open={requirementsOpen}
            onClose={() => setRequirementsOpen(false)}
            fullWidth
            maxWidth="sm"
            sx={{
              '& .MuiDialog-paper': {
                width: '100%',
                m: { xs: 1, sm: 2 },
                backgroundColor: '#F5F4FF'
              },
            }}
          >
            <DialogTitle sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' }, textAlign: 'center' }}>
              Hal yang Harus Disiapkan {currentDay ? `- Day ${currentDay}` : ''}
            </DialogTitle>

            <DialogContent>
            <List>
              {requirementsList.map((item, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      justifyContent: 'space-between',
                      pl: { xs: 0, sm: 2 },
                      py: 1,
                    }}
                  >
                    <ListItemText
                      primaryTypographyProps={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                      primary={item}
                    />
                    <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
                      <Button size="small" onClick={() => handleEdit(index, 'requirement')}>
                        Edit
                      </Button>
                      <Button size="small" color="error" onClick={() => handleDelete(index, 'requirement')}>
                        Hapus
                      </Button>
                    </Box>
                  </Box>
                  {index !== requirementsList.length - 1 && <Divider />}
                </Box>
              ))}
            </List>


            <Button
              fullWidth
              variant="outlined"
              sx={{
                mt: 2,
                fontSize: { xs: '0.85rem', sm: '0.85rem' },
                py: { xs: 1, sm: 1 },
                backgroundColor: '#F5F4FF',
                color: '#0A2647',
              }}
              onClick={() => setAddRequirementDialogOpen(true)}
            >
              + Tambah Barang Bawaan
            </Button>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button
                onClick={() => setRequirementsOpen(false)}
                variant="contained"
                fullWidth
                sx={{
                  mt: -2,
                  fontSize: { xs: '0.9rem', sm: '0.85rem' },
                  py: { xs: 1, sm: 1 },
                }}
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>


          {/* Dialog Edit Item */}
          <Dialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            fullWidth
            maxWidth="sm"
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: '#F5F4FF',
                },
              },
            }}
          >
            <DialogTitle>Edit</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                margin="dense"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveEdit} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog Add Timeline */}
          <Dialog 
            open={addTimelineDialogOpen} 
            onClose={() => setAddTimelineDialogOpen(false)} 
            fullWidth maxWidth="sm"
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: '#F5F4FF',
                },
              },
            }}
          >
            <DialogTitle>Tambah Timeline Baru</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Jam (contoh: 14:00 - 15:00)"
                variant="outlined"
                margin="dense"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              />
              <TextField
                fullWidth
                label="Kegiatan"
                variant="outlined"
                margin="dense"
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddTimelineDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddTimeline} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog Add Requirement */}
          <Dialog 
            open={addRequirementDialogOpen} 
            onClose={() => setAddRequirementDialogOpen(false)} 
            fullWidth maxWidth="sm"
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: '#F5F4FF',
                },
              },
            }}
          >
            <DialogTitle>Tambah Barang Bawaan</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Barang baru"
                variant="outlined"
                margin="dense"
                value={newRequirement}      
                onChange={(e) => setNewRequirement(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddRequirementDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddRequirement} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>

        </Container>
      </ThemeProvider>
    </GlobalThemeProvider>
  );
};

export default LandingPage;
