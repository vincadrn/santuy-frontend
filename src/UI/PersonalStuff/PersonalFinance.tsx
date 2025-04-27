import { useState } from 'react';
import {
  AppBar,
  Box,
  Container,
  Fab,
  IconButton,
  Paper,
  Typography,
  Button,
  Drawer,
  TextField,
  Toolbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider } from '@mui/material/styles';
import { theme, GlobalThemeProvider } from "../theme";
import { useNavigate } from 'react-router-dom';
import SidebarNavigation from '../Components/SidebarNavigation';
import CustomDialog from '../Components/CustomDialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// interface BudgetItem {
//   category: string;
//   items: {
//     name: string;
//     amount: number;
//   }[];
// }

// const StyledFab = styled(Fab)({
//   position: 'fixed',
//   bottom: 16,
//   right: 16,
// });

// const StyledHistoryButton = styled(Button)(({ theme }) => ({
//   position: 'fixed',
//   bottom: 16,
//   right: 96,
//   backgroundColor: theme.palette.primary.main,
//   color: 'white',
//   '&:hover': {
//     backgroundColor: theme.palette.primary.dark,
//   },
// }));

export default function PersonalFinancePage() {
  const navigate = useNavigate();

  const [totalBudget] = useState(3000000);
  const [budgetItems, setBudgetItems] = useState([
    {
      category: 'Transportasi',
      items: [
        { name: 'Mobil Avanza', amount: 1800000 },
        { name: 'Bensin', amount: 1200000 },
      ],
    },
  ]);

  const [formOpen, setFormOpen] = useState(false); 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', amount: 0 });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const toggleDrawer = (open: any) => (event: any) => {  
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {  
      return;  
    }  
    setDrawerOpen(open);  
  };  

  const handleAddButtonClick = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = () => {
      setBudgetItems((prevItems) => [
        ...prevItems,
        {
          category: 'Miscellaneous', 
          items: [{ name: formData.name, amount: formData.amount }],
        },
      ]);
      setFormOpen(false); 
    };

  return (
    <ThemeProvider theme={theme}>
      <GlobalThemeProvider>
        <Box sx={{ flexGrow: 1 }}>
          {/* App Bar */}
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
              <SidebarNavigation />
            </Box>  
          </Drawer>  

          {/* Main Content */}
          <Container maxWidth="md" sx={{ py: 3 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ mb: 1 }}>
                Hi Angel !
              </Typography>
              <Typography>
                Ini detail keuangan pribadi kamu selama trip
              </Typography>
            </Box>

            {/* Total Budget */}
            <Paper elevation={0} sx={{ mb: 4, p: 3, backgroundColor: 'transparent', textAlign: 'center'}}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                TOTAL PENGELUARAN KAMU SAAT INI
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {formatCurrency(totalBudget)}
              </Typography>
            </Paper>

            {/* Budget Allocation */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Rencana Alokasi Budget
              </Typography>
              {budgetItems.map((category, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Typography fontWeight="medium" sx={{ mb: 1 }}>
                    {category.category}
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    {category.items.map((item, itemIndex) => (
                      <Box 
                        key={itemIndex} 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          mb: 1 
                        }}
                      >
                        <Typography>
                          • {item.name}
                        </Typography>
                        <Typography>
                          {formatCurrency(item.amount)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Container>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              position: 'fixed',
              bottom: 40,
              right: 40,
            }}
            >
            <Fab
              color="primary"
              aria-label="add"
              sx={{
                width: 70,
                height: 70,
                '&:hover': {
                    backgroundColor: '#283593',
                  },
              }}
              onClick={handleAddButtonClick}
            >
              <AddIcon />
            </Fab>
          </Box>  
          <CustomDialog
            open={formOpen}
            onClose={handleCloseForm}
            title="Tambah Pengeluaran"
            actions={
                <>
                <Button onClick={handleCloseForm} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleFormSubmit} color="primary">
                    Done
                </Button>
                </>
            }
            >
            <TextField
                autoFocus
                margin="dense"
                label="Nama Pengeluaran"
                fullWidth
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Jumlah Uang"
                type="number"
                fullWidth
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
            />
          </CustomDialog>
        </Box>
      </GlobalThemeProvider>
    </ThemeProvider>
  );
}