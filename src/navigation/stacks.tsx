import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AuthScreen from '../screens/home/AuthScreen';
import LandingScreen from '../screens/home/LandingScreen';
import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatRoomScreen from '../screens/chat/ChatRoomScreen';
import GroupOrderScreen from '../screens/chat/GroupOrderScreen';
import CartScreen from '../screens/order/CartScreen';
import MenuScreen from '../screens/order/MenuScreen';
import OrderStatusScreen from '../screens/order/OrderStatusScreen';
import RestaurantListScreen from '../screens/order/RestaurantListScreen';
import MerchantCRMScreen from '../screens/merchant/MerchantCRMScreen';
import MerchantHomeScreen from '../screens/merchant/MerchantHomeScreen';
import MerchantMenuScreen from '../screens/merchant/MerchantMenuScreen';
import MerchantOrdersScreen from '../screens/merchant/MerchantOrdersScreen';
import ApiStatusScreen from '../screens/platform/ApiStatusScreen';
import PlatformCampaignScreen from '../screens/platform/PlatformCampaignScreen';
import PlatformDashboardScreen from '../screens/platform/PlatformDashboardScreen';
import TimelineScreen from '../screens/timeline/TimelineScreen';
import { defaultStackScreenOptions } from './stackOptions';
import {
  ChatStackParamList,
  HomeStackParamList,
  MerchantStackParamList,
  OrderStackParamList,
  PlatformStackParamList,
  TimelineStackParamList,
} from './types';

const Home = createNativeStackNavigator<HomeStackParamList>();
export function HomeStack() {
  return (
    <Home.Navigator screenOptions={defaultStackScreenOptions}>
      <Home.Screen
        name="Landing"
        component={LandingScreen}
        options={{ headerShown: false }}
      />
      <Home.Screen
        name="Auth"
        component={AuthScreen}
        options={{ title: '會員登入 / 註冊' }}
      />
    </Home.Navigator>
  );
}

const Order = createNativeStackNavigator<OrderStackParamList>();
export function OrderStack() {
  return (
    <Order.Navigator screenOptions={defaultStackScreenOptions}>
      <Order.Screen
        name="RestaurantList"
        component={RestaurantListScreen}
        options={{ title: '點餐' }}
      />
      <Order.Screen name="Menu" component={MenuScreen} options={{ title: '菜單' }} />
      <Order.Screen name="Cart" component={CartScreen} options={{ title: '購物車 / 訂單確認' }} />
      <Order.Screen
        name="OrderStatus"
        component={OrderStatusScreen}
        options={{ title: '訂單狀態', headerBackVisible: false }}
      />
    </Order.Navigator>
  );
}

const Chat = createNativeStackNavigator<ChatStackParamList>();
export function ChatStack() {
  return (
    <Chat.Navigator screenOptions={defaultStackScreenOptions}>
      <Chat.Screen name="ChatList" component={ChatListScreen} options={{ title: '聊天' }} />
      <Chat.Screen name="ChatRoom" component={ChatRoomScreen} options={{ title: '聊天室' }} />
      <Chat.Screen
        name="GroupOrder"
        component={GroupOrderScreen}
        options={{ title: '團體訂餐' }}
      />
    </Chat.Navigator>
  );
}

const Merchant = createNativeStackNavigator<MerchantStackParamList>();
export function MerchantStack() {
  return (
    <Merchant.Navigator screenOptions={defaultStackScreenOptions}>
      <Merchant.Screen
        name="MerchantHome"
        component={MerchantHomeScreen}
        options={{ title: '店家後台' }}
      />
      <Merchant.Screen
        name="MerchantMenu"
        component={MerchantMenuScreen}
        options={{ title: '菜單管理' }}
      />
      <Merchant.Screen
        name="MerchantOrders"
        component={MerchantOrdersScreen}
        options={{ title: '訂單管理' }}
      />
      <Merchant.Screen
        name="MerchantCRM"
        component={MerchantCRMScreen}
        options={{ title: '客戶 CRM' }}
      />
    </Merchant.Navigator>
  );
}

const Platform = createNativeStackNavigator<PlatformStackParamList>();
export function PlatformStack() {
  return (
    <Platform.Navigator screenOptions={defaultStackScreenOptions}>
      <Platform.Screen
        name="PlatformDashboard"
        component={PlatformDashboardScreen}
        options={{ title: '平台後台' }}
      />
      <Platform.Screen
        name="PlatformCampaign"
        component={PlatformCampaignScreen}
        options={{ title: '活動模板' }}
      />
      <Platform.Screen
        name="ApiStatus"
        component={ApiStatusScreen}
        options={{ title: 'API 串接狀態' }}
      />
    </Platform.Navigator>
  );
}

const Timeline = createNativeStackNavigator<TimelineStackParamList>();
export function TimelineStack() {
  return (
    <Timeline.Navigator screenOptions={defaultStackScreenOptions}>
      <Timeline.Screen
        name="Timeline"
        component={TimelineScreen}
        options={{ title: '開發時程' }}
      />
    </Timeline.Navigator>
  );
}
