import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../theme';

interface Props {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone?: 'orange' | 'navy' | 'green' | 'info';
}

const toneMap = {
  orange: { bg: colors.orangeSoft, fg: colors.orange },
  navy: { bg: colors.navySoft, fg: colors.navy },
  green: { bg: colors.greenSoft, fg: '#2E7D58' },
  info: { bg: colors.infoSoft, fg: colors.info },
};

/** 後台數據卡片 */
export default function DashboardMetricCard({
  label,
  value,
  icon,
  tone = 'orange',
}: Props) {
  const c = toneMap[tone];
  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: c.bg }]}>
        <Ionicons name={icon} size={20} color={c.fg} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    ...shadow.soft,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  value: {
    fontSize: fontSize.xl,
    fontWeight: '800',
    color: colors.navy,
  },
  label: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
});
