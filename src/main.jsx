import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './auth/AuthContext.jsx';
import App from './pages/App.jsx';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const qc = new QueryClient();
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#9c27b0' }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={qc}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
//   </React.StrictMode>
);
