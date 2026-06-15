import { Ionicons } from '@expo/vector-icons';
import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MenuItemCard from '../../components/MenuItemCard';
import StatusBadge from '../../components/StatusBadge';
import {
  getRestaurantById,
  menuCategories,
  MenuItem,
} from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { OrderStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';

type Nav = NativeStackNavigationProp<OrderStackParamList, 'Menu'>;
type Rt = RouteProp<OrderStackParamList, 'Menu'>;

export default function MenuScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Rt>();
  const restaurant = getRestaurantById(params.restaurantId);
  const cart = useCart();
  const [activeCat, setActiveCat] =
    useState<MenuItem['category']>('熱門餐點');

  useEffect(() => {
    if (restaurant) cart.setRestaurant(restaurant);
    navigation.setOptions({ title: restaurant?.name ?? '菜單' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurant?.id]);

  const filtered = useMemo(
    () => restaurant?.menu.filter((m) => m.category === activeCat) ?? [],
    [restaurant, activeCat]
  );

  if (!restaurant) {
    return (
      <View style={styles.center}>
        <Text>找不到店家資料</Text>
      </View>
    );
  }

  const qtyOf = (id: string) =>
    cart.items.find((c) => c.item.id === id)?.qty ?? 0;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: restaurant.image }} style={styles.hero} />
        <View style={styles.infoCard}>
          <View style={styles.infoTop}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <StatusBadge
              label={restaurant.isOpen ? '營業中' : '休息中'}
              tone={restaurant.isOpen ? 'green' : 'gray'}
            />
          </View>
          <Text style={styles.type}>{restaurant.type}</Text>
          <View style={styles.metaRow}>
            <Meta icon="star" text={`${restaurant.rating.toFixed(1)} 評分`} />
            <Meta icon="time-outline" text={restaurant.prepTime} />
            <Meta icon="bicycle-outline" text={`外送 $${restaurant.deliveryFee}`} />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {menuCategories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCat(cat)}
              style={[styles.catChip, activeCat === cat && styles.catChipActive]}
            >
              <Text
                style={[
                  styles.catText,
                  activeCat === cat && styles.catTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.menuWrap}>
          <Text style={styles.sectionTitle}>{activeCat}</Text>
          {filtered.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              qty={qtyOf(item.id)}
              onAdd={() => cart.add(item)}
            />
          ))}
        </View>
        <View style={{ height: 110 }} />
      </ScrollView>

      {cart.totalQty > 0 && (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.cartBar}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cart.totalQty}</Text>
          </View>
          <Text style={styles.cartBarText}>查看購物車</Text>
          <Text style={styles.cartBarPrice}>${cart.subtotal}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function Meta({
  icon,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}) {
  return (
    <View style={styles.meta}>
      <Ionicons name={icon} size={14} color={colors.textMuted} />
      <Text style={styles.metaText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { width: '100%', height: 180, backgroundColor: colors.creamDark },
  infoCard: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.card,
  },
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: fontSize.xl, fontWeight: '900', color: colors.navy, flex: 1 },
  type: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  metaRow: { flexDirection: 'row', gap: spacing.lg, marginTop: spacing.md },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: fontSize.sm, color: colors.text, fontWeight: '600' },
  catRow: { paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, gap: spacing.sm },
  catChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catChipActive: { backgroundColor: colors.orange, borderColor: colors.orange },
  catText: { color: colors.textMuted, fontWeight: '700', fontSize: fontSize.sm },
  catTextActive: { color: colors.white },
  menuWrap: { paddingHorizontal: spacing.lg },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: spacing.md,
  },
  cartBar: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    backgroundColor: colors.orange,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.lg,
    ...shadow.card,
  },
  cartCount: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: { color: colors.orange, fontWeight: '900' },
  cartBarText: {
    flex: 1,
    color: colors.white,
    fontWeight: '800',
    fontSize: fontSize.md,
    marginLeft: spacing.md,
  },
  cartBarPrice: { color: colors.white, fontWeight: '900', fontSize: fontSize.lg },
});
