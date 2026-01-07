import { Container } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Container maxWidth="lg">
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Container>
  );
}

export default App;
