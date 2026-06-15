import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DemoBanner from '../../components/DemoBanner';
import StatusBadge from '../../components/StatusBadge';
import SubNavBar from '../../components/SubNavBar';
import { customers } from '../../data/mockData';
import { MerchantStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';
import { merchantNavItems } from './navItems';

type Nav = NativeStackNavigationProp<MerchantStackParamList, 'MerchantCRM'>;

const tagTone = (tag: string) =>
  tag === '高消費'
    ? 'orange'
    : tag === '常客'
    ? 'green'
    : tag === '喜歡團購'
    ? 'info'
    : 'gray';

export default function MerchantCRMScreen() {
  const navigation = useNavigation<Nav>();

  const sendCampaign = (name: string) =>
    Alert.alert(
      '活動發送',
      `Demo 模式：將向「${name}」發送行銷活動通知。正式版可串接簡訊／推播／LINE。`
    );

  return (
    <View style={styles.container}>
      <SubNavBar
        items={merchantNavItems}
        activeKey="MerchantCRM"
        onSelect={(k) =>
          navigation.navigate(k as keyof MerchantStackParamList)
        }
      />
      <FlatList
        data={customers}
        keyExtractor={(c) => c.id}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>顧客關係管理</Text>
            <Text style={styles.sub}>共 {customers.length} 位顧客</Text>
            <DemoBanner text="顧客資料為假資料，正式版將依消費紀錄自動分眾並建立會員標籤。" />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.meta}>
                  消費 {item.visits} 次・最近 {item.lastVisit}
                </Text>
              </View>
            </View>
            <View style={styles.tagRow}>
              {item.tags.map((t) => (
                <StatusBadge key={t} label={t} tone={tagTone(t) as any} />
              ))}
            </View>
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={() => sendCampaign(item.name)}
            >
              <Ionicons name="megaphone-outline" size={16} color={colors.orange} />
              <Text style={styles.sendText}>發送活動</Text>
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
  heading: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.navy },
  sub: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  card: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.soft,
  },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.navySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: { fontWeight: '800', color: colors.navy, fontSize: fontSize.lg },
  name: { fontSize: fontSize.md, fontWeight: '800', color: colors.navy },
  meta: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  sendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.orangeSoft,
  },
  sendText: { color: colors.orange, fontWeight: '800', fontSize: fontSize.sm },
});
