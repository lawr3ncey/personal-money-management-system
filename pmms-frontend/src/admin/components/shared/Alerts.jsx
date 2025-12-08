import React from 'react';
import { Alert, Snackbar, Box, Typography, IconButton } from '@mui/material';
import {
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

// Toast Notification
export const Toast = ({ open, onClose, message, severity = 'info', duration = 4000 }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ minWidth: 300 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

// Inline Alert
export const InlineAlert = ({ severity = 'info', title, message, onClose, action }) => {
  const icons = {
    success: <SuccessIcon />,
    error: <ErrorIcon />,
    warning: <WarningIcon />,
    info: <InfoIcon />,
  };

  return (
    <Alert
      severity={severity}
      icon={icons[severity]}
      action={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {action}
          {onClose && (
            <IconButton size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      }
      sx={{ mb: 2 }}
    >
      {title && <Typography variant="subtitle2">{title}</Typography>}
      <Typography variant="body2">{message}</Typography>
    </Alert>
  );
};

// Empty State
export const EmptyState = ({ icon, title, message, action }) => (
  <Box
    sx={{
      textAlign: 'center',
      py: 8,
      px: 4,
    }}
  >
    {icon && (
      <Box sx={{ color: 'text.disabled', mb: 2 }}>
        {React.cloneElement(icon, { sx: { fontSize: 64 } })}
      </Box>
    )}
    <Typography variant="h6" color="text.secondary" gutterBottom>
      {title}
    </Typography>
    {message && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
    )}
    {action}
  </Box>
);

// Error State
export const ErrorState = ({ title = 'Something went wrong', message, onRetry }) => (
  <Box
    sx={{
      textAlign: 'center',
      py: 8,
      px: 4,
    }}
  >
    <ErrorIcon sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
    <Typography variant="h6" color="error" gutterBottom>
      {title}
    </Typography>
    {message && (
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
    )}
    {onRetry && (
      <button onClick={onRetry}>Try Again</button>
    )}
  </Box>
);

export default {
  Toast,
  InlineAlert,
  EmptyState,
  ErrorState,
};
