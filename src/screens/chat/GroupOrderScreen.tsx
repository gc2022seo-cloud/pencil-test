import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DemoBanner from '../../components/DemoBanner';
import StatusBadge from '../../components/StatusBadge';
import { getGroupOrderById } from '../../data/mockData';
import { ChatStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';

type Rt = RouteProp<ChatStackParamList, 'GroupOrder'>;

export default function GroupOrderScreen() {
  const { params } = useRoute<Rt>();
  const group = getGroupOrderById(params.groupId) ?? getGroupOrderById('g1')!;

  const total = group.members.reduce((s, m) => s + m.amount, 0);
  const paidCount = group.members.filter((m) => m.paid).length;
  const allPaid = paidCount === group.members.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{group.title}</Text>
        <Text style={styles.restaurant}>
          <Ionicons name="restaurant-outline" size={14} /> {group.restaurantName}
        </Text>
        <View style={styles.headerMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="person-outline" size={14} color="#C9D7E5" />
            <Text style={styles.metaText}>發起人：{group.host}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color="#C9D7E5" />
            <Text style={styles.metaText}>截止：{group.deadline}</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressCard}>
        <View>
          <Text style={styles.progressLabel}>付款進度</Text>
          <Text style={styles.progressValue}>
            {paidCount} / {group.members.length} 人已付款
          </Text>
        </View>
        <StatusBadge
          label={allPaid ? '訂單可成立' : '等待付款中'}
          tone={allPaid ? 'green' : 'warning'}
        />
      </View>

      <Text style={styles.sectionTitle}>參與成員（{group.members.length}）</Text>
      <View style={styles.card}>
        {group.members.map((m, i) => (
          <View
            key={m.id}
            style={[styles.member, i !== 0 && styles.memberBorder]}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{m.name.charAt(0)}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.memberName}>{m.name}</Text>
              <Text style={styles.memberItem}>{m.item}</Text>
            </View>
            <View style={styles.memberRight}>
              <Text style={styles.amount}>${m.amount}</Text>
              <StatusBadge
                label={m.paid ? '已付款' : '未付款'}
                tone={m.paid ? 'green' : 'danger'}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>團體訂單總金額</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>

      <View style={styles.ruleCard}>
        <View style={styles.ruleHeader}>
          <Ionicons name="shield-checkmark-outline" size={18} color={colors.navy} />
          <Text style={styles.ruleTitle}>付款規則</Text>
        </View>
        <Text style={styles.ruleText}>
          Demo 第一版建議採「發起人統一付款」，或「全部成員付款完成才成立訂單」。
        </Text>
        <View style={styles.ruleDivider} />
        <Text style={styles.ruleNote}>
          • 若有人未付款，正式版可設定自動排除或重新計算金額。
        </Text>
        <Text style={styles.ruleNote}>
          • 若優惠條件因取消而失效，正式版需依後台規則重新計算。
        </Text>
      </View>

      <DemoBanner text="團體分帳、退款與優惠重算為正式版進階功能，本 Demo 僅顯示付款狀態示意。" />
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  header: {
    backgroundColor: colors.navy,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.white },
  restaurant: { fontSize: fontSize.md, color: colors.green, marginTop: spacing.sm },
  headerMeta: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: fontSize.sm, color: '#C9D7E5' },
  progressCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadow.soft,
  },
  progressLabel: { fontSize: fontSize.xs, color: colors.textMuted },
  progressValue: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.soft,
  },
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  memberBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.navySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: { fontWeight: '800', color: colors.navy },
  memberName: { fontSize: fontSize.md, fontWeight: '700', color: colors.navy },
  memberItem: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  memberRight: { alignItems: 'flex-end', gap: 4 },
  amount: { fontSize: fontSize.md, fontWeight: '800', color: colors.navy },
  totalCard: {
    backgroundColor: colors.orangeSoft,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: fontSize.md, fontWeight: '800', color: '#8A4B12' },
  totalValue: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.orange },
  ruleCard: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    ...shadow.soft,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  ruleTitle: { fontSize: fontSize.md, fontWeight: '800', color: colors.navy },
  ruleText: { fontSize: fontSize.sm, color: colors.text, lineHeight: 20 },
  ruleDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  ruleNote: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: 4,
  },
});
