import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import { colors, fontSize } from '../theme';
import {
  ChatStack,
  HomeStack,
  MerchantStack,
  OrderStack,
  PlatformStack,
  TimelineStack,
} from './stacks';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const icons: Record<
  keyof RootTabParamList,
  { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }
> = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  OrderTab: { active: 'restaurant', inactive: 'restaurant-outline' },
  ChatTab: { active: 'chatbubbles', inactive: 'chatbubbles-outline' },
  MerchantTab: { active: 'storefront', inactive: 'storefront-outline' },
  PlatformTab: { active: 'grid', inactive: 'grid-outline' },
  TimelineTab: { active: 'time', inactive: 'time-outline' },
};

export default function RootNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.orange,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: '700' },
        tabBarIcon: ({ focused, color, size }) => {
          const set = icons[route.name as keyof RootTabParamList];
          return (
            <Ionicons
              name={focused ? set.active : set.inactive}
              size={size - 2}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: '首頁' }} />
      <Tab.Screen name="OrderTab" component={OrderStack} options={{ title: '點餐' }} />
      <Tab.Screen name="ChatTab" component={ChatStack} options={{ title: '聊天' }} />
      <Tab.Screen
        name="MerchantTab"
        component={MerchantStack}
        options={{ title: '店家後台' }}
      />
      <Tab.Screen
        name="PlatformTab"
        component={PlatformStack}
        options={{ title: '平台後台' }}
      />
      <Tab.Screen
        name="TimelineTab"
        component={TimelineStack}
        options={{ title: '時程' }}
      />
    </Tab.Navigator>
  );
}
