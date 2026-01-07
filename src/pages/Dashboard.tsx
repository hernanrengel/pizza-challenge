import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useAppSelector } from '../store/hooks';
import PizzaCard from '../components/PizzaCard';

const Dashboard: React.FC = () => {
  const { pizzas } = useAppSelector((state) => state.menu);

  return (
    <Box sx={{ flexGrow: 1, py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Our Menu
      </Typography>
      <Grid container spacing={4}>
        {pizzas.map((pizza) => (
          <Grid key={pizza.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <PizzaCard pizza={pizza} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
