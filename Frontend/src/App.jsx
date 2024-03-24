import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box'
import theme from './Theme/index';
import Auth from './Auth';

const Dashboard = lazy(() => import('./Pages/Dashboard'));
const HelpPage = lazy(() => import('./Pages/HelpPage'));
const AdminPage = lazy(() => import('./Pages/AdminPage'));
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}>
          Loading...
        </Box>
      }>
        <Routes>
          <Route path="/*" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
