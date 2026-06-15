import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DemoBanner from '../../components/DemoBanner';
import PrimaryButton from '../../components/PrimaryButton';
import { HomeStackParamList, RootTabParamList } from '../../navigation/types';
import { colors, fontSize, radius, spacing } from '../../theme';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Landing'>;

const highlights = [
  { icon: 'fast-food-outline', title: '線上點餐', desc: '瀏覽店家、加入購物車、送出訂單' },
  { icon: 'chatbubbles-outline', title: '聊天室團購', desc: '群組揪團、一起下單、分帳示意' },
  { icon: 'storefront-outline', title: '店家後台', desc: '訂單、菜單、CRM 客戶管理' },
  { icon: 'grid-outline', title: '平台中控台', desc: '會員、店家、金流、活動審核' },
];

export default function LandingScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  const goOrder = () => {
    navigation
      .getParent<NativeStackNavigationProp<RootTabParamList>>()
      ?.navigate('OrderTab', { screen: 'RestaurantList' });
  };
  const goChat = () => {
    navigation
      .getParent<NativeStackNavigationProp<RootTabParamList>>()
      ?.navigate('ChatTab', { screen: 'ChatList' });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + spacing.lg },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.logoBadge}>
          <Ionicons name="restaurant" size={26} color={colors.white} />
        </View>
        <Text style={styles.brandSmall}>整合式餐飲解決方案</Text>
        <Text style={styles.title}>點餐平台暨{'\n'}聊天室團購系統</Text>
        <Text style={styles.subtitle}>
          結合線上點餐、群組團購、店家後台與平台中控台的一站式 Demo。
        </Text>

        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Ionicons name="close-circle" size={14} color={colors.navy} />
            <Text style={styles.tagText}>不含自建派送功能</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="rocket-outline" size={14} color={colors.navy} />
            <Text style={styles.tagText}>MVP 約 4–6 個月</Text>
          </View>
        </View>
      </View>

      <View style={styles.ctaWrap}>
        <PrimaryButton title="開始點餐" icon="cart-outline" onPress={goOrder} />
        <View style={{ height: spacing.md }} />
        <PrimaryButton
          title="查看聊天室團購"
          icon="chatbubbles-outline"
          variant="outline"
          onPress={goChat}
        />
      </View>

      <Text style={styles.sectionTitle}>系統重點功能</Text>
      <View style={styles.grid}>
        {highlights.map((h) => (
          <View key={h.title} style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Ionicons
                name={h.icon as keyof typeof Ionicons.glyphMap}
                size={22}
                color={colors.orange}
              />
            </View>
            <Text style={styles.featureTitle}>{h.title}</Text>
            <Text style={styles.featureDesc}>{h.desc}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Auth')}
      >
        <Ionicons name="log-in-outline" size={18} color={colors.navy} />
        <Text style={styles.loginText}>會員登入 / 註冊（使用假資料）</Text>
      </TouchableOpacity>

      <DemoBanner text="本 Demo 為前端展示版本，所有資料皆為模擬，協助理解正式系統完成後的功能樣貌。" />
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xl },
  hero: {
    backgroundColor: colors.navy,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brandSmall: {
    color: colors.green,
    fontSize: fontSize.sm,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    color: colors.white,
    fontSize: fontSize.title,
    fontWeight: '900',
    marginTop: spacing.sm,
    lineHeight: 42,
  },
  subtitle: {
    color: '#C9D7E5',
    fontSize: fontSize.md,
    marginTop: spacing.md,
    lineHeight: 22,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.cream,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  tagText: { color: colors.navy, fontWeight: '700', fontSize: fontSize.sm },
  ctaWrap: { marginBottom: spacing.xl },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48.5%',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.orangeSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  featureTitle: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.navy,
  },
  featureDesc: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 16,
  },
  loginLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  loginText: { color: colors.navy, fontWeight: '700', fontSize: fontSize.md },
});
