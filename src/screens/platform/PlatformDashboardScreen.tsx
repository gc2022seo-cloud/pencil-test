import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DashboardMetricCard from '../../components/DashboardMetricCard';
import DemoBanner from '../../components/DemoBanner';
import SubNavBar from '../../components/SubNavBar';
import { platformModules, platformOverview } from '../../data/mockData';
import { PlatformStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';
import { platformNavItems } from './navItems';

type Nav = NativeStackNavigationProp<PlatformStackParamList, 'PlatformDashboard'>;

export default function PlatformDashboardScreen() {
  const navigation = useNavigation<Nav>();
  const o = platformOverview;

  return (
    <View style={styles.container}>
      <SubNavBar
        items={platformNavItems}
        activeKey="PlatformDashboard"
        onSelect={(k) =>
          navigation.navigate(k as keyof PlatformStackParamList)
        }
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>平台管理中控台</Text>
        <Text style={styles.sub}>系統總覽與模組入口</Text>

        <View style={styles.metricsRow}>
          <DashboardMetricCard
            label="會員數"
            value={o.members.toLocaleString()}
            icon="people-outline"
            tone="navy"
          />
          <View style={{ width: spacing.md }} />
          <DashboardMetricCard
            label="店家數"
            value={`${o.merchants}`}
            icon="storefront-outline"
            tone="orange"
          />
        </View>
        <View style={[styles.metricsRow, { marginTop: spacing.md }]}>
          <DashboardMetricCard
            label="今日訂單數"
            value={o.todayOrders.toLocaleString()}
            icon="receipt-outline"
            tone="info"
          />
          <View style={{ width: spacing.md }} />
          <DashboardMetricCard
            label="今日交易金額"
            value={`$${o.todayAmount.toLocaleString()}`}
            icon="cash-outline"
            tone="green"
          />
        </View>

        <Text style={styles.sectionTitle}>系統模組</Text>
        <View style={styles.grid}>
          {platformModules.map((m) => (
            <View key={m.id} style={styles.module}>
              <View style={styles.moduleIcon}>
                <Ionicons
                  name={m.icon as keyof typeof Ionicons.glyphMap}
                  size={22}
                  color={colors.navy}
                />
              </View>
              <Text style={styles.moduleName}>{m.name}</Text>
            </View>
          ))}
        </View>

        <DemoBanner text="平台數據為假資料，正式版將整合會員、店家、金流與活動審核等子系統。" />
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  heading: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.navy },
  sub: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2, marginBottom: spacing.lg },
  metricsRow: { flexDirection: 'row' },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  module: {
    width: '31.5%',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  moduleIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    backgroundColor: colors.navySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  moduleName: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.navy,
    textAlign: 'center',
  },
});
