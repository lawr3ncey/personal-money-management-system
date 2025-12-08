/**
 * Budgets Screen
 * Manages monthly budgets with tracking and alerts
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '@/constants/config';

const BudgetsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.placeholder}>Budgets content coming soon...</Text>
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
  placeholder: {
    fontSize: 14,
    color: COLORS.gray[500],
    textAlign: 'center',
    marginTop: 32,
  },
});

export default BudgetsScreen;
