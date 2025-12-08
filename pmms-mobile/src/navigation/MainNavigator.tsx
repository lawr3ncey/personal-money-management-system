/**
 * Main Navigator
 * Bottom tab navigator for main app screens
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/config';

import DashboardScreen from '@/screens/DashboardScreen';
import JarsScreen from '@/screens/JarsScreen';
import TransactionsScreen from '@/screens/TransactionsScreen';
import BudgetsScreen from '@/screens/BudgetsScreen';
import GoalsScreen from '@/screens/GoalsScreen';
import RecurringScreen from '@/screens/RecurringScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import SettingsScreen from '@/screens/SettingsScreen';

export type MainTabParamList = {
  Dashboard: undefined;
  Jars: undefined;
  Transactions: undefined;
  Budgets: undefined;
  Goals: undefined;
  Recurring: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Jars':
              iconName = focused ? 'jar' : 'jar-outline';
              break;
            case 'Transactions':
              iconName = focused ? 'list' : 'list-outline';
              break;
            case 'Budgets':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Goals':
              iconName = focused ? 'trophy' : 'trophy-outline';
              break;
            case 'Recurring':
              iconName = focused ? 'repeat' : 'repeat-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray[400],
        headerShown: true,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Jars"
        component={JarsScreen}
        options={{ title: '6 Jars' }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ title: 'Transactions' }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetsScreen}
        options={{ title: 'Budgets' }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{ title: 'Goals' }}
      />
      <Tab.Screen
        name="Recurring"
        component={RecurringScreen}
        options={{ title: 'Recurring' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
