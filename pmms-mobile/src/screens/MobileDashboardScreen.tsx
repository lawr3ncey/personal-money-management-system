import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

// 🔴 DUMMY DATA - Replace with Supabase queries later
const DUMMY_JARS = [
  { id: 1, name: 'Necessities', icon: '🏠', balance: 25000, percentage: 55, color: '#3B82F6' },
  { id: 2, name: 'Financial', icon: '💰', balance: 8000, percentage: 10, color: '#10B981' },
  { id: 3, name: 'Education', icon: '📚', balance: 5000, percentage: 10, color: '#8B5CF6' },
  { id: 4, name: 'Long-term', icon: '🎯', balance: 15000, percentage: 10, color: '#F59E0B' },
  { id: 5, name: 'Play', icon: '🎮', balance: 6000, percentage: 10, color: '#EC4899' },
  { id: 6, name: 'Give', icon: '❤️', balance: 2000, percentage: 5, color: '#EF4444' },
];

const DUMMY_RECENT_TRANSACTIONS = [
  { id: 1, description: 'Jollibee Lunch', amount: -350, jar: 'Necessities', date: '2024-12-04', icon: '🍔' },
  { id: 2, description: 'Monthly Income', amount: 50000, jar: 'Income', date: '2024-12-01', icon: '💵' },
  { id: 3, description: 'Netflix', amount: -549, jar: 'Play', date: '2024-12-03', icon: '📺' },
];

const MobileDashboardScreen = () => {
  const [selectedJar, setSelectedJar] = useState(null);

  const formatCurrency = (value) => {
    return `₱${Math.abs(value).toLocaleString()}`;
  };

  const getTotalBalance = () => {
    return DUMMY_JARS.reduce((sum, jar) => sum + jar.balance, 0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning! 👋</Text>
            <Text style={styles.username}>Juan Dela Cruz</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Total Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(getTotalBalance())}</Text>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#10B981' }]}>
              <Text style={styles.actionButtonText}>➕ Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EF4444' }]}>
              <Text style={styles.actionButtonText}>➖ Add Expense</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Jars Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your 6 Jars</Text>
          <View style={styles.jarsGrid}>
            {DUMMY_JARS.map(jar => (
              <TouchableOpacity
                key={jar.id}
                style={[styles.jarCard, selectedJar === jar.id && styles.jarCardSelected]}
                onPress={() => setSelectedJar(jar.id)}
              >
                <View style={[styles.jarIcon, { backgroundColor: jar.color + '20' }]}>
                  <Text style={styles.jarEmoji}>{jar.icon}</Text>
                </View>
                <Text style={styles.jarName}>{jar.name}</Text>
                <Text style={styles.jarBalance}>{formatCurrency(jar.balance)}</Text>
                <Text style={styles.jarPercentage}>{jar.percentage}%</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See All →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionsList}>
            {DUMMY_RECENT_TRANSACTIONS.map(txn => (
              <View key={txn.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionEmoji}>{txn.icon}</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionDescription}>{txn.description}</Text>
                  <Text style={styles.transactionJar}>{txn.jar} • {txn.date}</Text>
                </View>
                <Text style={[
                  styles.transactionAmount,
                  { color: txn.amount > 0 ? '#10B981' : '#EF4444' }
                ]}>
                  {txn.amount > 0 ? '+' : ''}{formatCurrency(txn.amount)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionText}>Analytics</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>🎯</Text>
              <Text style={styles.quickActionText}>Goals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>🔔</Text>
              <Text style={styles.quickActionText}>Bills</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Text style={styles.quickActionIcon}>⚙️</Text>
              <Text style={styles.quickActionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIconActive}>🏠</Text>
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏺</Text>
          <Text style={styles.navText}>Jars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.navItemCenter]}>
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>💸</Text>
          <Text style={styles.navText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#8B5CF6',
    paddingTop: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#E9D5FF',
    fontWeight: '500',
  },
  username: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginTop: 4,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: -30,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 36,
    color: '#1F2937',
    fontWeight: 'bold',
    marginTop: 8,
  },
  balanceActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  seeAllLink: {
    color: '#8B5CF6',
    fontWeight: '600',
    fontSize: 14,
  },
  jarsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  jarCard: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  jarCardSelected: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  jarIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  jarEmoji: {
    fontSize: 24,
  },
  jarName: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  jarBalance: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  jarPercentage: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    marginBottom: 4,
  },
  transactionJar: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemCenter: {
    marginTop: -20,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 11,
    color: '#6B7280',
  },
  navTextActive: {
    fontSize: 11,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
  },
});

export default MobileDashboardScreen;

// 🔴 IMPLEMENTATION NOTES:
// - This is a React Native screen for the mobile app
// - Replace dummy data with Supabase queries using @supabase/supabase-js
// - Add navigation using @react-navigation/native
// - Implement touch gestures for better UX
// - Add pull-to-refresh functionality
// - Connect to backend API for real data
// - Add loading states and error handling
// - Implement offline mode with AsyncStorage
