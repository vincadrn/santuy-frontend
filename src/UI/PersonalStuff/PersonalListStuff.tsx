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
  TextField,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme, GlobalThemeProvider } from "../theme";
import CustomDialog from '../Components/CustomDialog';
import useUser from '../../hooks/account/useUser';

const PersonalListStuff = () => {
  const navigate = useNavigate();

  const { data: currentUser, isFetching: currentUserIsFetching } = useUser();

  const [items, setItems] = useState([
    {
      items: [
        { name: 'Moisturizer', checked: false },
        { name: 'Serum', checked: false },
        { name: 'Baju 2 pcs', checked: false },
        { name: 'Celana dalam 1pcs', checked: false },
      ],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = () => {
    if (newItemName.trim() !== '') {
      const updatedItems = [...items];
      updatedItems[0].items.push({ name: newItemName.trim(), checked: false });
      setItems(updatedItems);
      setNewItemName('');
      setOpenDialog(false);
    }
  };

  const handleDeleteItem = (itemIndex: number) => {
    const updatedItems = [...items];
    updatedItems[0].items.splice(itemIndex, 1);
    setItems(updatedItems);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalThemeProvider>
        <Box sx={{ flexGrow: 1 }}>
          {/* App Bar with Back Button */}
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => navigate(-1)}
                aria-label="back"
                sx={{
                  '&:hover': {
                    color: '#B0B0B0',
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
              {currentUserIsFetching
                ? <CircularProgress />
                : currentUser && currentUser.data
                  ? `Hi ${currentUser.data.user_name}!`
                  : ''
              }
            </Typography>
            <Typography sx={{ mb: 4 }}>
              Ini list barang kamu yang perlu dibawa!
            </Typography>

            <List>
              {items.map((category, index) => (
                <Box key={index} sx={{ mb: 3, mr: 3 }}>
                  {category.items.map((item, itemIndex) => (
                    <ListItem key={itemIndex} disableGutters sx={{ pl: 2 }}>
                      <ListItemText primary={`• ${item.name}`} />
                      <Checkbox edge="end" />
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteItem(itemIndex)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </IconButton>
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
            onClick={() => setOpenDialog(true)}
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

          {/* Dialog for Adding Item */}
          <CustomDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            title="Tambah Barang"
            actions={
              <>
                <Button onClick={() => setOpenDialog(false)}>Batal</Button>
                <Button onClick={handleAddItem} variant="contained">
                  Tambah
                </Button>
              </>
            }
          >
            <TextField
              autoFocus
              margin="dense"
              label="Nama Barang"
              fullWidth
              variant="outlined"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
          </CustomDialog>
        </Box>
      </GlobalThemeProvider>
    </ThemeProvider>
  );
};

export default PersonalListStuff;
