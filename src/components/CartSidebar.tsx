import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Button,
  Divider,
  Drawer,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleIncrement = (id: string, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrement = (id: string, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
    dispatch(clearCart());
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Your Order
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {items.length === 0 ? (
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Button variant="outlined" onClick={onClose}>
            Browse Menu
          </Button>
        </Box>
      ) : (
        <>
          <List sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
            {items.map((item) => (
              <React.Fragment key={item.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemove(item.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{ py: 2, px: 2 }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={item.name}
                      src={item.imageUrl}
                      variant="rounded"
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.name}
                      </Typography>
                    }
                    secondaryTypographyProps={{ component: 'div' }}
                    secondary={
                      <Box sx={{ mt: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Size: {item.size}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ mt: 1.5, width: '100%', pr: 4 }}
                        >
                          <Typography variant="body1" fontWeight="bold">
                            ${(item.price * item.quantity).toFixed(2)}
                          </Typography>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 1,
                              bgcolor: 'background.paper',
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleDecrement(item.id, item.quantity)
                              }
                              sx={{ p: 0.5 }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                              sx={{
                                mx: 1.5,
                                minWidth: 20,
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                handleIncrement(item.id, item.quantity)
                              }
                              sx={{ p: 0.5 }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Stack>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>

          <Box
            sx={{
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Stack direction="row" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" fontWeight="bold" color="primary">
                ${total.toFixed(2)}
              </Typography>
            </Stack>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{
                fontWeight: 'bold',
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              Checkout
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default CartSidebar;
