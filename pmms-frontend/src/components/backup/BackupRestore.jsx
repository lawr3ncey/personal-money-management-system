import React, { useState } from 'react';

// 🔴 DUMMY DATA - Simulated backup data
const DUMMY_BACKUP_HISTORY = [
  {
    id: 1,
    filename: 'pmms_backup_2024-12-04_14-30.json',
    timestamp: '2024-12-04T14:30:00',
    size: '245 KB',
    type: 'manual',
    status: 'completed',
    includes: ['jars', 'transactions', 'goals', 'recurring', 'settings']
  },
  {
    id: 2,
    filename: 'pmms_backup_2024-12-03_00-00.json',
    timestamp: '2024-12-03T00:00:00',
    size: '238 KB',
    type: 'automatic',
    status: 'completed',
    includes: ['jars', 'transactions', 'goals', 'recurring', 'settings']
  },
  {
    id: 3,
    filename: 'pmms_backup_2024-12-02_00-00.json',
    timestamp: '2024-12-02T00:00:00',
    size: '232 KB',
    type: 'automatic',
    status: 'completed',
    includes: ['jars', 'transactions', 'goals', 'recurring', 'settings']
  },
];

const BACKUP_DATA_SUMMARY = {
  jars: { count: 6, size: '12 KB' },
  transactions: { count: 1247, size: '185 KB' },
  goals: { count: 5, size: '8 KB' },
  recurring: { count: 8, size: '5 KB' },
  bills: { count: 12, size: '6 KB' },
  settings: { count: 1, size: '2 KB' },
  incomeHistory: { count: 24, size: '15 KB' },
  categories: { count: 45, size: '12 KB' }
};

const BackupRestore = () => {
  const [backupHistory, setBackupHistory] = useState(DUMMY_BACKUP_HISTORY);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [autoBackupFrequency, setAutoBackupFrequency] = useState('daily');
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [cloudSyncEnabled, setCloudSyncEnabled] = useState(false);

  // 🔴 TODO: Replace with actual Supabase queries
  // const { data: backups } = useQuery('backups', fetchBackups);
  // const { mutate: createBackup } = useMutation(createBackupInSupabase);
  // const { mutate: restoreFromBackup } = useMutation(restoreData);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleCreateBackup = () => {
    setIsCreatingBackup(true);

    // Simulate backup creation
    setTimeout(() => {
      const newBackup = {
        id: Date.now(),
        filename: `pmms_backup_${new Date().toISOString().split('T')[0]}_${new Date().getHours()}-${new Date().getMinutes()}.json`,
        timestamp: new Date().toISOString(),
        size: '247 KB',
        type: 'manual',
        status: 'completed',
        includes: ['jars', 'transactions', 'goals', 'recurring', 'settings']
      };

      setBackupHistory([newBackup, ...backupHistory]);
      setIsCreatingBackup(false);

      // 🔴 TODO: Actually create backup in Supabase and download JSON file
      alert('✅ Backup created successfully!\n\n🔴 In production, this will:\n- Export all your data to JSON/CSV\n- Save to local storage\n- Upload to cloud storage (if enabled)\n- Create restore point in Supabase');
    }, 2000);
  };

  const handleDownloadBackup = (backup) => {
    // Simulate downloading backup file
    const dummyData = {
      version: '1.0',
      timestamp: backup.timestamp,
      data: {
        jars: BACKUP_DATA_SUMMARY.jars,
        transactions: BACKUP_DATA_SUMMARY.transactions,
        goals: BACKUP_DATA_SUMMARY.goals,
        // ... other data
      }
    };

    const dataStr = JSON.stringify(dummyData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = backup.filename;
    link.click();

    alert('📥 Backup downloaded!\n\n🔴 This is a demo file with dummy data.');
  };

  const handleRestoreBackup = (backup) => {
    if (!window.confirm(`⚠️ Are you sure you want to restore from this backup?\n\n"${backup.filename}"\n\nThis will replace all current data!\n\n🔴 This is a simulation only.`)) {
      return;
    }

    setIsRestoring(true);
    setSelectedBackup(backup);

    // Simulate restore process
    setTimeout(() => {
      setIsRestoring(false);
      setSelectedBackup(null);
      alert('✅ Restore completed!\n\n🔴 In production, this will:\n- Load data from backup file\n- Verify data integrity\n- Replace current data in Supabase\n- Refresh all components\n- Create a pre-restore backup automatically');
    }, 3000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Simulate file upload and restore
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (window.confirm(`📁 File: ${file.name}\n\nVerified backup file!\n\nRestore this backup?\n\n🔴 This is a simulation.`)) {
          setIsRestoring(true);
          
          setTimeout(() => {
            setIsRestoring(false);
            alert('✅ Backup file restored successfully!');
          }, 2000);
        }
      } catch (error) {
        alert('❌ Invalid backup file format!');
      }
    };
    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    alert('📊 CSV Export Started!\n\n🔴 In production, this will:\n- Export transactions to CSV\n- Include all jar assignments\n- Add category and date columns\n- Download ready for Excel/Google Sheets');
  };

  const handleDeleteBackup = (backupId) => {
    if (window.confirm('Delete this backup? This cannot be undone.')) {
      setBackupHistory(backupHistory.filter(b => b.id !== backupId));
      // 🔴 TODO: Delete from Supabase storage
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2">💾 Backup & Restore</h2>
        <p className="text-teal-100">Protect your financial data with automated backups</p>
      </div>

      {/* Loading Overlay */}
      {(isCreatingBackup || isRestoring) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
            <div className="animate-spin text-6xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {isCreatingBackup ? 'Creating Backup...' : 'Restoring Data...'}
            </h3>
            <p className="text-gray-600">Please wait, this may take a moment</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={handleCreateBackup}
          disabled={isCreatingBackup}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg hover:from-blue-600 hover:to-blue-700 transition shadow-lg disabled:opacity-50"
        >
          <div className="text-4xl mb-2">💾</div>
          <div className="font-bold text-lg">Create Backup</div>
          <div className="text-xs text-blue-100 mt-1">Manual backup now</div>
        </button>

        <button
          onClick={handleExportCSV}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg hover:from-green-600 hover:to-green-700 transition shadow-lg"
        >
          <div className="text-4xl mb-2">📊</div>
          <div className="font-bold text-lg">Export to CSV</div>
          <div className="text-xs text-green-100 mt-1">For Excel/Sheets</div>
        </button>

        <label className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg hover:from-purple-600 hover:to-purple-700 transition shadow-lg cursor-pointer">
          <input
            type="file"
            accept=".json,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="text-4xl mb-2">📁</div>
          <div className="font-bold text-lg">Import Backup</div>
          <div className="text-xs text-purple-100 mt-1">Restore from file</div>
        </label>
      </div>

      {/* Data Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📦 Your Data Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(BACKUP_DATA_SUMMARY).map(([key, data]) => (
            <div key={key} className="p-4 bg-gray-50 rounded-lg">
              <div className="text-gray-600 text-sm capitalize">{key}</div>
              <div className="text-2xl font-bold text-blue-600">{data.count}</div>
              <div className="text-xs text-gray-500 mt-1">{data.size}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-blue-800">Total Data Size</div>
              <div className="text-sm text-blue-600">Ready to backup</div>
            </div>
            <div className="text-3xl font-bold text-blue-600">245 KB</div>
          </div>
        </div>
      </div>

      {/* Auto-Backup Settings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">⚙️ Automatic Backup Settings</h3>
        
        <div className="space-y-4">
          {/* Enable Auto-Backup */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-semibold text-gray-800">Enable Automatic Backups</div>
              <div className="text-sm text-gray-600">Create backups automatically on schedule</div>
            </div>
            <button
              onClick={() => setAutoBackupEnabled(!autoBackupEnabled)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                autoBackupEnabled
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {autoBackupEnabled ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* Backup Frequency */}
          {autoBackupEnabled && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <label className="font-semibold text-gray-800 block mb-3">Backup Frequency</label>
              <select
                value={autoBackupFrequency}
                onChange={(e) => setAutoBackupFrequency(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="daily">Daily (Recommended)</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <div className="text-xs text-gray-500 mt-2">
                Next automatic backup: {autoBackupFrequency === 'daily' ? 'Tomorrow at 00:00' : 'Next scheduled time'}
              </div>
            </div>
          )}

          {/* Cloud Sync */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div>
              <div className="font-semibold text-gray-800 flex items-center gap-2">
                <span>☁️</span>
                <span>Cloud Sync</span>
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">PRO</span>
              </div>
              <div className="text-sm text-gray-600">Sync backups to cloud storage</div>
            </div>
            <button
              onClick={() => setCloudSyncEnabled(!cloudSyncEnabled)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                cloudSyncEnabled
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {cloudSyncEnabled ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">📜 Backup History</h3>
        
        {backupHistory.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📦</div>
            <p>No backups yet. Create your first backup!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {backupHistory.map(backup => (
              <div key={backup.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {backup.type === 'automatic' ? '🤖' : '👤'}
                      </span>
                      <div>
                        <div className="font-semibold text-gray-800">{backup.filename}</div>
                        <div className="text-sm text-gray-600">
                          {formatDate(backup.timestamp)} • {backup.size} • 
                          <span className={backup.type === 'automatic' ? 'text-blue-600' : 'text-purple-600'}>
                            {' '}{backup.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadBackup(backup)}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
                      title="Download backup file"
                    >
                      📥 Download
                    </button>
                    <button
                      onClick={() => handleRestoreBackup(backup)}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium"
                      title="Restore from this backup"
                    >
                      ♻️ Restore
                    </button>
                    <button
                      onClick={() => handleDeleteBackup(backup.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition text-sm font-medium"
                      title="Delete backup"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Backup Contents */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {backup.includes.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Data Security Info */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold mb-4">🔒 Data Security</h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold">Encrypted Storage</div>
              <div className="text-gray-600">All backups are encrypted before storage</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold">Local First</div>
              <div className="text-gray-600">Data stays on your device by default</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold">Version Control</div>
              <div className="text-gray-600">Multiple restore points to choose from</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold">Pre-Restore Backup</div>
              <div className="text-gray-600">Auto-backup before any restore operation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Implementation Notes */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">🔧 Implementation Notes (Developer):</h4>
        <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
          <li>Store backup metadata in Supabase 'backups' table</li>
          <li>Use Supabase Storage to save backup files</li>
          <li>Implement scheduled backups using Supabase Edge Functions or cron jobs</li>
          <li>Add data verification before restore (checksum validation)</li>
          <li>Create incremental backups to save storage space</li>
          <li>Implement backup encryption using AES-256</li>
          <li>Add export to CSV for transactions, goals, and recurring items</li>
          <li>Support importing from other finance apps (CSV format)</li>
        </ul>
      </div>
    </div>
  );
};

export default BackupRestore;
