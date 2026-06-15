import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DemoBanner from '../../components/DemoBanner';
import PrimaryButton from '../../components/PrimaryButton';
import { HomeStackParamList, RootTabParamList } from '../../navigation/types';
import { colors, fontSize, radius, spacing } from '../../theme';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Auth'>;

export default function AuthScreen() {
  const navigation = useNavigation<Nav>();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [account, setAccount] = useState('demo@foodorder.app');
  const [password, setPassword] = useState('demo1234');
  const [name, setName] = useState('');

  const submit = () => {
    // Demo：任何輸入皆視為成功，直接進入店家列表
    navigation
      .getParent<NativeStackNavigationProp<RootTabParamList>>()
      ?.navigate('OrderTab', { screen: 'RestaurantList' });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoBadge}>
          <Ionicons name="restaurant" size={28} color={colors.white} />
        </View>
        <Text style={styles.title}>
          {mode === 'login' ? '會員登入' : '會員註冊'}
        </Text>
        <Text style={styles.subtitle}>使用假資料即可體驗完整流程</Text>

        <View style={styles.switchRow}>
          <TouchableOpacity
            style={[styles.switchBtn, mode === 'login' && styles.switchActive]}
            onPress={() => setMode('login')}
          >
            <Text
              style={[
                styles.switchText,
                mode === 'login' && styles.switchTextActive,
              ]}
            >
              登入
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.switchBtn, mode === 'register' && styles.switchActive]}
            onPress={() => setMode('register')}
          >
            <Text
              style={[
                styles.switchText,
                mode === 'register' && styles.switchTextActive,
              ]}
            >
              註冊
            </Text>
          </TouchableOpacity>
        </View>

        {mode === 'register' && (
          <Field
            icon="person-outline"
            placeholder="姓名 / 暱稱"
            value={name}
            onChangeText={setName}
          />
        )}
        <Field
          icon="mail-outline"
          placeholder="手機或 Email"
          value={account}
          onChangeText={setAccount}
          autoCapitalize="none"
        />
        <Field
          icon="lock-closed-outline"
          placeholder="密碼"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={{ height: spacing.lg }} />
        <PrimaryButton
          title={mode === 'login' ? '登入並開始點餐' : '註冊並開始點餐'}
          onPress={submit}
        />

        <DemoBanner text="Demo 模式：不驗證帳號密碼，任何輸入皆可登入。正式版將串接會員系統與簡訊／Email 驗證。" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({
  icon,
  ...props
}: { icon: keyof typeof Ionicons.glyphMap } & React.ComponentProps<
  typeof TextInput
>) {
  return (
    <View style={styles.field}>
      <Ionicons name={icon} size={18} color={colors.textMuted} />
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textLight}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.xl },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '900',
    color: colors.navy,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: spacing.xl,
  },
  switchRow: {
    flexDirection: 'row',
    backgroundColor: colors.creamDark,
    borderRadius: radius.md,
    padding: 4,
    marginBottom: spacing.xl,
  },
  switchBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  switchActive: {
    backgroundColor: colors.white,
  },
  switchText: { color: colors.textMuted, fontWeight: '700' },
  switchTextActive: { color: colors.navy },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md + 2,
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
