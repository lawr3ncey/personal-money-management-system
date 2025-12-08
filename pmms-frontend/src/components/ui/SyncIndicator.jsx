import React from 'react';
import { useSync, SYNC_STATUS } from '../../contexts/SyncContext';

/**
 * Sync Indicator Component
 * 
 * Shows the current sync status with visual feedback:
 * - Syncing: Animated spinner with message
 * - Synced: Green checkmark
 * - Error: Red warning
 * - Offline: Gray cloud with slash
 */
const SyncIndicator = ({ showText = true, size = 'md' }) => {
  const { syncStatus, syncMessage, getLastSyncDisplay } = useSync();

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const renderIcon = () => {
    switch (syncStatus) {
      case SYNC_STATUS.SYNCING:
        return (
          <svg 
            className={`${iconSizes[size]} animate-spin text-blue-500`} 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
      
      case SYNC_STATUS.SYNCED:
        return (
          <svg 
            className={`${iconSizes[size]} text-green-500`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        );
      
      case SYNC_STATUS.ERROR:
        return (
          <svg 
            className={`${iconSizes[size]} text-red-500`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        );
      
      case SYNC_STATUS.OFFLINE:
        return (
          <svg 
            className={`${iconSizes[size]} text-gray-400`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
            />
          </svg>
        );
      
      default:
        return (
          <svg 
            className={`${iconSizes[size]} text-gray-400`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" 
            />
          </svg>
        );
    }
  };

  const getStatusText = () => {
    if (syncMessage) return syncMessage;
    
    switch (syncStatus) {
      case SYNC_STATUS.SYNCING:
        return 'Syncing...';
      case SYNC_STATUS.SYNCED:
        return getLastSyncDisplay();
      case SYNC_STATUS.ERROR:
        return 'Sync error';
      case SYNC_STATUS.OFFLINE:
        return 'Offline';
      default:
        return 'Ready';
    }
  };

  const getStatusColor = () => {
    switch (syncStatus) {
      case SYNC_STATUS.SYNCING:
        return 'text-blue-600';
      case SYNC_STATUS.SYNCED:
        return 'text-green-600';
      case SYNC_STATUS.ERROR:
        return 'text-red-600';
      case SYNC_STATUS.OFFLINE:
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${sizeClasses[size]}`}>
      {renderIcon()}
      {showText && (
        <span className={`${getStatusColor()} whitespace-nowrap`}>
          {getStatusText()}
        </span>
      )}
    </div>
  );
};

/**
 * Compact sync indicator for navbar
 */
export const SyncBadge = () => {
  const { syncStatus, isSyncing } = useSync();

  const getBgColor = () => {
    switch (syncStatus) {
      case SYNC_STATUS.SYNCING:
        return 'bg-blue-100';
      case SYNC_STATUS.SYNCED:
        return 'bg-green-100';
      case SYNC_STATUS.ERROR:
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full ${getBgColor()} flex items-center gap-1`}>
      <SyncIndicator showText={false} size="sm" />
      {isSyncing && (
        <span className="text-xs text-blue-600">Syncing</span>
      )}
    </div>
  );
};

/**
 * Full sync status card for settings/profile page
 */
export const SyncStatusCard = () => {
  const { syncStatus, lastSyncTime, getLastSyncDisplay, forceSync, isSyncing } = useSync();

  return (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${
            syncStatus === SYNC_STATUS.SYNCED ? 'bg-green-100' :
            syncStatus === SYNC_STATUS.SYNCING ? 'bg-blue-100' :
            syncStatus === SYNC_STATUS.ERROR ? 'bg-red-100' : 'bg-gray-100'
          }`}>
            <SyncIndicator showText={false} size="lg" />
          </div>
          <div>
            <p className="font-medium text-gray-900">Cloud Sync</p>
            <p className="text-sm text-gray-500">
              {lastSyncTime ? `Last synced: ${getLastSyncDisplay()}` : 'Not synced yet'}
            </p>
          </div>
        </div>
        <button
          onClick={forceSync}
          disabled={isSyncing}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            isSyncing
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>
    </div>
  );
};

export default SyncIndicator;
