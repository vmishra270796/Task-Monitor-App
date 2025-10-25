// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { login } from '../api/tasks.js';
import { useAuth } from '../auth/AuthContext.jsx';
import {
  Container, Box, Typography, TextField, Button, Paper, Alert, Link
} from '@mui/material';

export default function LoginPage({ onSwitch }) {
  const { login: setAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await login({ email, password });
      setAuth(res);
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 8 }}>
        <Typography variant="h5" gutterBottom>Login</Typography>
        {err && <Alert severity="error">{err}</Alert>}
        <Box component="form" onSubmit={submit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>Login</Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Link component="button" variant="body2" onClick={onSwitch}>
            No account? Register
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}
