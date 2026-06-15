import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GroupOrderCardData } from '../data/mockData';
import { colors, fontSize, radius, spacing } from '../theme';

interface Props {
  data: GroupOrderCardData;
  onPress: () => void;
}

/** 聊天室中的團購卡片 */
export default function GroupOrderCard({ data, onPress }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="restaurant" size={16} color={colors.orange} />
        <Text style={styles.tag}>團體訂餐</Text>
      </View>
      <Text style={styles.title}>{data.restaurantName}</Text>
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={14} color={colors.textMuted} />
        <Text style={styles.info}>截止時間：{data.deadline}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="people-outline" size={14} color={colors.textMuted} />
        <Text style={styles.info}>目前 {data.participants} 人參與</Text>
      </View>
      <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.btn}>
        <Text style={styles.btnText}>查看團購</Text>
        <Ionicons name="arrow-forward" size={16} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.orangeSoft,
    padding: spacing.md,
    width: 240,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.sm,
  },
  tag: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: colors.orange,
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  info: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.orange,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    marginTop: spacing.sm,
  },
  btnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: fontSize.sm,
  },
});
