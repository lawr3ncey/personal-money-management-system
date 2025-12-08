/**
 * Profile Screen
 * User profile management
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth, useNotification } from '@/contexts';
import { COLORS } from '@/constants/config';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();
  const { showNotification } = useNotification();

  const handleLogout = async () => {
    await logout();
    showNotification('success', 'Logged out successfully');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        {user && (
          <>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.name}</Text>
            
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </>
        )}
        
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray[900],
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[600],
    marginTop: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: COLORS.gray[900],
  },
  button: {
    backgroundColor: COLORS.error,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;
