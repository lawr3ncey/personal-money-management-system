import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Avatar,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
} from '@mui/icons-material';
import adminAuthService from '../services/adminAuth.service';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    try {
      await adminAuthService.login(formData.username, formData.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          {/* Logo/Icon */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: '2.5rem',
              }}
            >
              👑
            </Avatar>
          </Box>

          {/* Title */}
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700, color: 'text.primary' }}
          >
            Admin Panel
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Personal Money Management System
          </Typography>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username or Email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              autoComplete="username"
              autoFocus
              disabled={loading}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      disabled={loading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mt: 3,
              bgcolor: 'background.default',
              borderRadius: 2,
            }}
          >
            <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
              <strong>Demo Credentials:</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              <strong>Super Admin:</strong> admin / admin123456
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block">
              <strong>Admin:</strong> moderator / moderator123
            </Typography>
          </Paper>
        </Paper>

        {/* Footer */}
        <Typography
          variant="caption"
          color="white"
          align="center"
          display="block"
          sx={{ mt: 3, opacity: 0.8 }}
        >
          © 2024 PMMS. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default AdminLogin;
