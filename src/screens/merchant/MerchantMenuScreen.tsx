import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import StatusBadge from '../../components/StatusBadge';
import SubNavBar from '../../components/SubNavBar';
import { getRestaurantById, MenuItem } from '../../data/mockData';
import { MerchantStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';
import { merchantNavItems } from './navItems';

type Nav = NativeStackNavigationProp<MerchantStackParamList, 'MerchantMenu'>;

interface Row extends MenuItem {
  active: boolean;
}

export default function MerchantMenuScreen() {
  const navigation = useNavigation<Nav>();
  const base = getRestaurantById('r1')!;
  const [rows, setRows] = useState<Row[]>(
    base.menu.map((m) => ({ ...m, active: true }))
  );

  const toggle = (id: string) =>
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );

  const edit = (name: string) =>
    Alert.alert('編輯商品', `Demo 模式：此處將開啟「${name}」的編輯表單。`);

  const add = () =>
    Alert.alert('新增商品', 'Demo 模式：此處將開啟新增商品表單。');

  const importPos = () =>
    Alert.alert(
      'POS 菜單匯入',
      'Demo 模式：此功能未串接正式 POS，正式版可依 POS API 文件進行串接。'
    );

  return (
    <View style={styles.container}>
      <SubNavBar
        items={merchantNavItems}
        activeKey="MerchantMenu"
        onSelect={(k) =>
          navigation.navigate(k as keyof MerchantStackParamList)
        }
      />
      <FlatList
        data={rows}
        keyExtractor={(r) => r.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.addBtn} onPress={add}>
                <Ionicons name="add-circle" size={18} color={colors.white} />
                <Text style={styles.addText}>新增商品</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.posBtn} onPress={importPos}>
                <Ionicons name="cloud-download-outline" size={18} color={colors.navy} />
                <Text style={styles.posText}>POS 菜單匯入</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.count}>共 {rows.length} 項商品</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{item.name}</Text>
                <StatusBadge
                  label={item.active ? '上架中' : '已下架'}
                  tone={item.active ? 'green' : 'gray'}
                />
              </View>
              <Text style={styles.cat}>
                {item.category}・${item.price}
              </Text>
            </View>
            <TouchableOpacity style={styles.iconBtn} onPress={() => edit(item.name)}>
              <Ionicons name="create-outline" size={20} color={colors.navy} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => toggle(item.id)}>
              <Ionicons
                name={item.active ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={item.active ? colors.danger : colors.green}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  actionRow: { flexDirection: 'row', gap: spacing.md },
  addBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.orange,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  addText: { color: colors.white, fontWeight: '800' },
  posBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.navy,
  },
  posText: { color: colors.navy, fontWeight: '800' },
  count: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  name: { fontSize: fontSize.md, fontWeight: '800', color: colors.navy },
  cat: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 4 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
});
