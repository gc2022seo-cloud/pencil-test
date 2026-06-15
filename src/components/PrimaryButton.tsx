import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors, fontSize, radius, spacing } from '../theme';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

/** 通用按鈕 */
export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  loading,
  style,
}: Props) {
  const isOutline = variant === 'outline';
  const bg =
    variant === 'primary'
      ? colors.orange
      : variant === 'secondary'
      ? colors.navy
      : 'transparent';
  const fg = isOutline ? colors.navy : colors.white;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.btn,
        { backgroundColor: bg },
        isOutline && styles.outline,
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon && (
            <Ionicons name={icon} size={18} color={fg} style={styles.icon} />
          )}
          <Text style={[styles.text, { color: fg }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.navy,
  },
  disabled: {
    opacity: 0.5,
  },
  icon: {
    marginRight: spacing.sm,
  },
  text: {
    fontSize: fontSize.md,
    fontWeight: '700',
  },
});
