import React from 'react';
import Card from '../ui/Card';

const UserListTable = ({
  users,
  selectedUserIds,
  onSelectUser,
  onSelectAll,
  onView,
  onEdit,
  onDelete
}) => {
  const allSelected = users.length > 0 && selectedUserIds.length === users.length;
  const someSelected = selectedUserIds.length > 0 && !allSelected;

  const getStatusBadge = (status) => {
    const badges = {
      active: 'bg-green-100 text-green-700 border-green-200',
      inactive: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      suspended: 'bg-red-100 text-red-700 border-red-200'
    };
    
    const icons = {
      active: '✅',
      inactive: '⏸️',
      suspended: '🚫'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badges[status]}`}>
        {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'bg-purple-100 text-purple-700 border-purple-200',
      user: 'bg-blue-100 text-blue-700 border-blue-200'
    };
    
    const icons = {
      admin: '👑',
      user: '👤'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badges[role]}`}>
        {icons[role]} {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">User</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Role</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Last Login</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                  selectedUserIds.includes(user.id) ? 'bg-purple-50' : ''
                }`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => onSelectUser(user.id)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm text-gray-800">{user.email}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600">{formatDate(user.createdAt)}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-sm text-gray-600">{formatDate(user.lastLogin)}</p>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Edit User"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete User"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default UserListTable;
