// client/src/components/FeedbackSnackbar.jsx
import React from 'react';
import { Snackbar, Alert } from '@mui/material';

export default function FeedbackSnackbar({ open, onClose, message, severity = 'success' }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
