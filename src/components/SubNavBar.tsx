import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { colors, fontSize, radius, spacing } from '../theme';

export interface SubNavItem {
  key: string;
  label: string;
}

interface Props {
  items: SubNavItem[];
  activeKey: string;
  onSelect: (key: string) => void;
}

/** 後台子頁切換列 */
export default function SubNavBar({ items, activeKey, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      style={styles.wrap}
    >
      {items.map((it) => {
        const active = it.key === activeKey;
        return (
          <TouchableOpacity
            key={it.key}
            onPress={() => onSelect(it.key)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {it.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    flexGrow: 0,
  },
  row: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.cream,
  },
  chipActive: { backgroundColor: colors.navy },
  text: { fontSize: fontSize.sm, fontWeight: '700', color: colors.textMuted },
  textActive: { color: colors.white },
});
