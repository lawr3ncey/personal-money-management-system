import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  CalendarToday as CalendarIcon,
  AccountBalance as AccountBalanceIcon,
} from '@mui/icons-material';
import { useAdmin } from '../context/AdminContext';

const UserDetailModal = ({ open, onClose, user }) => {
  const { getUserJars, getUserTransactions } = useAdmin();

  if (!user) return null;

  const userJars = getUserJars(user.id);
  const userTransactions = getUserTransactions(user.id);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const InfoRow = ({ icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
      {icon}
      <Box>
        <Typography variant="caption" color="text.secondary" display="block">
          {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
            }}
          >
            {user.name.charAt(0)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {user.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{user.username}
            </Typography>
          </Box>
          <Chip
            label={user.status.toUpperCase()}
            color={
              user.status === 'active'
                ? 'success'
                : user.status === 'inactive'
                ? 'default'
                : 'error'
            }
            size="small"
          />
        </Box>
      </DialogTitle>

      <Divider />

      <DialogContent>
        {/* User Information */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Personal Information
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <InfoRow
              icon={<EmailIcon color="action" />}
              label="Email"
              value={user.email}
            />
            <InfoRow
              icon={<PhoneIcon color="action" />}
              label="Phone"
              value={user.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InfoRow
              icon={<LocationOnIcon color="action" />}
              label="Address"
              value={user.address}
            />
            <InfoRow
              icon={<CalendarIcon color="action" />}
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
          </Grid>
        </Grid>

        {/* Financial Summary */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Financial Summary
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'success.main' }}>
                {formatCurrency(user.totalBalance)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Balance
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'info.main' }}>
                {formatCurrency(user.totalIncome)}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Income
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {user.jarCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Jars
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'warning.main' }}>
                {user.transactionCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Transactions
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Jars */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Jars ({userJars.length})
        </Typography>
        <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Jar Name</TableCell>
                <TableCell align="right">Percentage</TableCell>
                <TableCell align="right">Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userJars.map((jar) => (
                <TableRow key={jar.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span>{jar.icon}</span>
                      <Typography variant="body2">{jar.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Chip label={`${jar.percentage}%`} size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {formatCurrency(jar.balance)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Recent Transactions */}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
          Recent Transactions
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Jar</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userTransactions.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Typography variant="caption">
                      {new Date(transaction.date).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>{transaction.jarName}</TableCell>
                  <TableCell>
                    <Chip label={transaction.category} size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" noWrap sx={{ maxWidth: 150 }}>
                      {transaction.reason}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: transaction.type === 'add' ? 'success.main' : 'error.main',
                      }}
                    >
                      {transaction.type === 'add' ? '+' : '-'}
                      {formatCurrency(transaction.amount)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailModal;
