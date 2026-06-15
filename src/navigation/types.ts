import { NavigatorScreenParams } from '@react-navigation/native';

export type OrderStackParamList = {
  RestaurantList: undefined;
  Menu: { restaurantId: string };
  Cart: undefined;
  OrderStatus: { fromCheckout?: boolean } | undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  ChatRoom: { roomId: string };
  GroupOrder: { groupId: string };
};

export type HomeStackParamList = {
  Landing: undefined;
  Auth: undefined;
};

export type MerchantStackParamList = {
  MerchantHome: undefined;
  MerchantMenu: undefined;
  MerchantOrders: undefined;
  MerchantCRM: undefined;
};

export type PlatformStackParamList = {
  PlatformDashboard: undefined;
  PlatformCampaign: undefined;
  ApiStatus: undefined;
};

export type TimelineStackParamList = {
  Timeline: undefined;
};

export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  OrderTab: NavigatorScreenParams<OrderStackParamList>;
  ChatTab: NavigatorScreenParams<ChatStackParamList>;
  MerchantTab: NavigatorScreenParams<MerchantStackParamList>;
  PlatformTab: NavigatorScreenParams<PlatformStackParamList>;
  TimelineTab: NavigatorScreenParams<TimelineStackParamList>;
};
