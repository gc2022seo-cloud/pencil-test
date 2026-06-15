import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DashboardMetricCard from '../../components/DashboardMetricCard';
import DemoBanner from '../../components/DemoBanner';
import SubNavBar from '../../components/SubNavBar';
import { merchantProfile } from '../../data/mockData';
import { MerchantStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';
import { merchantNavItems } from './navItems';

type Nav = NativeStackNavigationProp<MerchantStackParamList, 'MerchantHome'>;

export default function MerchantHomeScreen() {
  const navigation = useNavigation<Nav>();
  const p = merchantProfile;

  return (
    <View style={styles.container}>
      <SubNavBar
        items={merchantNavItems}
        activeKey="MerchantHome"
        onSelect={(k) =>
          navigation.navigate(k as keyof MerchantStackParamList)
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.shopRow}>
          <View style={styles.shopIcon}>
            <Ionicons name="storefront" size={22} color={colors.white} />
          </View>
          <View>
            <Text style={styles.shopLabel}>店家後台</Text>
            <Text style={styles.shopName}>{p.name}</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <DashboardMetricCard
            label="今日訂單數"
            value={`${p.todayOrders}`}
            icon="receipt-outline"
            tone="orange"
          />
          <View style={{ width: spacing.md }} />
          <DashboardMetricCard
            label="今日營收"
            value={`$${p.todayRevenue.toLocaleString()}`}
            icon="cash-outline"
            tone="green"
          />
        </View>
        <View style={[styles.metricsRow, { marginTop: spacing.md }]}>
          <DashboardMetricCard
            label="待處理訂單"
            value={`${p.pendingOrders}`}
            icon="alert-circle-outline"
            tone="info"
          />
          <View style={{ width: spacing.md }} />
          <DashboardMetricCard
            label="平均評分"
            value="4.8"
            icon="star-outline"
            tone="navy"
          />
        </View>

        <Text style={styles.sectionTitle}>熱門商品</Text>
        <View style={styles.card}>
          {p.popularItems.map((it, i) => (
            <View key={it.name} style={[styles.popRow, i !== 0 && styles.border]}>
              <View style={styles.rank}>
                <Text style={styles.rankText}>{i + 1}</Text>
              </View>
              <Text style={styles.popName}>{it.name}</Text>
              <Text style={styles.popCount}>{it.count} 份</Text>
            </View>
          ))}
        </View>

        <DemoBanner text="後台數據為假資料，正式版將連動 POS 與訂單系統即時統計。" />
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  shopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  shopIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopLabel: { fontSize: fontSize.xs, color: colors.textMuted },
  shopName: { fontSize: fontSize.xl, fontWeight: '900', color: colors.navy },
  metricsRow: { flexDirection: 'row' },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    ...shadow.soft,
  },
  popRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  border: { borderTopWidth: 1, borderTopColor: colors.border },
  rank: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  rankText: { fontWeight: '800', color: colors.orange },
  popName: { flex: 1, fontSize: fontSize.md, color: colors.text, fontWeight: '600' },
  popCount: { fontSize: fontSize.sm, color: colors.textMuted, fontWeight: '700' },
});
