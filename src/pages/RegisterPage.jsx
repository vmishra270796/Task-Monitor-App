// client/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { register } from '../api/tasks.js';
import { useAuth } from '../auth/AuthContext.jsx';
import {
  Container, Box, Typography, TextField, Button, Paper, Alert, Link, MenuItem
} from '@mui/material';

export default function RegisterPage({ onSwitch }) {
  const { login: setAuth } = useAuth();
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await register({ name, email, password, role });
      setAuth(res);
    } catch (e) {
      setErr(e.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 3, mt: 8 }}>
        <Typography variant="h5" gutterBottom>Register</Typography>
        {err && <Alert severity="error">{err}</Alert>}
        <Box component="form" onSubmit={submit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            fullWidth
          />
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
          <TextField
            select
            label="Role"
            value={role}
            onChange={e => setRole(e.target.value)}
            fullWidth
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" fullWidth>Register</Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Link component="button" variant="body2" onClick={onSwitch}>
            Already have an account? Login
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}
