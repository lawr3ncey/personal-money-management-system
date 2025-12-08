import React, { useState } from 'react';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Juan Dela Cruz',
    email: 'juan@email.com',
    role: 'Owner',
    avatar: '👨',
    joinedDate: '2024-01-01',
    permissions: ['manage_members', 'manage_jars', 'view_all', 'manage_transactions'],
    status: 'active'
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'Admin',
    avatar: '👩',
    joinedDate: '2024-02-15',
    permissions: ['manage_jars', 'view_all', 'manage_transactions'],
    status: 'active'
  },
  {
    id: 3,
    name: 'Pedro Garcia',
    email: 'pedro@email.com',
    role: 'Member',
    avatar: '👦',
    joinedDate: '2024-03-10',
    permissions: ['view_own', 'add_transactions'],
    status: 'active'
  },
  {
    id: 4,
    name: 'Ana Reyes',
    email: 'ana@email.com',
    role: 'Member',
    avatar: '👧',
    joinedDate: '2024-03-10',
    permissions: ['view_own', 'add_transactions'],
    status: 'pending'
  },
];

const DUMMY_SHARED_JARS = [
  {
    id: 1,
    name: 'Family Groceries',
    type: 'Necessities',
    balance: 15000,
    sharedWith: [1, 2, 3, 4],
    owner: 1,
    goal: 20000,
    icon: '🛒',
    color: '#3B82F6',
    transactions: [
      { date: '2024-12-01', member: 'Maria', amount: -3500, description: 'SM Grocery' },
      { date: '2024-12-03', member: 'Juan', amount: -2000, description: 'Fresh Market' },
    ]
  },
  {
    id: 2,
    name: 'Vacation Fund',
    type: 'Play',
    balance: 45000,
    sharedWith: [1, 2],
    owner: 1,
    goal: 100000,
    icon: '✈️',
    color: '#EC4899',
    transactions: [
      { date: '2024-11-28', member: 'Juan', amount: 10000, description: 'Monthly Contribution' },
      { date: '2024-11-28', member: 'Maria', amount: 5000, description: 'Monthly Contribution' },
    ]
  },
  {
    id: 3,
    name: 'Kids Education',
    type: 'Education',
    balance: 25000,
    sharedWith: [1, 2],
    owner: 1,
    goal: 50000,
    icon: '📚',
    color: '#8B5CF6',
    transactions: [
      { date: '2024-12-01', member: 'Juan', amount: -12000, description: 'School Tuition' },
      { date: '2024-11-15', member: 'Maria', amount: -3000, description: 'School Supplies' },
    ]
  },
];

const DUMMY_TEAM_MODES = {
  FAMILY: { name: 'Family Mode', icon: '👨‍👩‍👧‍👦', description: 'Manage household finances together', maxMembers: 6 },
  COUPLE: { name: 'Couple Mode', icon: '💑', description: 'Share expenses with your partner', maxMembers: 2 },
  BUSINESS: { name: 'Business Mode', icon: '💼', description: 'Team expense management', maxMembers: 'unlimited' },
  ROOMMATES: { name: 'Roommates Mode', icon: '🏠', description: 'Split bills and shared expenses', maxMembers: 10 },
};

const TeamFamilyMode = () => {
  const [teamMembers, setTeamMembers] = useState(DUMMY_TEAM_MEMBERS);
  const [sharedJars, setSharedJars] = useState(DUMMY_SHARED_JARS);
  const [selectedMode, setSelectedMode] = useState('FAMILY');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showJarModal, setShowJarModal] = useState(false);
  const [selectedJar, setSelectedJar] = useState(null);
  const [inviteEmail, setInviteEmail] = useState('');

  // 🔴 TODO: Replace with actual Supabase query
  // const { data: teamData } = useQuery('team', fetchTeamData);
  // const { mutate: inviteMember } = useMutation(sendInvite);

  const formatCurrency = (value) => {
    return `₱${value.toLocaleString()}`;
  };

  const getMemberById = (id) => {
    return teamMembers.find(m => m.id === id);
  };

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  const handleInviteMember = () => {
    if (!inviteEmail.trim()) {
      alert('Please enter an email address');
      return;
    }

    // 🔴 TODO: Send actual invitation via Supabase and email service
    alert(`✅ Invitation sent to ${inviteEmail}!\n\n🔴 In production:\n- Send email invitation\n- Create pending invite in Supabase\n- Notify user when accepted`);
    
    setInviteEmail('');
    setShowInviteModal(false);
  };

  const handleRemoveMember = (memberId) => {
    const member = getMemberById(memberId);
    if (window.confirm(`Remove ${member.name} from the team?`)) {
      setTeamMembers(teamMembers.filter(m => m.id !== memberId));
      // 🔴 TODO: Remove from Supabase and notify user
    }
  };

  const handleCreateSharedJar = () => {
    setShowJarModal(true);
    // 🔴 TODO: Show form to create shared jar
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">👥 Team & Family Mode</h2>
        <p className="text-blue-100">Manage shared jars and collaborate with family or team members</p>
      </div>

      {/* Team Mode Selection */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">🎯 Select Your Mode</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(DUMMY_TEAM_MODES).map(([key, mode]) => (
            <button
              key={key}
              onClick={() => setSelectedMode(key)}
              className={`p-4 rounded-lg border-2 transition ${
                selectedMode === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-4xl mb-2">{mode.icon}</div>
              <div className="font-semibold text-gray-800 text-sm">{mode.name}</div>
              <div className="text-xs text-gray-500 mt-1">{mode.description}</div>
              <div className="text-xs text-blue-600 mt-2 font-semibold">
                Max: {mode.maxMembers === 'unlimited' ? 'Unlimited' : `${mode.maxMembers} members`}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">👥 Team Members ({teamMembers.length})</h3>
          <button
            onClick={() => setShowInviteModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2"
          >
            ➕ Invite Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{member.avatar}</div>
                  <div>
                    <div className="font-semibold text-gray-800 flex items-center gap-2">
                      {member.name}
                      {member.role === 'Owner' && (
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          Owner
                        </span>
                      )}
                      {member.status === 'pending' && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{member.email}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Joined {new Date(member.joinedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {member.role !== 'Owner' && (
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Permissions */}
              <div className="flex flex-wrap gap-2">
                {member.permissions.map((perm, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    {perm.replace(/_/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shared Jars */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">🏺 Shared Jars ({sharedJars.length})</h3>
          <button
            onClick={handleCreateSharedJar}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold flex items-center gap-2"
          >
            ➕ Create Shared Jar
          </button>
        </div>

        <div className="space-y-4">
          {sharedJars.map(jar => {
            const progress = getProgressPercentage(jar.balance, jar.goal);
            const owner = getMemberById(jar.owner);

            return (
              <div
                key={jar.id}
                className="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition cursor-pointer"
                onClick={() => setSelectedJar(jar)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="text-5xl w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: jar.color + '20' }}
                    >
                      {jar.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800">{jar.name}</h4>
                      <p className="text-sm text-gray-600">
                        {jar.type} • Owner: {owner?.name}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {jar.sharedWith.map((memberId, idx) => {
                          const member = getMemberById(memberId);
                          return member ? (
                            <span key={idx} className="text-xl" title={member.name}>
                              {member.avatar}
                            </span>
                          ) : null;
                        })}
                        <span className="text-xs text-gray-500">
                          {jar.sharedWith.length} member{jar.sharedWith.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-800">
                      {formatCurrency(jar.balance)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Goal: {formatCurrency(jar.goal)}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: jar.color
                      }}
                    />
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="border-t border-gray-200 pt-3">
                  <div className="text-sm font-semibold text-gray-700 mb-2">Recent Activity</div>
                  <div className="space-y-2">
                    {jar.transactions.slice(0, 2).map((txn, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">
                            {new Date(txn.date).toLocaleDateString()}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-700">{txn.member}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600 text-xs">{txn.description}</span>
                        </div>
                        <span
                          className={`font-semibold ${
                            txn.amount > 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {txn.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(txn.amount))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Activity Feed */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📝 Team Activity Feed</h3>
        <div className="space-y-3">
          {[
            { time: '2 hours ago', member: 'Maria', action: 'added ₱3,500 to Family Groceries', icon: '🛒' },
            { time: '5 hours ago', member: 'Juan', action: 'created shared jar "Vacation Fund"', icon: '✈️' },
            { time: '1 day ago', member: 'Pedro', action: 'joined the team', icon: '👋' },
            { time: '2 days ago', member: 'Maria', action: 'updated Kids Education goal', icon: '📚' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{activity.member}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Invite Team Member</h3>
            <p className="text-gray-600 mb-4">
              Send an invitation to join your {DUMMY_TEAM_MODES[selectedMode].name}
            </p>

            <input
              type="email"
              placeholder="Enter email address"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
            />

            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Role</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option>Member (View & Add Transactions)</option>
                <option>Admin (Full Access)</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowInviteModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleInviteMember}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Send Invite
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              🔴 This is a demo. No actual email will be sent.
            </p>
          </div>
        </div>
      )}

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Store team data in Supabase 'teams' table with team_id, name, mode, owner_id</li>
          <li>Create 'team_members' table for member relationships and permissions</li>
          <li>Shared jars stored in 'shared_jars' table with access control</li>
          <li>Implement invitation system with email notifications</li>
          <li>Add real-time updates using Supabase Realtime subscriptions</li>
          <li>Implement role-based permissions (Owner, Admin, Member)</li>
          <li>Create activity log table to track all team actions</li>
          <li>Add notification system for shared jar updates</li>
        </ul>
      </div>
    </div>
  );
};

export default TeamFamilyMode;
