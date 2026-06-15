import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Restaurant } from '../data/mockData';
import { colors, fontSize, radius, shadow, spacing } from '../theme';
import StatusBadge from './StatusBadge';

interface Props {
  restaurant: Restaurant;
  onPress: () => void;
}

/** 店家卡片：圖片、店名、類型、評分、營業狀態、出餐時間 */
export default function RestaurantCard({ restaurant, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.card}
    >
      <View>
        <Image source={{ uri: restaurant.image }} style={styles.image} />
        <View style={styles.statusFloat}>
          <StatusBadge
            label={restaurant.isOpen ? '營業中' : '休息中'}
            tone={restaurant.isOpen ? 'green' : 'gray'}
          />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.type}>{restaurant.type}</Text>
        <View style={styles.metaRow}>
          <View style={styles.meta}>
            <Ionicons name="star" size={14} color={colors.warning} />
            <Text style={styles.metaText}>{restaurant.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.meta}>
            <Ionicons name="time-outline" size={14} color={colors.textMuted} />
            <Text style={styles.metaText}>{restaurant.prepTime}</Text>
          </View>
          <View style={styles.meta}>
            <Ionicons name="bicycle-outline" size={14} color={colors.textMuted} />
            <Text style={styles.metaText}>外送 ${restaurant.deliveryFee}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    ...shadow.card,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: colors.creamDark,
  },
  statusFloat: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
  },
  body: {
    padding: spacing.lg,
  },
  name: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
  },
  type: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.lg,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '600',
  },
});
