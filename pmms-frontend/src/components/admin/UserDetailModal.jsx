import React from 'react';
import Button from '../ui/Button';

const UserDetailModal = ({ user, onClose, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'text-green-600 bg-green-50',
      inactive: 'text-yellow-600 bg-yellow-50',
      suspended: 'text-red-600 bg-red-50'
    };
    return colors[status] || 'text-gray-600 bg-gray-50';
  };

  const getRoleColor = (role) => {
    const colors = {
      admin: 'text-purple-600 bg-purple-50',
      user: 'text-blue-600 bg-blue-50'
    };
    return colors[role] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-lg opacity-90">@{user.username}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Status & Role */}
          <div className="flex gap-4">
            <div className={`px-4 py-2 rounded-lg font-semibold ${getStatusColor(user.status)}`}>
              {user.status === 'active' && '✅'} 
              {user.status === 'inactive' && '⏸️'} 
              {user.status === 'suspended' && '🚫'} 
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold ${getRoleColor(user.role)}`}>
              {user.role === 'admin' && '👑'} 
              {user.role === 'user' && '👤'} 
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">📋 Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Full Name</p>
                <p className="font-semibold text-gray-800">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Username</p>
                <p className="font-semibold text-gray-800">@{user.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Age</p>
                <p className="font-semibold text-gray-800">{user.age} years old</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Gender</p>
                <p className="font-semibold text-gray-800">
                  {user.gender === 'male' && '👨 Male'}
                  {user.gender === 'female' && '👩 Female'}
                  {user.gender === 'other' && '🧑 Other'}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">📞 Contact Information</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Email Address</p>
                <p className="font-semibold text-gray-800">
                  <a href={`mailto:${user.email}`} className="text-purple-600 hover:underline">
                    {user.email}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                <p className="font-semibold text-gray-800">
                  <a href={`tel:${user.phone}`} className="text-purple-600 hover:underline">
                    {user.phone}
                  </a>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Address</p>
                <p className="font-semibold text-gray-800">{user.address}</p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">🔐 Account Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Account Created</p>
                <p className="font-semibold text-gray-800">{formatDate(user.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                <p className="font-semibold text-gray-800">{formatDate(user.updatedAt)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Login</p>
                <p className="font-semibold text-gray-800">{formatDate(user.lastLogin)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">User ID</p>
                <p className="font-mono text-sm text-gray-600">{user.id}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 p-6 rounded-b-lg border-t border-gray-200">
          <div className="flex justify-end gap-3">
            <Button onClick={onClose} variant="secondary">
              Close
            </Button>
            <Button onClick={onEdit} variant="primary">
              ✏️ Edit User
            </Button>
            <Button onClick={onDelete} variant="danger">
              🗑️ Delete User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
