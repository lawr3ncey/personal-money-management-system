import React from 'react';
import Card from '../ui/Card';

const AdminStats = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'purple',
      bgClass: 'bg-purple-50',
      textClass: 'text-purple-600',
      borderClass: 'border-purple-200'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: '✅',
      color: 'green',
      bgClass: 'bg-green-50',
      textClass: 'text-green-600',
      borderClass: 'border-green-200'
    },
    {
      label: 'Inactive Users',
      value: stats.inactiveUsers,
      icon: '⏸️',
      color: 'yellow',
      bgClass: 'bg-yellow-50',
      textClass: 'text-yellow-600',
      borderClass: 'border-yellow-200'
    },
    {
      label: 'Suspended',
      value: stats.suspendedUsers,
      icon: '🚫',
      color: 'red',
      bgClass: 'bg-red-50',
      textClass: 'text-red-600',
      borderClass: 'border-red-200'
    },
    {
      label: 'Admins',
      value: stats.adminUsers,
      icon: '👑',
      color: 'indigo',
      bgClass: 'bg-indigo-50',
      textClass: 'text-indigo-600',
      borderClass: 'border-indigo-200'
    },
    {
      label: 'New This Month',
      value: stats.newUsersThisMonth,
      icon: '🆕',
      color: 'blue',
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-600',
      borderClass: 'border-blue-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index} className={`${stat.bgClass} border ${stat.borderClass}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.textClass}`}>{stat.value}</p>
            </div>
            <div className="text-4xl">{stat.icon}</div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
