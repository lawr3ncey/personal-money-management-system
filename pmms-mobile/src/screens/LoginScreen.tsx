/**
 * Login Screen
 * Authentication screen for user login
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useAuth, useNotification } from '@/contexts';
import { COLORS } from '@/constants/config';
import { NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '@/navigation';

interface Props {
  navigation: NavigationProp<AuthStackParamList, 'Login'>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, demoLogin } = useAuth();
  const { showNotification } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showNotification('error', 'Please enter email and password');
      return;
    }

    setIsLoading(true);
    const { error } = await login({ email, password });
    setIsLoading(false);

    if (error) {
      showNotification('error', error);
    } else {
      showNotification('success', 'Login successful');
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    const { error } = await demoLogin();
    setIsLoading(false);

    if (error) {
      showNotification('error', error);
    } else {
      showNotification('success', 'Demo login successful');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>6 Jars Money Manager</Text>
          <Text style={styles.subtitle}>Login to manage your finances</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!isLoading}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />

            <TouchableOpacity
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonSecondary, isLoading && styles.buttonDisabled]}
              onPress={handleDemoLogin}
              disabled={isLoading}
            >
              <Text style={styles.buttonSecondaryText}>Demo Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              disabled={isLoading}
            >
              <Text style={styles.linkText}>
                Don't have an account? <Text style={styles.linkTextBold}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[50],
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray[600],
    marginBottom: 32,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondaryText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    fontSize: 14,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginTop: 24,
  },
  linkTextBold: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;
