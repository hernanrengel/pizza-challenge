import { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import AddPizzaModal from './components/AddPizzaModal';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddPizzaOpen, setIsAddPizzaOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onAddPizzaClick={() => setIsAddPizzaOpen(true)}
      />
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AddPizzaModal
        open={isAddPizzaOpen}
        onClose={() => setIsAddPizzaOpen(false)}
      />
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
