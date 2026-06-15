import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DemoBanner from '../../components/DemoBanner';
import StatusBadge from '../../components/StatusBadge';
import SubNavBar from '../../components/SubNavBar';
import { ApiIntegration, apiIntegrations } from '../../data/mockData';
import { PlatformStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';
import { platformNavItems } from './navItems';

type Nav = NativeStackNavigationProp<PlatformStackParamList, 'ApiStatus'>;

const statusTone = (s: ApiIntegration['status']) =>
  s === '可串接'
    ? 'green'
    : s === '待 API 文件'
    ? 'warning'
    : s === '已規劃'
    ? 'info'
    : 'gray';

const iconOf = (name: string): keyof typeof Ionicons.glyphMap =>
  name.includes('金流')
    ? 'card-outline'
    : name.includes('POS')
    ? 'desktop-outline'
    : name.includes('外送')
    ? 'bicycle-outline'
    : 'git-network-outline';

export default function ApiStatusScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <SubNavBar
        items={platformNavItems}
        activeKey="ApiStatus"
        onSelect={(k) =>
          navigation.navigate(k as keyof PlatformStackParamList)
        }
      />
      <FlatList
        data={apiIntegrations}
        keyExtractor={(a) => a.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>API 串接狀態</Text>
            <Text style={styles.sub}>第三方系統整合規劃</Text>
            <DemoBanner text="Demo 不進行正式串接，正式版需依第三方 API 文件與合作條件開發。" />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.iconBox}>
                <Ionicons name={iconOf(item.name)} size={20} color={colors.navy} />
              </View>
              <Text style={styles.name}>{item.name}</Text>
              <StatusBadge label={item.status} tone={statusTone(item.status)} />
            </View>
            <Text style={styles.note}>{item.note}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  heading: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.navy },
  sub: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.navySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { flex: 1, fontSize: fontSize.md, fontWeight: '800', color: colors.navy },
  note: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 20,
    marginTop: spacing.md,
  },
});
