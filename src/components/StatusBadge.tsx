import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../theme';

type Tone = 'green' | 'orange' | 'navy' | 'gray' | 'warning' | 'danger' | 'info';

interface Props {
  label: string;
  tone?: Tone;
}

const toneMap: Record<Tone, { bg: string; fg: string }> = {
  green: { bg: colors.greenSoft, fg: '#2E7D58' },
  orange: { bg: colors.orangeSoft, fg: colors.orange },
  navy: { bg: colors.navySoft, fg: colors.navy },
  gray: { bg: colors.creamDark, fg: colors.textMuted },
  warning: { bg: colors.warningSoft, fg: '#B07A14' },
  danger: { bg: colors.dangerSoft, fg: colors.danger },
  info: { bg: colors.infoSoft, fg: colors.info },
};

/** 通用狀態標籤 */
export default function StatusBadge({ label, tone = 'gray' }: Props) {
  const c = toneMap[tone];
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.text, { color: c.fg }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: fontSize.xs,
    fontWeight: '700',
  },
});
