import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function Navbar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RestaurantIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
          >
            Restaunax Order Management
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 