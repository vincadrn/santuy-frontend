import { List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const navItems = [
  { label: 'Overview Trip', path: '/itinerary', enabled: true },
  { label: 'Album', path: '/album', enabled: true },
  { label: 'Keuangan', path: '/finance/group-budget', enabled: false },
  { label: 'Pribadi Stuff', path: '/personal-stuff', enabled: false },
  { label: 'Logout', path: '/logout', enabled: true },
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
            disabled={!item.enabled}
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
