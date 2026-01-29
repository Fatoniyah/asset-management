import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AssetForm from './pages/AssetForm';
import AssetsList from './pages/AssetsList';
import TransferHistory from './pages/TransferHistory';
import AnnualInspectionReport from './pages/AnnualInspectionReport';
import Inspection from './pages/Inspection';
import AiAnalysis from './pages/AiAnalysis';
import { Box, CssBaseline, Toolbar, ThemeProvider, createTheme, AppBar, Typography } from '@mui/material';

// Create a theme with blue primary, grey secondary, and grey background
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#757575', // Grey
    },
    background: {
      default: '#f5f5f5', // Light grey background
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              ระบบติดตาม ตรวจสอบ และบริหารจัดการครุภัณฑ์ในหน่วยงาน
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', backgroundColor: 'background.default', minHeight: '100vh' }}>
          <CssBaseline />
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Toolbar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/assets" element={<AssetsList />} />
              <Route path="/asset-form" element={<AssetForm />} />
              <Route path="/transfer-history" element={<TransferHistory />} />
              <Route path="/annual-inspection-report" element={<AnnualInspectionReport />} />
              <Route path="/inspection" element={<Inspection />} />
              <Route path="/ai-analysis" element={<AiAnalysis />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
