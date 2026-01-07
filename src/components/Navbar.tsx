import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

interface NavbarProps {
  onCartClick: () => void;
  onAddPizzaClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick, onAddPizzaClick }) => {
  const navigate = useNavigate();
  const { items } = useAppSelector((state) => state.cart);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              flexGrow: 1,
            }}
            onClick={() => navigate('/')}
          >
            <LocalPizzaIcon
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 1,
                color: 'primary.main',
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PIZZA APP
            </Typography>
          </Box>

          <Button
            color="primary"
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={onAddPizzaClick}
            sx={{ mr: 2, borderRadius: 2, textTransform: 'none' }}
          >
            Add Pizza
          </Button>

          <IconButton
            size="large"
            aria-label="show cart items"
            color="inherit"
            onClick={onCartClick}
          >
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
