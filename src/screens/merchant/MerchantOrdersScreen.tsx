import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StatusBadge from '../../components/StatusBadge';
import SubNavBar from '../../components/SubNavBar';
import { MerchantOrder, merchantOrders } from '../../data/mockData';
import { MerchantStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';
import { merchantNavItems } from './navItems';

type Nav = NativeStackNavigationProp<MerchantStackParamList, 'MerchantOrders'>;

const filters: (MerchantOrder['status'] | '全部')[] = [
  '全部',
  '新訂單',
  '準備中',
  '已完成',
  '已取消',
];

const toneOf = (s: MerchantOrder['status']) =>
  s === '新訂單'
    ? 'orange'
    : s === '準備中'
    ? 'info'
    : s === '已完成'
    ? 'green'
    : 'gray';

export default function MerchantOrdersScreen() {
  const navigation = useNavigation<Nav>();
  const [filter, setFilter] = useState<(typeof filters)[number]>('全部');
  const [expanded, setExpanded] = useState<string | null>(null);

  const data = useMemo(
    () =>
      filter === '全部'
        ? merchantOrders
        : merchantOrders.filter((o) => o.status === filter),
    [filter]
  );

  return (
    <View style={styles.container}>
      <SubNavBar
        items={merchantNavItems}
        activeKey="MerchantOrders"
        onSelect={(k) =>
          navigation.navigate(k as keyof MerchantStackParamList)
        }
      />
      <FlatList
        data={data}
        keyExtractor={(o) => o.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.filterRow}>
            {filters.map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={[styles.chip, filter === f && styles.chipActive]}
              >
                <Text
                  style={[styles.chipText, filter === f && styles.chipTextActive]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        }
        renderItem={({ item }) => {
          const open = expanded === item.id;
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setExpanded(open ? null : item.id)}
              style={styles.card}
            >
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.orderId}>{item.id}</Text>
                  <Text style={styles.customer}>{item.customer}</Text>
                </View>
                <StatusBadge label={item.status} tone={toneOf(item.status)} />
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.time}>
                  <Ionicons name="time-outline" size={13} /> {item.time}
                </Text>
                <Text style={styles.total}>${item.total}</Text>
              </View>
              {open && (
                <View style={styles.detail}>
                  {item.items.map((l) => (
                    <View key={l.name} style={styles.detailLine}>
                      <Text style={styles.detailQty}>{l.qty}×</Text>
                      <Text style={styles.detailName}>{l.name}</Text>
                      <Text style={styles.detailPrice}>${l.qty * l.price}</Text>
                    </View>
                  ))}
                </View>
              )}
              <Text style={styles.expandHint}>
                {open ? '收合明細 ▲' : '查看明細 ▼'}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: colors.navy, borderColor: colors.navy },
  chipText: { fontSize: fontSize.sm, color: colors.textMuted, fontWeight: '700' },
  chipTextActive: { color: colors.white },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: { fontSize: fontSize.md, fontWeight: '800', color: colors.navy },
  customer: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  time: { fontSize: fontSize.sm, color: colors.textMuted },
  total: { fontSize: fontSize.lg, fontWeight: '900', color: colors.orange },
  detail: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailLine: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
  detailQty: { width: 30, fontWeight: '800', color: colors.orange },
  detailName: { flex: 1, fontSize: fontSize.sm, color: colors.text },
  detailPrice: { fontSize: fontSize.sm, fontWeight: '700', color: colors.navy },
  expandHint: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
