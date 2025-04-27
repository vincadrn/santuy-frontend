import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const navItems = [
  { label: 'Overview Trip', path: '/home' },
  { label: 'Album', path: '/album' },
  { label: 'Keuangan', path: '/finance' },
  { label: 'Pribadi Stuff', path: '/personal-stuff' },
];

export default function SidebarNavigation() {
  return (
    <>
      <Typography variant="h6" sx={{ p: 2 }}>
        TRAVELONIKA
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItemButton 
            key={item.path} 
            component={RouterLink} 
            to={item.path}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
}
