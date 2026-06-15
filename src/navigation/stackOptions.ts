import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { colors, fontSize } from '../theme';

/** 共用的 native-stack 標題列樣式 */
export const defaultStackScreenOptions: NativeStackNavigationOptions = {
  headerStyle: { backgroundColor: colors.cream },
  headerShadowVisible: false,
  headerTintColor: colors.navy,
  headerTitleStyle: {
    color: colors.navy,
    fontWeight: '800',
    fontSize: fontSize.lg,
  },
  headerBackTitleVisible: false,
  contentStyle: { backgroundColor: colors.cream },
};
