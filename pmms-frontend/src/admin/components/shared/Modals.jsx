import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Delete as DeleteIcon,
  CheckCircle as SuccessIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

// Confirmation Dialog
export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // warning, danger, info, success
  loading = false,
}) => {
  const typeConfig = {
    warning: { color: '#ed6c02', icon: <WarningIcon sx={{ fontSize: 48 }} />, buttonColor: 'warning' },
    danger: { color: '#d32f2f', icon: <DeleteIcon sx={{ fontSize: 48 }} />, buttonColor: 'error' },
    info: { color: '#1976d2', icon: <InfoIcon sx={{ fontSize: 48 }} />, buttonColor: 'primary' },
    success: { color: '#2e7d32', icon: <SuccessIcon sx={{ fontSize: 48 }} />, buttonColor: 'success' },
  };

  const config = typeConfig[type] || typeConfig.warning;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 2 }}>
          <Box sx={{ color: config.color, mb: 2 }}>{config.icon}</Box>
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" disabled={loading}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} variant="contained" color={config.buttonColor} disabled={loading}>
          {loading ? 'Processing...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Detail Modal
export const DetailModal = ({ open, onClose, title, children, maxWidth = 'md' }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Form Modal
export const FormModal = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Save',
  cancelText = 'Cancel',
  loading = false,
  maxWidth = 'sm',
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" disabled={loading}>
          {cancelText}
        </Button>
        <Button onClick={onSubmit} variant="contained" disabled={loading}>
          {loading ? 'Saving...' : submitText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default {
  ConfirmDialog,
  DetailModal,
  FormModal,
};
