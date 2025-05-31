import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Typography,
  styled,
  List,
  ListItemText,
  Drawer,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider } from '@mui/material/styles';
import { theme, GlobalThemeProvider } from './theme';
import { Divider } from '@mui/material';
import SidebarNavigation from './Components/SidebarNavigation';
import CustomDialog from './Components/CustomDialog';
import { Itinerary, ItineraryDetail } from '../services/itineraryService';
import { useItinerary, useItineraryDetail } from '../hooks/itinerary/useItinerary';
import useUser from '../hooks/account/useUser';
import usePicture from '../hooks/media/usePicture';
import travelonikaLogo from "./assets/logo.png";

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
  items: ItineraryDetail[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}) => {

  return (
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
              <ListItemText primary={`${item.start_time} - ${item.end_time} ${item.activity}`} />
              <Box>
              {/* Temporarily disabled these buttons until ready for impl */}
                <Button disabled size="small" onClick={() => onEdit(index)}>Edit</Button>
                <Button disabled size="small" color="error" onClick={() => onDelete(index)}>Hapus</Button>
              </Box>
            </Box>
            {index !== items.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Box>
  )
};

const ItineraryDay = ({ dayNumber, itinerary }: { dayNumber: number, itinerary: Itinerary }) => {
  const { mutateAsync: picturesMutateAsync, status: picturesStatus } = usePicture('upload', itinerary.itinerary_id);
  const { response: itineraryDetailsResponse, status: itineraryDetailsStatus} = useItineraryDetail(itinerary.itinerary_id);

  // Setting this to no-op until ready for impl
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) picturesMutateAsync(file);
  };

  // Setting this to no-op until ready for impl
  const handleSaveEdit = () => {

  };

  // Setting this to no-op until ready for impl
  const handleDelete = (index: number, type: 'timeline' | 'requirement') => {

  };

  // Setting this to no-op until ready for impl
  const handleEdit = (index: number, type: 'timeline' | 'requirement') => {

  };

  // Setting this to no-op until ready for impl
  const handleAddTimeline = () => {

  };

  // Setting this to no-op until ready for impl
  const handleAddRequirement = () => {

  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Day {dayNumber}
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
          id={`upload-button-${itinerary.itinerary_id}`}
        />
        <label htmlFor={`upload-button-${itinerary.itinerary_id}`}>
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
        <Snackbar open={picturesStatus !== 'idle'} autoHideDuration={3000}>
          {picturesStatus === 'success'
            ? (
              <Alert severity='success' variant='filled'>
                Upload successful!
              </Alert>
            )
            : picturesStatus === 'error'
              ? (
                  <Alert severity='error' variant='filled'>
                    Upload failed!
                  </Alert>
                )
              : <></>
          }
        </Snackbar>
      </UploadBox>

      {/* Timeline */}
      {itineraryDetailsStatus !== "pending"
        ? <Timeline
          items={itineraryDetailsResponse && itineraryDetailsResponse.data ? itineraryDetailsResponse.data : []}
          onEdit={(idx) => handleEdit(idx, 'timeline')}
          onDelete={(idx) => handleDelete(idx, 'timeline')}
          />
        : <CircularProgress />
      }

      {/* Disabling the button until ready for impl */}
      {/* <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => setAddTimelineDialogOpen(true)}> */}
      <Button disabled variant="contained" fullWidth sx={{ mt: 2 }}>
        + Tambah Timeline Baru
      </Button>

      {/* Disabling the button until ready for impl */}
      {/*<Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => {
        setCurrentDay(index + 1);
        setRequirementsOpen(true);
      }}>
      */}
      <Button disabled variant="outlined" fullWidth sx={{ mt: 2 }} onClick={() => {
      }}>
        Hal yang harus disiapkan
      </Button>

      {/*index !== numberOfDays - 1 && <Divider sx={{ my: 4 }} />*/}
    </Box>
  );
};

// Main Landing Page
const ItineraryPage = () => {
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: currentUser, isFetching: currentUserIsFetching } = useUser();
  const { response: itinerariesResponse, status: itinerariesStatus } = useItinerary();

  // Setting this to no-op until ready for impl
  const handleEdit = (index: number, type: 'timeline' | 'requirement') => {

  };

  // Setting this to no-op until ready for impl
  const handleDelete = (index: number, type: 'timeline' | 'requirement') => {

  };

  const [requirementsList, setRequirementsList] = useState<string[]>([
    "Paspor dan visa",
    "Tiket pesawat",
    "Voucher hotel",
    "Uang tunai secukupnya",
    "Pakaian sesuai cuaca",
    "Charger HP dan Powerbank",
    "Obat-obatan pribadi",
  ]);

  const [addRequirementDialogOpen, setAddRequirementDialogOpen] = useState(false);
  const [newRequirement, setNewRequirement] = useState('');

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
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
                  src={travelonikaLogo}
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
              <SidebarNavigation />
            </Box>
          </Drawer>
        </Box>

        {/* Main Content */}
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Typography variant="h5" sx={{ mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            {currentUserIsFetching
              ? <CircularProgress />
              : currentUser && currentUser.data
                ? `Hi ${currentUser.data.user_name}!`
                : ''
            }
          </Typography>
          <Typography sx={{ mb: 4, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {itinerariesResponse && itinerariesResponse.data
              ? 'Ini daftar trip kamu. Happy holiday!'
              : ''
            }
            
          </Typography>

          {/* ItineraryDay */}
          {itinerariesResponse?.data.map((itinerary, idx) => {
            return <ItineraryDay dayNumber={idx + 1} itinerary={itinerary} key={itinerary.itinerary_id} />
          })}


          {/* Dialog untuk Requirements */}
          <CustomDialog
            open={requirementsOpen}
            onClose={() => setRequirementsOpen(false)}
            //title={`Hal yang Harus Disiapkan ${currentDay ? `- Day ${currentDay}` : ''}`}
            actions={
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => setAddRequirementDialogOpen(true)}
                  sx={{
                    fontSize: { xs: '0.85rem', sm: '0.85rem' },
                    py: { xs: 1, sm: 1 },
                    backgroundColor: '#F5F4FF',
                    color: '#0A2647',
                    borderColor: '#0A2647',
                  }}
                >
                  + Tambah Barang Bawaan
                </Button>
                <Button
                  onClick={() => setRequirementsOpen(false)}
                  variant="contained"
                  fullWidth
                  sx={{
                    fontSize: { xs: '0.85rem', sm: '0.85rem' },
                    py: { xs: 1, sm: 1 },
                  }}
                >
                  Confirm
                </Button>
              </Box>
            }
          >
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
                      primary={item}
                      slotProps={{
                        primary: {
                          sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                        }
                      }}
                    />
                    <Box sx={{ display: 'flex', gap: 1, mt: { xs: 1, sm: 0 } }}>
                      {/* Temporarily disabled these buttons until ready for impl */}
                      <Button disabled size="small" onClick={() => handleEdit(index, 'requirement')}>
                        Edit
                      </Button>
                      <Button disabled size="small" color="error" onClick={() => handleDelete(index, 'requirement')}>
                        Hapus
                      </Button>
                    </Box>
                  </Box>
                  {index !== requirementsList.length - 1 && <Divider />}
                </Box>
              ))}
            </List>

            {/* <Button
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
            </Button> */}
          </CustomDialog>

          {/* Dialog Edit Item */}
          {/*
          <CustomDialog
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            title="Edit"
            actions={
              <>
                <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveEdit} variant="contained">Save</Button>
              </>
            }
          >
            <TextField
              fullWidth
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              margin="dense"
            />
          </CustomDialog>
          */}

          {/* Dialog Add Timeline */}
          {/*
          <CustomDialog
            open={addTimelineDialogOpen}
            onClose={() => setAddTimelineDialogOpen(false)}
            title="Tambah Timeline Baru"
            actions={
              <>
                <Button onClick={() => setAddTimelineDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddTimeline} variant="contained">Save</Button>
              </>
            }
          >
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
              sx={{ mt: 2 }}
            />
          </CustomDialog>
          */}

          {/* Dialog Add Requirement */}
          {/*
          <CustomDialog
            open={addRequirementDialogOpen}
            onClose={() => setAddRequirementDialogOpen(false)}
            title="Tambah Barang Bawaan"
            actions={
              <>
                <Button onClick={() => setAddRequirementDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddRequirement} variant="contained">Save</Button>
              </>
            }
          >
            <TextField
              fullWidth
              label="Barang baru"
              variant="outlined"
              margin="dense"
              value={newRequirement}
              onChange={(e) => setNewRequirement(e.target.value)}
            />
          </CustomDialog>
          */}
        </Container>
      </ThemeProvider>
    </GlobalThemeProvider>
  );
};

export default ItineraryPage;
