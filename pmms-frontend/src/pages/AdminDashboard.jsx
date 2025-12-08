import React, { useState, useEffect, useCallback } from 'react';
import adminService from '../services/adminService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import UserListTable from '../components/admin/UserListTable';
import UserDetailModal from '../components/admin/UserDetailModal';
import UserFormModal from '../components/admin/UserFormModal';
import AdminStats from '../components/admin/AdminStats';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    role: 'all',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  
  // Modal states
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Selection for bulk actions
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Load users and stats
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const [usersResult, statsResult] = await Promise.all([
        searchQuery ? adminService.searchUsers(searchQuery) : adminService.getUsers(filters),
        adminService.getUserStats()
      ]);
      
      setUsers(usersResult.data);
      setStats(statsResult.data);
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSearch = async (e) => {
    e.preventDefault();
    loadData();
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await adminService.deleteUser(userToDelete.id);
      setSuccessMessage(`User "${userToDelete.name}" deleted successfully`);
      setShowDeleteConfirm(false);
      setUserToDelete(null);
      loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const handleAddUser = async (userData) => {
    try {
      await adminService.createUser(userData);
      setSuccessMessage('User created successfully');
      setShowAddModal(false);
      loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      throw err; // Let the form handle the error
    }
  };

  const handleUpdateUser = async (id, updates) => {
    try {
      await adminService.updateUser(id, updates);
      setSuccessMessage('User updated successfully');
      setShowEditModal(false);
      setSelectedUser(null);
      loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      throw err; // Let the form handle the error
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedUserIds.length === 0) {
      setError('Please select users first');
      return;
    }

    try {
      await adminService.bulkUpdateStatus(selectedUserIds, status);
      setSuccessMessage(`${selectedUserIds.length} user(s) status updated to ${status}`);
      setSelectedUserIds([]);
      loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update users');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUserIds.length === 0) {
      setError('Please select users first');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedUserIds.length} user(s)?`)) {
      return;
    }

    try {
      await adminService.bulkDeleteUsers(selectedUserIds);
      setSuccessMessage(`${selectedUserIds.length} user(s) deleted successfully`);
      setSelectedUserIds([]);
      loadData();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete users');
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">👥 Admin Dashboard</h1>
            <p className="text-lg opacity-90">Manage users and monitor system activity</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            ➕ Add New User
          </Button>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4">
          ✅ {successMessage}
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
          ❌ {error}
        </div>
      )}

      {/* Statistics */}
      {stats && <AdminStats stats={stats} />}

      {/* Filters and Search */}
      <Card>
        <div className="space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, email, username, or phone..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <Button type="submit" variant="primary">
              🔍 Search
            </Button>
            {searchQuery && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setSearchQuery('');
                  loadData();
                }}
              >
                Clear
              </Button>
            )}
          </form>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="admin">Admins</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="createdAt">Created Date</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="lastLogin">Last Login</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedUserIds.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="font-medium text-purple-700">
                {selectedUserIds.length} user(s) selected
              </span>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleBulkStatusUpdate('active')}
                  variant="secondary"
                  className="text-sm"
                >
                  ✅ Set Active
                </Button>
                <Button
                  onClick={() => handleBulkStatusUpdate('inactive')}
                  variant="secondary"
                  className="text-sm"
                >
                  ⏸️ Set Inactive
                </Button>
                <Button
                  onClick={() => handleBulkStatusUpdate('suspended')}
                  variant="secondary"
                  className="text-sm"
                >
                  🚫 Suspend
                </Button>
                <Button
                  onClick={handleBulkDelete}
                  variant="danger"
                  className="text-sm"
                >
                  🗑️ Delete
                </Button>
              </div>
              <Button
                onClick={() => setSelectedUserIds([])}
                variant="secondary"
                className="text-sm ml-auto"
              >
                Clear Selection
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* User List */}
      {loading ? (
        <Card>
          <div className="flex items-center justify-center py-12">
            <Spinner size="lg" />
            <span className="ml-3 text-gray-600">Loading users...</span>
          </div>
        </Card>
      ) : users.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Users Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? 'Try adjusting your search query' : 'Get started by adding your first user'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setShowAddModal(true)} variant="primary">
                ➕ Add First User
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <UserListTable
          users={users}
          selectedUserIds={selectedUserIds}
          onSelectUser={(id) => {
            setSelectedUserIds(prev =>
              prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
            );
          }}
          onSelectAll={(selected) => {
            setSelectedUserIds(selected ? users.map(u => u.id) : []);
          }}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}

      {/* Modals */}
      {showDetailModal && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedUser(null);
          }}
          onEdit={() => {
            setShowDetailModal(false);
            setShowEditModal(true);
          }}
          onDelete={() => {
            setShowDetailModal(false);
            handleDeleteUser(selectedUser);
          }}
        />
      )}

      {showEditModal && selectedUser && (
        <UserFormModal
          mode="edit"
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSubmit={(updates) => handleUpdateUser(selectedUser.id, updates)}
        />
      )}

      {showAddModal && (
        <UserFormModal
          mode="add"
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddUser}
        />
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{userToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setUserToDelete(null);
                }}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button onClick={confirmDelete} variant="danger">
                Delete User
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
