import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import type { Pizza, PizzaSize } from '../types';

interface PizzaCardProps {
  pizza: Pizza;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
  const [selectedSize, setSelectedSize] = useState<PizzaSize['size']>('Medium');

  const handleSizeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSize: PizzaSize['size'] | null
  ) => {
    if (newSize !== null) {
      setSelectedSize(newSize);
    }
  };

  const currentPrice =
    pizza.sizes.find((s) => s.size === selectedSize)?.price || 0;

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="200"
        image={pizza.imageUrl}
        alt={pizza.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 1,
          }}
        >
          <Typography variant="h5" component="div">
            {pizza.name}
          </Typography>
          <Chip label={pizza.category} size="small" color="secondary" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          {pizza.ingredients.join(', ')}
        </Typography>

        <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup
            value={selectedSize}
            exclusive
            onChange={handleSizeChange}
            aria-label="pizza size"
            size="small"
          >
            <ToggleButton value="Small">S</ToggleButton>
            <ToggleButton value="Medium">M</ToggleButton>
            <ToggleButton value="Large">L</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Typography variant="h6" color="primary" sx={{ mt: 2 }} align="center">
          ${currentPrice.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" fullWidth>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default PizzaCard;
