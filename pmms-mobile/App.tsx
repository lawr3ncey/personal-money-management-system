import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Providers
import { AuthProvider } from './src/contexts/AuthContext';
import { SyncProvider } from './src/contexts/SyncContext';
import { NotificationProvider } from './src/contexts/NotificationContext';

// Navigation
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <SyncProvider>
            <NotificationProvider>
              <StatusBar style="auto" />
              <AppNavigator />
            </NotificationProvider>
          </SyncProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

// Register the main component
registerRootComponent(App);

export default App;
