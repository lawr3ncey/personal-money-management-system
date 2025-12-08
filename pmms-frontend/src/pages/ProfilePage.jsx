import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSync } from '../contexts/SyncContext';
import { useNotification } from '../contexts/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';

const ProfilePage = () => {
  const { user, updateProfile, changePassword, deleteAccount, logout } = useAuth();
  const { getLastSyncDisplay, forceSync, isSyncing } = useSync();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Delete account state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  // Loading states
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      await updateProfile({ name: profileForm.name });
      showSuccess('Profile updated successfully');
      setIsEditingProfile(false);
    } catch (error) {
      showError(error.message || 'Failed to update profile');
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showError('Password must be at least 6 characters');
      return;
    }

    setIsChangingPassword(true);

    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      });
      showSuccess('Password changed successfully');
      setShowPasswordModal(false);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showError(error.message || 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      showError('Please enter your password');
      return;
    }

    setIsDeleting(true);

    try {
      await deleteAccount(deletePassword);
      showSuccess('Account deleted successfully');
      navigate('/login');
    } catch (error) {
      showError(error.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Handle force sync
  const handleForceSync = async () => {
    try {
      await forceSync();
      showSuccess('Data synced successfully');
    } catch (error) {
      showError('Failed to sync data');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

      {/* Profile Information */}
      <Card>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Profile Information</h2>
            <p className="text-gray-600 text-sm">Manage your account details</p>
          </div>
          {!isEditingProfile && (
            <Button
              variant="ghost"
              onClick={() => setIsEditingProfile(true)}
            >
              Edit
            </Button>
          )}
        </div>

        {isEditingProfile ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                disabled={isUpdatingProfile}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={profileForm.email}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>
            <div className="flex gap-3">
              <Button type="submit" variant="primary" disabled={isUpdatingProfile}>
                {isUpdatingProfile ? <Spinner size="sm" /> : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsEditingProfile(false);
                  setProfileForm({ name: user?.name || '', email: user?.email || '' });
                }}
                disabled={isUpdatingProfile}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Account created:</span>{' '}
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Cloud Sync Status */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">☁️ Cloud Sync</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">
              Last synced: <span className="font-medium">{getLastSyncDisplay()}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Your data is automatically synced across all your devices
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={handleForceSync}
            disabled={isSyncing}
          >
            {isSyncing ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> Syncing...
              </span>
            ) : (
              '🔄 Sync Now'
            )}
          </Button>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">🔒 Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-gray-600">Change your account password</p>
            </div>
            <Button variant="secondary" onClick={() => setShowPasswordModal(true)}>
              Change Password
            </Button>
          </div>
        </div>
      </Card>

      {/* Session */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">📱 Session</h2>
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">Sign Out</p>
            <p className="text-sm text-gray-600">Sign out from this device</p>
          </div>
          <Button variant="secondary" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-2 border-red-200">
        <h2 className="text-xl font-semibold mb-4 text-red-700">⚠️ Danger Zone</h2>
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-800">Delete Account</p>
              <p className="text-sm text-red-600">
                Permanently delete your account and all your data
              </p>
            </div>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
              Delete Account
            </Button>
          </div>
        </div>
      </Card>

      {/* Password Change Modal */}
      <Modal
        isOpen={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        }}
        title="Change Password"
      >
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              disabled={isChangingPassword}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              disabled={isChangingPassword}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              disabled={isChangingPassword}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={isChangingPassword} className="flex-1">
              {isChangingPassword ? <Spinner size="sm" /> : 'Change Password'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPasswordModal(false)}
              disabled={isChangingPassword}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletePassword('');
        }}
        title="⚠️ Delete Account"
      >
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-medium mb-2">This action cannot be undone!</p>
            <p className="text-red-700 text-sm">
              All your data including jars, transactions, goals, and budgets will be permanently deleted.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your password to confirm
            </label>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              placeholder="Your password"
              disabled={isDeleting}
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleDeleteAccount}
              disabled={isDeleting || !deletePassword}
              className="flex-1"
            >
              {isDeleting ? <Spinner size="sm" /> : 'Yes, Delete My Account'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setShowDeleteModal(false);
                setDeletePassword('');
              }}
              disabled={isDeleting}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
