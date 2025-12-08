import React, { useState } from 'react';
import { exportService } from '../services';
import { useNotification } from '../contexts/NotificationContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [replaceExisting, setReplaceExisting] = useState(true);
  const { showSuccess, showError } = useNotification();

  // Export as JSON
  const handleExportJSON = async () => {
    try {
      setLoading(true);
      const blob = await exportService.exportJSON();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pmms-backup-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showSuccess('Backup exported successfully as JSON!');
    } catch (error) {
      console.error('Export JSON error:', error);
      showError(error.response?.data?.message || 'Failed to export data');
    } finally {
      setLoading(false);
    }
  };

  // Export as CSV
  const handleExportCSV = async () => {
    try {
      setLoading(true);
      const blob = await exportService.exportCSV('all');
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pmms-backup-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      showSuccess('Backup exported successfully as CSV!');
    } catch (error) {
      console.error('Export CSV error:', error);
      showError(error.response?.data?.message || 'Failed to export data');
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const isJSON = file.name.endsWith('.json');
      if (!isJSON) {
        showError('Please select a valid JSON backup file');
        return;
      }
      setSelectedFile(file);
    }
  };

  // Import backup
  const handleImport = async () => {
    if (!selectedFile) {
      showError('Please select a file to import');
      return;
    }

    try {
      setLoading(true);
      
      // Read file content
      const fileContent = await selectedFile.text();
      const backupData = JSON.parse(fileContent);
      
      // Validate backup structure
      if (!backupData.data || !backupData.version) {
        showError('Invalid backup file structure');
        return;
      }
      
      // Call import API
      const result = await exportService.importData({
        data: backupData,
        replaceExisting
      });
      
      showSuccess(`Backup restored successfully! ${result.imported.jars} jars, ${result.imported.transactions} transactions, and more imported.`);
      setShowImportModal(false);
      setSelectedFile(null);
      
      // Reload page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Import error:', error);
      if (error instanceof SyntaxError) {
        showError('Invalid JSON file. Please select a valid backup file.');
      } else {
        showError(error.response?.data?.message || error.message || 'Failed to import backup');
      }
    } finally {
      setLoading(false);
    }
  };

  // Reset all data
  const handleReset = async () => {
    try {
      setLoading(true);
      
      await exportService.resetData('RESET_ALL_DATA');
      
      showSuccess('All data has been reset successfully! Default jars recreated.');
      setShowResetModal(false);
      
      // Reload page after 2 seconds
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error('Reset error:', error);
      showError(error.response?.data?.message || 'Failed to reset data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings & Data Management</h1>

      {/* Export Section */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">📤 Export Data</h2>
        <p className="text-gray-600 mb-6">
          Download all your data as a backup. This includes jars, transactions, income history, budgets, goals, and recurring items.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">📊</span>
              <div>
                <h3 className="font-semibold">Export as JSON</h3>
                <p className="text-sm text-gray-600">Complete backup with all metadata</p>
              </div>
            </div>
            <Button 
              variant="primary" 
              onClick={handleExportJSON}
              disabled={loading}
              className="w-full"
            >
              {loading ? <Spinner size="sm" /> : 'Download JSON'}
            </Button>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl">📑</span>
              <div>
                <h3 className="font-semibold">Export as CSV</h3>
                <p className="text-sm text-gray-600">Spreadsheet-compatible format</p>
              </div>
            </div>
            <Button 
              variant="success" 
              onClick={handleExportCSV}
              disabled={loading}
              className="w-full"
            >
              {loading ? <Spinner size="sm" /> : 'Download CSV'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Import Section */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">📥 Import Backup</h2>
        <p className="text-gray-600 mb-6">
          Restore your data from a previously exported JSON backup file.
        </p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-yellow-600 text-xl">⚠️</span>
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Warning:</p>
              <p>Importing will replace all your existing data. Make sure to export your current data first!</p>
            </div>
          </div>
        </div>

        <Button 
          variant="secondary" 
          onClick={() => setShowImportModal(true)}
          disabled={loading}
        >
          Import Backup File
        </Button>
      </Card>

      {/* Reset Section */}
      <Card className="border-2 border-red-200">
        <h2 className="text-xl font-semibold mb-4 text-red-700">🗑️ Danger Zone</h2>
        <p className="text-gray-600 mb-6">
          Permanently delete all your data and start fresh. This action cannot be undone!
        </p>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <span className="text-red-600 text-xl">🚨</span>
            <div className="text-sm text-red-800">
              <p className="font-semibold mb-1">This action is irreversible!</p>
              <p>All jars will be reset to ₱0, and all transaction history will be deleted.</p>
            </div>
          </div>
        </div>

        <Button 
          variant="danger" 
          onClick={() => setShowResetModal(true)}
          disabled={loading}
        >
          Reset All Data
        </Button>
      </Card>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="⚠️ Confirm Data Reset"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <p className="text-red-800 font-semibold mb-2">
              Are you absolutely sure?
            </p>
            <p className="text-red-700 text-sm">
              This will permanently delete:
            </p>
            <ul className="list-disc list-inside text-red-700 text-sm mt-2 space-y-1">
              <li>All jar balances (reset to ₱0)</li>
              <li>All transaction history</li>
              <li>All income records</li>
              <li>All budget settings</li>
              <li>All savings goals</li>
              <li>All recurring items</li>
            </ul>
            <p className="text-red-800 font-semibold mt-3">
              This action CANNOT be undone!
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={handleReset}
              disabled={loading}
              className="flex-1"
            >
              {loading ? <Spinner size="sm" /> : 'Yes, Reset Everything'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setShowResetModal(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Import Modal */}
      <Modal
        isOpen={showImportModal}
        onClose={() => {
          setShowImportModal(false);
          setSelectedFile(null);
        }}
        title="📥 Import Backup"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              Select a JSON backup file exported from this app. Only JSON format is supported for import.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Backup File
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
            />
            {selectedFile && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="replaceExisting"
              checked={replaceExisting}
              onChange={(e) => setReplaceExisting(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="replaceExisting" className="text-sm text-gray-700">
              Replace all existing data (recommended)
            </label>
          </div>

          {selectedFile && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-yellow-800 text-sm">
                ⚠️ This will replace all your current data with the backup file.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleImport}
              disabled={!selectedFile || loading}
              className="flex-1"
            >
              {loading ? <Spinner size="sm" /> : 'Import Backup'}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setShowImportModal(false);
                setSelectedFile(null);
              }}
              disabled={loading}
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

export default SettingsPage;
