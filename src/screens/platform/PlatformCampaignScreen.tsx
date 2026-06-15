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
import {
  Campaign,
  campaigns as seedCampaigns,
  campaignTypes,
} from '../../data/mockData';
import { PlatformStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';
import { platformNavItems } from './navItems';

type Nav = NativeStackNavigationProp<PlatformStackParamList, 'PlatformCampaign'>;

const statusTone = (s: Campaign['status']) =>
  s === '進行中'
    ? 'green'
    : s === '審核中'
    ? 'warning'
    : s === '草稿'
    ? 'gray'
    : 'navy';

export default function PlatformCampaignScreen() {
  const navigation = useNavigation<Nav>();
  const [list, setList] = useState<Campaign[]>(seedCampaigns);

  const addCampaign = (type: Campaign['type']) => {
    const newItem: Campaign = {
      id: `cp-${Date.now()}`,
      title: `新${type}活動`,
      type,
      status: '草稿',
      period: '待設定',
    };
    setList((prev) => [newItem, ...prev]);
    Alert.alert('新增活動', `Demo 模式：已建立一筆「${type}」草稿活動。`);
  };

  return (
    <View style={styles.container}>
      <SubNavBar
        items={platformNavItems}
        activeKey="PlatformCampaign"
        onSelect={(k) =>
          navigation.navigate(k as keyof PlatformStackParamList)
        }
      />
      <FlatList
        data={list}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>活動模板</Text>
            <Text style={styles.sub}>點選活動類型可新增一筆草稿</Text>
            <View style={styles.typeRow}>
              {campaignTypes.map((t) => (
                <TouchableOpacity
                  key={t}
                  style={styles.typeChip}
                  onPress={() => addCampaign(t)}
                >
                  <Ionicons name="add" size={14} color={colors.orange} />
                  <Text style={styles.typeText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.listTitle}>活動列表</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.type}>{item.type}</Text>
              <Text style={styles.period}>{item.period}</Text>
            </View>
            <StatusBadge label={item.status} tone={statusTone(item.status)} />
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
  typeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  typeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.orangeSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  typeText: { color: colors.orange, fontWeight: '800', fontSize: fontSize.sm },
  listTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  title: { fontSize: fontSize.md, fontWeight: '800', color: colors.navy },
  type: { fontSize: fontSize.sm, color: colors.orange, marginTop: 2, fontWeight: '600' },
  period: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 4 },
});
