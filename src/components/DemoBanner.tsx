import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../theme';

interface Props {
  text?: string;
}

/** Demo 提示橫幅，用於提醒功能未串接正式服務 */
export default function DemoBanner({
  text = '本 Demo 為前端展示版本，尚未串接正式金流、POS 與外送平台。',
}: Props) {
  return (
    <View style={styles.banner}>
      <Ionicons name="information-circle" size={16} color={colors.orange} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.orangeSoft,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  text: {
    flex: 1,
    marginLeft: spacing.sm,
    color: '#8A4B12',
    fontSize: fontSize.xs,
    lineHeight: 16,
  },
});
