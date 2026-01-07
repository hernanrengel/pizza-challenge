import { useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <Navbar onCartClick={() => setIsCartOpen(true)} />
      <CartSidebar open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
