import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MenuItem } from '../data/mockData';
import { colors, fontSize, radius, shadow, spacing } from '../theme';

interface Props {
  item: MenuItem;
  qty: number;
  onAdd: () => void;
}

/** 商品卡片：圖片、名稱、簡介、價格、加入購物車 */
export default function MenuItemCard({ item, qty, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.body}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {item.desc}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={onAdd} style={styles.addBtn}>
        <Ionicons name="add" size={20} color={colors.white} />
        {qty > 0 && (
          <View style={styles.qtyBadge}>
            <Text style={styles.qtyText}>{qty}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    ...shadow.soft,
  },
  image: {
    width: 78,
    height: 78,
    borderRadius: radius.sm,
    backgroundColor: colors.creamDark,
  },
  body: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.navy,
  },
  desc: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 16,
  },
  price: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.orange,
    marginTop: spacing.sm,
  },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.white,
  },
  qtyText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
});
