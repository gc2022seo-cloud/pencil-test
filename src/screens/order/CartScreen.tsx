import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DemoBanner from '../../components/DemoBanner';
import PrimaryButton from '../../components/PrimaryButton';
import { useCart } from '../../context/CartContext';
import { OrderStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';

type Nav = NativeStackNavigationProp<OrderStackParamList, 'Cart'>;
type PayMethod = 'host' | 'split';

export default function CartScreen() {
  const navigation = useNavigation<Nav>();
  const cart = useCart();
  const [payMethod, setPayMethod] = useState<PayMethod>('host');

  const serviceFee = Math.round(
    cart.subtotal * (cart.restaurant?.serviceFeeRate ?? 0.05)
  );
  const deliveryFee = cart.restaurant?.deliveryFee ?? 0;
  const total = cart.subtotal + serviceFee + deliveryFee;

  if (cart.items.length === 0) {
    return (
      <View style={styles.empty}>
        <Ionicons name="cart-outline" size={56} color={colors.textLight} />
        <Text style={styles.emptyText}>購物車是空的</Text>
        <PrimaryButton
          title="去逛逛店家"
          variant="outline"
          style={{ marginTop: spacing.lg }}
          onPress={() => navigation.navigate('RestaurantList')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.restaurant}>{cart.restaurant?.name}</Text>

        <View style={styles.card}>
          {cart.items.map((c) => (
            <View key={c.item.id} style={styles.line}>
              <View style={{ flex: 1 }}>
                <Text style={styles.lineName}>{c.item.name}</Text>
                <Text style={styles.linePrice}>${c.item.price}</Text>
              </View>
              <View style={styles.stepper}>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => cart.decrement(c.item.id)}
                >
                  <Ionicons name="remove" size={16} color={colors.navy} />
                </TouchableOpacity>
                <Text style={styles.qty}>{c.qty}</Text>
                <TouchableOpacity
                  style={styles.stepBtn}
                  onPress={() => cart.increment(c.item.id)}
                >
                  <Ionicons name="add" size={16} color={colors.navy} />
                </TouchableOpacity>
              </View>
              <Text style={styles.lineTotal}>${c.qty * c.item.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Row label="小計" value={`$${cart.subtotal}`} />
          <Row
            label={`服務費（${Math.round(
              (cart.restaurant?.serviceFeeRate ?? 0.05) * 100
            )}%）`}
            value={`$${serviceFee}`}
            hint="示意：平台服務費"
          />
          <Row
            label="運費分攤"
            value={`$${deliveryFee}`}
            hint="示意：多人團購可均分"
          />
          <View style={styles.divider} />
          <Row label="總金額" value={`$${total}`} bold />
        </View>

        <Text style={styles.sectionTitle}>付款方式</Text>
        <PayOption
          active={payMethod === 'host'}
          onPress={() => setPayMethod('host')}
          icon="person-outline"
          title="發起人統一付款"
          desc="由團購發起人一次結帳，成員事後私下分帳。"
        />
        <PayOption
          active={payMethod === 'split'}
          onPress={() => setPayMethod('split')}
          icon="people-outline"
          title="成員各自付款"
          desc="Demo 模式僅顯示付款狀態，正式版支援線上分帳收款。"
        />

        <DemoBanner text="團體分帳、退款與優惠重算為正式版進階功能，本 Demo 僅顯示狀態示意。" />
        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>應付總額</Text>
          <Text style={styles.footerTotal}>${total}</Text>
        </View>
        <PrimaryButton
          title="送出訂單"
          icon="checkmark-circle-outline"
          style={{ flex: 1, marginLeft: spacing.lg }}
          onPress={() => {
            cart.clear();
            navigation.navigate('OrderStatus', { fromCheckout: true });
          }}
        />
      </View>
    </View>
  );
}

function Row({
  label,
  value,
  hint,
  bold,
}: {
  label: string;
  value: string;
  hint?: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <View>
        <Text style={[styles.summaryLabel, bold && styles.summaryBold]}>
          {label}
        </Text>
        {hint && <Text style={styles.summaryHint}>{hint}</Text>}
      </View>
      <Text style={[styles.summaryValue, bold && styles.summaryTotalValue]}>
        {value}
      </Text>
    </View>
  );
}

function PayOption({
  active,
  onPress,
  icon,
  title,
  desc,
}: {
  active: boolean;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.payOption, active && styles.payOptionActive]}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? colors.orange : colors.textMuted}
      />
      <View style={{ flex: 1, marginLeft: spacing.md }}>
        <Text style={styles.payTitle}>{title}</Text>
        <Text style={styles.payDesc}>{desc}</Text>
      </View>
      <Ionicons
        name={active ? 'radio-button-on' : 'radio-button-off'}
        size={20}
        color={active ? colors.orange : colors.textLight}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cream,
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: fontSize.lg,
    color: colors.textMuted,
    marginTop: spacing.md,
    fontWeight: '700',
  },
  restaurant: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadow.soft,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  lineName: { fontSize: fontSize.md, fontWeight: '700', color: colors.navy },
  linePrice: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    minWidth: 28,
    textAlign: 'center',
    fontWeight: '800',
    color: colors.navy,
  },
  lineTotal: {
    minWidth: 56,
    textAlign: 'right',
    fontWeight: '800',
    color: colors.navy,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  summaryLabel: { fontSize: fontSize.md, color: colors.text },
  summaryBold: { fontWeight: '900', color: colors.navy, fontSize: fontSize.lg },
  summaryHint: { fontSize: fontSize.xs, color: colors.textLight, marginTop: 2 },
  summaryValue: { fontSize: fontSize.md, color: colors.text, fontWeight: '600' },
  summaryTotalValue: {
    fontSize: fontSize.xl,
    fontWeight: '900',
    color: colors.orange,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: spacing.md,
  },
  payOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  payOptionActive: { borderColor: colors.orange, backgroundColor: '#FFFBF7' },
  payTitle: { fontSize: fontSize.md, fontWeight: '800', color: colors.navy },
  payDesc: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerLabel: { fontSize: fontSize.xs, color: colors.textMuted },
  footerTotal: { fontSize: fontSize.xl, fontWeight: '900', color: colors.navy },
});
