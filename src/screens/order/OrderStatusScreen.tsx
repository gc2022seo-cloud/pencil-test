import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DemoBanner from '../../components/DemoBanner';
import OrderStatusStepper from '../../components/OrderStatusStepper';
import PrimaryButton from '../../components/PrimaryButton';
import StatusBadge from '../../components/StatusBadge';
import { sampleOrder } from '../../data/mockData';
import { OrderStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';

type Nav = NativeStackNavigationProp<OrderStackParamList, 'OrderStatus'>;

export default function OrderStatusScreen() {
  const navigation = useNavigation<Nav>();
  const o = sampleOrder;
  const subtotal = o.lines.reduce((s, l) => s + l.qty * l.price, 0);
  const total = subtotal + o.deliveryFee + o.serviceFee;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.successCard}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={28} color={colors.white} />
        </View>
        <Text style={styles.successTitle}>訂單已送出！</Text>
        <Text style={styles.orderId}>訂單編號：{o.id}</Text>
        <StatusBadge label="餐點準備中" tone="orange" />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>訂單進度</Text>
        <OrderStatusStepper currentStatus={o.currentStatus} />
      </View>

      <View style={styles.card}>
        <View style={styles.detailHeader}>
          <Text style={styles.sectionTitle}>訂單明細</Text>
          <Text style={styles.restaurant}>{o.restaurantName}</Text>
        </View>
        {o.lines.map((l) => (
          <View key={l.name} style={styles.line}>
            <Text style={styles.lineQty}>{l.qty}×</Text>
            <Text style={styles.lineName}>{l.name}</Text>
            <Text style={styles.linePrice}>${l.qty * l.price}</Text>
          </View>
        ))}
        <View style={styles.divider} />
        <SmallRow label="小計" value={`$${subtotal}`} />
        <SmallRow label="服務費" value={`$${o.serviceFee}`} />
        <SmallRow label="運費" value={`$${o.deliveryFee}`} />
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>總金額</Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>
        <View style={styles.payRow}>
          <Ionicons name="card-outline" size={16} color={colors.textMuted} />
          <Text style={styles.payText}>付款方式：{o.paymentMethod}</Text>
        </View>
      </View>

      <DemoBanner text="訂單狀態為假資料模擬，正式版將即時連動店家 POS 與付款系統更新進度。" />

      <PrimaryButton
        title="返回店家列表"
        variant="outline"
        style={{ marginTop: spacing.md }}
        onPress={() => navigation.navigate('RestaurantList')}
      />
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

function SmallRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.smallRow}>
      <Text style={styles.smallLabel}>{label}</Text>
      <Text style={styles.smallValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  successCard: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
    ...shadow.card,
  },
  successIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  successTitle: {
    fontSize: fontSize.xl,
    fontWeight: '900',
    color: colors.navy,
  },
  orderId: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.soft,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: spacing.md,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurant: { fontSize: fontSize.sm, color: colors.textMuted },
  line: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6 },
  lineQty: { width: 32, fontWeight: '800', color: colors.orange },
  lineName: { flex: 1, fontSize: fontSize.md, color: colors.text },
  linePrice: { fontWeight: '700', color: colors.navy },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  smallRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  smallLabel: { color: colors.textMuted, fontSize: fontSize.sm },
  smallValue: { color: colors.text, fontSize: fontSize.sm, fontWeight: '600' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: { fontSize: fontSize.lg, fontWeight: '900', color: colors.navy },
  totalValue: { fontSize: fontSize.xl, fontWeight: '900', color: colors.orange },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.md,
  },
  payText: { fontSize: fontSize.sm, color: colors.textMuted },
});
