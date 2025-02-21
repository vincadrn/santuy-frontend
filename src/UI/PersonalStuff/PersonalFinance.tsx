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
  styled,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';  
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface BudgetItem {
  category: string;
  items: {
    name: string;
    amount: number;
  }[];
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0A2647',
    },
  },
});

// Custom styled components
const StyledFab = styled(Fab)({
  position: 'fixed',
  bottom: 16,
  right: 16,
});

const StyledHistoryButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: 16,
  right: 96,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function PersonalFinancePage() {
    const navigate = useNavigate();
    const [totalBudget] = useState(30000000);
    const [budgetItems] = useState<BudgetItem[]>([
        {
        category: 'Transportasi',
        items: [
            { name: 'Mobil Avanza', amount: 1800000 },
            { name: 'Bensin', amount: 1200000 },
        ],
        },
    ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        {/* App Bar */}
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
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Hi Angel !
            </Typography>
            <Typography color="text.secondary">
              Ini DETAIL KEUANGAN kita selama trip kita
            </Typography>
          </Box>

          {/* Total Budget */}
          <Paper elevation={0} sx={{ mb: 4, p: 3, backgroundColor: 'transparent' }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              TOTAL UANG KITA SAAT INI
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
                      <Typography color="text.secondary">
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
          >
            <AddIcon />
          </Fab>
        </Box>  
      </Box>
    </ThemeProvider>
  );
}