/**
 * 全域主題設定
 * 色系：米白、橘色、深藍、淺綠（商務提案簡報風格）
 */

export const colors = {
  // 主色
  cream: '#FAF7F0', // 米白（背景）
  creamDark: '#F1EBDD', // 米白較深（卡片分隔）
  orange: '#FF7A1A', // 橘色（主要 CTA / 強調）
  orangeSoft: '#FFE7D3', // 橘色淺底
  navy: '#163A5F', // 深藍（標題 / 重點文字）
  navySoft: '#E2EBF3', // 深藍淺底
  green: '#7FC8A9', // 淺綠（成功 / 營業中）
  greenSoft: '#E1F3EA', // 淺綠淺底

  // 中性色
  white: '#FFFFFF',
  text: '#1F2933',
  textMuted: '#6B7280',
  textLight: '#9AA5B1',
  border: '#E8E2D6',
  shadow: '#000000',

  // 狀態色
  warning: '#E8A93B',
  warningSoft: '#FBEFD6',
  danger: '#E05D5D',
  dangerSoft: '#FBE0E0',
  info: '#4A90D9',
  infoSoft: '#E0ECF8',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const fontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 18,
  xl: 22,
  xxl: 28,
  title: 34,
};

export const shadow = {
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  soft: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
};

export const theme = { colors, spacing, radius, fontSize, shadow };
export default theme;
