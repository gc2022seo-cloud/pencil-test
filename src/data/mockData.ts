/**
 * 全部假資料 (Mock Data)
 * 本 Demo 不串接正式後端，所有資料皆為展示用。
 */

/* ============================= 型別定義 ============================= */

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  category: '熱門餐點' | '主餐' | '飲料' | '加購商品';
}

export interface Restaurant {
  id: string;
  name: string;
  type: string;
  rating: number;
  isOpen: boolean;
  prepTime: string; // 平均出餐時間
  image: string;
  deliveryFee: number;
  serviceFeeRate: number; // 服務費比例
  menu: MenuItem[];
}

export type OrderStatusKey =
  | 'created'
  | 'pending_payment'
  | 'confirmed'
  | 'preparing'
  | 'completed';

export interface OrderLine {
  name: string;
  qty: number;
  price: number;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  isMe: boolean;
  groupOrder?: GroupOrderCardData;
}

export interface GroupOrderCardData {
  id: string;
  restaurantName: string;
  deadline: string;
  participants: number;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'group' | 'personal';
  lastMessage: string;
  lastTime: string;
  avatarColor: string;
  messages: ChatMessage[];
}

export interface GroupMember {
  id: string;
  name: string;
  item: string;
  amount: number;
  paid: boolean;
}

export interface GroupOrder {
  id: string;
  title: string;
  host: string;
  restaurantName: string;
  deadline: string;
  members: GroupMember[];
}

export interface MerchantOrder {
  id: string;
  customer: string;
  items: OrderLine[];
  total: number;
  status: '新訂單' | '準備中' | '已完成' | '已取消';
  time: string;
}

export interface Customer {
  id: string;
  name: string;
  visits: number;
  lastVisit: string;
  tags: string[];
}

export interface Campaign {
  id: string;
  title: string;
  type: '滿額折扣' | '指定商品優惠' | '團購優惠' | '平台全站活動';
  status: '草稿' | '審核中' | '進行中' | '已結束';
  period: string;
}

export interface ApiIntegration {
  id: string;
  name: string;
  status: '已規劃' | '待 API 文件' | '可串接' | '未啟用';
  note: string;
}

/* ============================= 圖片資源 ============================= */

const img = {
  ramen:
    'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=70',
  burger:
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=70',
  sushi:
    'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=70',
  salad:
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=70',
  bubble:
    'https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=600&q=70',
  coffee:
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=70',
  friedChicken:
    'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=70',
  pizza:
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=70',
  dessert:
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=70',
  storefront:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=70',
  noodle:
    'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=70',
  fries:
    'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=70',
};

/* ============================= 店家 / 菜單 ============================= */

export const restaurants: Restaurant[] = [
  {
    id: 'r1',
    name: '一蘭風味拉麵屋',
    type: '日式拉麵',
    rating: 4.8,
    isOpen: true,
    prepTime: '20-30 分鐘',
    image: img.ramen,
    deliveryFee: 39,
    serviceFeeRate: 0.05,
    menu: [
      {
        id: 'r1m1',
        name: '招牌豚骨拉麵',
        desc: '濃郁豚骨湯頭，搭配溏心蛋與叉燒',
        price: 220,
        image: img.ramen,
        category: '熱門餐點',
      },
      {
        id: 'r1m2',
        name: '辣味噌拉麵',
        desc: '微辣味噌湯底，暖胃首選',
        price: 240,
        image: img.noodle,
        category: '主餐',
      },
      {
        id: 'r1m3',
        name: '日式炸雞塊',
        desc: '外酥內嫩，附特製胡椒鹽',
        price: 90,
        image: img.friedChicken,
        category: '加購商品',
      },
      {
        id: 'r1m4',
        name: '冰綠茶',
        desc: '無糖冷泡綠茶',
        price: 40,
        image: img.coffee,
        category: '飲料',
      },
    ],
  },
  {
    id: 'r2',
    name: 'Big Bite 美式漢堡',
    type: '美式速食',
    rating: 4.6,
    isOpen: true,
    prepTime: '15-25 分鐘',
    image: img.burger,
    deliveryFee: 49,
    serviceFeeRate: 0.05,
    menu: [
      {
        id: 'r2m1',
        name: '經典牛肉起司堡',
        desc: '100% 純牛肉排，雙層起司',
        price: 180,
        image: img.burger,
        category: '熱門餐點',
      },
      {
        id: 'r2m2',
        name: '香烤雞腿堡',
        desc: '嫩煎雞腿排佐蜂蜜芥末',
        price: 160,
        image: img.burger,
        category: '主餐',
      },
      {
        id: 'r2m3',
        name: '黃金薯條',
        desc: '現炸酥脆薯條（大份）',
        price: 70,
        image: img.fries,
        category: '加購商品',
      },
      {
        id: 'r2m4',
        name: '可口可樂',
        desc: '冰涼暢快（中杯）',
        price: 45,
        image: img.coffee,
        category: '飲料',
      },
    ],
  },
  {
    id: 'r3',
    name: '築地新鮮壽司',
    type: '日式壽司',
    rating: 4.9,
    isOpen: false,
    prepTime: '25-35 分鐘',
    image: img.sushi,
    deliveryFee: 59,
    serviceFeeRate: 0.06,
    menu: [
      {
        id: 'r3m1',
        name: '綜合握壽司 10 貫',
        desc: '主廚每日精選海鮮',
        price: 320,
        image: img.sushi,
        category: '熱門餐點',
      },
      {
        id: 'r3m2',
        name: '鮭魚親子丼',
        desc: '生鮭魚搭配鮭魚卵',
        price: 280,
        image: img.sushi,
        category: '主餐',
      },
      {
        id: 'r3m3',
        name: '味噌湯',
        desc: '附豆腐與海帶芽',
        price: 30,
        image: img.noodle,
        category: '加購商品',
      },
      {
        id: 'r3m4',
        name: '玄米茶',
        desc: '溫熱玄米茶',
        price: 35,
        image: img.coffee,
        category: '飲料',
      },
    ],
  },
  {
    id: 'r4',
    name: '青蔬輕食沙拉吧',
    type: '健康輕食',
    rating: 4.5,
    isOpen: true,
    prepTime: '10-20 分鐘',
    image: img.salad,
    deliveryFee: 35,
    serviceFeeRate: 0.04,
    menu: [
      {
        id: 'r4m1',
        name: '凱薩雞肉沙拉',
        desc: '烤雞胸、帕瑪森起司、凱薩醬',
        price: 160,
        image: img.salad,
        category: '熱門餐點',
      },
      {
        id: 'r4m2',
        name: '藜麥牛肉碗',
        desc: '高蛋白藜麥碗，附時蔬',
        price: 190,
        image: img.salad,
        category: '主餐',
      },
      {
        id: 'r4m3',
        name: '酪梨醬',
        desc: '新鮮酪梨手工製作',
        price: 50,
        image: img.salad,
        category: '加購商品',
      },
      {
        id: 'r4m4',
        name: '冷壓蔬果汁',
        desc: '每日現打，無添加糖',
        price: 90,
        image: img.bubble,
        category: '飲料',
      },
    ],
  },
  {
    id: 'r5',
    name: '幸福手搖飲',
    type: '手搖飲料',
    rating: 4.7,
    isOpen: true,
    prepTime: '10-15 分鐘',
    image: img.bubble,
    deliveryFee: 30,
    serviceFeeRate: 0.03,
    menu: [
      {
        id: 'r5m1',
        name: '黑糖珍珠鮮奶',
        desc: '招牌黑糖搭配 Q 彈珍珠',
        price: 65,
        image: img.bubble,
        category: '熱門餐點',
      },
      {
        id: 'r5m2',
        name: '四季春青茶',
        desc: '清香回甘',
        price: 35,
        image: img.coffee,
        category: '飲料',
      },
      {
        id: 'r5m3',
        name: '加椰果',
        desc: '增加口感層次',
        price: 10,
        image: img.bubble,
        category: '加購商品',
      },
      {
        id: 'r5m4',
        name: '芋頭鮮奶',
        desc: '真芋頭熬煮',
        price: 70,
        image: img.bubble,
        category: '主餐',
      },
    ],
  },
  {
    id: 'r6',
    name: 'Mama Mia 窯烤披薩',
    type: '義式料理',
    rating: 4.4,
    isOpen: true,
    prepTime: '20-30 分鐘',
    image: img.pizza,
    deliveryFee: 55,
    serviceFeeRate: 0.05,
    menu: [
      {
        id: 'r6m1',
        name: '瑪格麗特披薩',
        desc: '經典番茄、莫札瑞拉、羅勒',
        price: 280,
        image: img.pizza,
        category: '熱門餐點',
      },
      {
        id: 'r6m2',
        name: '夏威夷披薩',
        desc: '火腿與鳳梨的甜鹹滋味',
        price: 300,
        image: img.pizza,
        category: '主餐',
      },
      {
        id: 'r6m3',
        name: '蒜香麵包',
        desc: '現烤香蒜麵包（4 片）',
        price: 80,
        image: img.dessert,
        category: '加購商品',
      },
      {
        id: 'r6m4',
        name: '義式氣泡水',
        desc: '清爽解膩',
        price: 50,
        image: img.coffee,
        category: '飲料',
      },
    ],
  },
];

export const getRestaurantById = (id: string) =>
  restaurants.find((r) => r.id === id);

export const menuCategories: MenuItem['category'][] = [
  '熱門餐點',
  '主餐',
  '飲料',
  '加購商品',
];

/* ============================= 訂單狀態流程 ============================= */

export const orderStatusSteps: { key: OrderStatusKey; label: string }[] = [
  { key: 'created', label: '訂單建立' },
  { key: 'pending_payment', label: '等待付款' },
  { key: 'confirmed', label: '店家確認' },
  { key: 'preparing', label: '餐點準備中' },
  { key: 'completed', label: '訂單完成' },
];

export const sampleOrder = {
  id: 'ORD-20260615-008',
  restaurantName: '一蘭風味拉麵屋',
  currentStatus: 'preparing' as OrderStatusKey,
  lines: [
    { name: '招牌豚骨拉麵', qty: 2, price: 220 },
    { name: '日式炸雞塊', qty: 1, price: 90 },
    { name: '冰綠茶', qty: 2, price: 40 },
  ] as OrderLine[],
  deliveryFee: 39,
  serviceFee: 30,
  paymentMethod: '發起人統一付款',
};

/* ============================= 聊天室 ============================= */

export const chatRooms: ChatRoom[] = [
  {
    id: 'c1',
    name: '午餐團購群',
    type: 'group',
    lastMessage: '今天訂拉麵，截止 11:30！',
    lastTime: '11:02',
    avatarColor: '#FF7A1A',
    messages: [
      {
        id: 'm1',
        sender: '小美',
        text: '大家今天午餐想吃什麼？',
        time: '10:45',
        isMe: false,
      },
      {
        id: 'm2',
        sender: '我',
        text: '拉麵好不好？最近想喝湯',
        time: '10:47',
        isMe: true,
      },
      {
        id: 'm3',
        sender: '阿哲',
        text: '我贊成！一蘭那間不錯',
        time: '10:50',
        isMe: false,
      },
      {
        id: 'm4',
        sender: '小美',
        text: '今天訂拉麵，截止 11:30！',
        time: '11:02',
        isMe: false,
        groupOrder: {
          id: 'g1',
          restaurantName: '一蘭風味拉麵屋',
          deadline: '今天 11:30',
          participants: 4,
        },
      },
    ],
  },
  {
    id: 'c2',
    name: '公司下午茶群',
    type: 'group',
    lastMessage: '下午茶來點手搖飲吧～',
    lastTime: '14:20',
    avatarColor: '#163A5F',
    messages: [
      {
        id: 'm1',
        sender: 'Jenny',
        text: '下午有點睏，要不要訂飲料？',
        time: '14:10',
        isMe: false,
      },
      {
        id: 'm2',
        sender: '我',
        text: '好啊，我要黑糖珍奶',
        time: '14:15',
        isMe: true,
      },
      {
        id: 'm3',
        sender: 'Jenny',
        text: '下午茶來點手搖飲吧～',
        time: '14:20',
        isMe: false,
        groupOrder: {
          id: 'g2',
          restaurantName: '幸福手搖飲',
          deadline: '今天 15:00',
          participants: 6,
        },
      },
    ],
  },
  {
    id: 'c3',
    name: '朋友聚餐群',
    type: 'group',
    lastMessage: '週末一起吃披薩！',
    lastTime: '昨天',
    avatarColor: '#7FC8A9',
    messages: [
      {
        id: 'm1',
        sender: '阿傑',
        text: '週末要不要聚一下？',
        time: '昨天 20:00',
        isMe: false,
      },
      {
        id: 'm2',
        sender: '我',
        text: '好耶，吃披薩如何',
        time: '昨天 20:05',
        isMe: true,
      },
      {
        id: 'm3',
        sender: '阿傑',
        text: '週末一起吃披薩！',
        time: '昨天 20:10',
        isMe: false,
      },
    ],
  },
  {
    id: 'c4',
    name: '王小明',
    type: 'personal',
    lastMessage: '謝謝你昨天幫我代訂！',
    lastTime: '昨天',
    avatarColor: '#4A90D9',
    messages: [
      {
        id: 'm1',
        sender: '王小明',
        text: '謝謝你昨天幫我代訂！',
        time: '昨天 18:30',
        isMe: false,
      },
      {
        id: 'm2',
        sender: '我',
        text: '不會啦，下次換你揪～',
        time: '昨天 18:32',
        isMe: true,
      },
    ],
  },
];

export const getChatRoomById = (id: string) =>
  chatRooms.find((c) => c.id === id);

/* ============================= 團體訂餐 ============================= */

export const groupOrders: GroupOrder[] = [
  {
    id: 'g1',
    title: '午餐團購',
    host: '小美',
    restaurantName: '一蘭風味拉麵屋',
    deadline: '今天 11:30',
    members: [
      {
        id: 'gm1',
        name: '小美（發起人）',
        item: '招牌豚骨拉麵',
        amount: 220,
        paid: true,
      },
      { id: 'gm2', name: '我', item: '辣味噌拉麵 + 冰綠茶', amount: 280, paid: true },
      { id: 'gm3', name: '阿哲', item: '招牌豚骨拉麵', amount: 220, paid: false },
      { id: 'gm4', name: '怡君', item: '日式炸雞塊 + 冰綠茶', amount: 130, paid: false },
    ],
  },
  {
    id: 'g2',
    title: '下午茶團購',
    host: 'Jenny',
    restaurantName: '幸福手搖飲',
    deadline: '今天 15:00',
    members: [
      { id: 'gm1', name: 'Jenny（發起人）', item: '四季春青茶', amount: 35, paid: true },
      { id: 'gm2', name: '我', item: '黑糖珍珠鮮奶', amount: 65, paid: true },
      { id: 'gm3', name: 'David', item: '芋頭鮮奶', amount: 70, paid: true },
      { id: 'gm4', name: 'Amy', item: '四季春青茶 + 椰果', amount: 45, paid: false },
      { id: 'gm5', name: 'Ken', item: '黑糖珍珠鮮奶', amount: 65, paid: false },
      { id: 'gm6', name: 'Lisa', item: '芋頭鮮奶', amount: 70, paid: true },
    ],
  },
];

export const getGroupOrderById = (id: string) =>
  groupOrders.find((g) => g.id === id);

/* ============================= 店家後台 ============================= */

export const merchantProfile = {
  name: '一蘭風味拉麵屋',
  todayOrders: 47,
  todayRevenue: 18560,
  pendingOrders: 5,
  popularItems: [
    { name: '招牌豚骨拉麵', count: 28 },
    { name: '辣味噌拉麵', count: 19 },
    { name: '日式炸雞塊', count: 16 },
  ],
};

export const merchantOrders: MerchantOrder[] = [
  {
    id: 'ORD-1042',
    customer: '陳先生',
    items: [
      { name: '招牌豚骨拉麵', qty: 2, price: 220 },
      { name: '冰綠茶', qty: 1, price: 40 },
    ],
    total: 480,
    status: '新訂單',
    time: '11:32',
  },
  {
    id: 'ORD-1041',
    customer: '午餐團購群（4 人）',
    items: [
      { name: '招牌豚骨拉麵', qty: 2, price: 220 },
      { name: '辣味噌拉麵', qty: 1, price: 240 },
      { name: '日式炸雞塊', qty: 1, price: 90 },
    ],
    total: 770,
    status: '準備中',
    time: '11:18',
  },
  {
    id: 'ORD-1040',
    customer: '林小姐',
    items: [{ name: '辣味噌拉麵', qty: 1, price: 240 }],
    total: 240,
    status: '準備中',
    time: '11:05',
  },
  {
    id: 'ORD-1039',
    customer: '黃先生',
    items: [
      { name: '招牌豚骨拉麵', qty: 1, price: 220 },
      { name: '日式炸雞塊', qty: 2, price: 90 },
    ],
    total: 400,
    status: '已完成',
    time: '10:40',
  },
  {
    id: 'ORD-1038',
    customer: '吳同學',
    items: [{ name: '冰綠茶', qty: 3, price: 40 }],
    total: 120,
    status: '已取消',
    time: '10:22',
  },
];

export const customers: Customer[] = [
  {
    id: 'cu1',
    name: '陳大文',
    visits: 32,
    lastVisit: '2026-06-15',
    tags: ['常客', '喜歡團購'],
  },
  {
    id: 'cu2',
    name: '林雅婷',
    visits: 18,
    lastVisit: '2026-06-14',
    tags: ['高消費'],
  },
  {
    id: 'cu3',
    name: '王建國',
    visits: 24,
    lastVisit: '2026-06-13',
    tags: ['常客', '高消費'],
  },
  {
    id: 'cu4',
    name: '張怡君',
    visits: 9,
    lastVisit: '2026-06-10',
    tags: ['喜歡團購'],
  },
  {
    id: 'cu5',
    name: '李俊賢',
    visits: 5,
    lastVisit: '2026-06-05',
    tags: ['新客'],
  },
];

/* ============================= 平台總後台 ============================= */

export const platformOverview = {
  members: 12480,
  merchants: 326,
  todayOrders: 1843,
  todayAmount: 642300,
};

export const platformModules = [
  { id: 'pm1', name: '會員管理', icon: 'people-outline' },
  { id: 'pm2', name: '店家管理', icon: 'storefront-outline' },
  { id: 'pm3', name: '訂單管理', icon: 'receipt-outline' },
  { id: 'pm4', name: '金流紀錄', icon: 'card-outline' },
  { id: 'pm5', name: '活動審核', icon: 'megaphone-outline' },
  { id: 'pm6', name: 'API 管理', icon: 'git-network-outline' },
];

export const campaigns: Campaign[] = [
  {
    id: 'cp1',
    title: '滿 500 折 50',
    type: '滿額折扣',
    status: '進行中',
    period: '2026/06/01 - 2026/06/30',
  },
  {
    id: 'cp2',
    title: '招牌拉麵第二件 8 折',
    type: '指定商品優惠',
    status: '審核中',
    period: '2026/06/20 - 2026/07/05',
  },
  {
    id: 'cp3',
    title: '揪團滿 4 人免運',
    type: '團購優惠',
    status: '進行中',
    period: '2026/06/10 - 2026/07/10',
  },
  {
    id: 'cp4',
    title: '夏日全站 88 折',
    type: '平台全站活動',
    status: '草稿',
    period: '2026/07/01 - 2026/07/31',
  },
  {
    id: 'cp5',
    title: '母親節指定甜點優惠',
    type: '指定商品優惠',
    status: '已結束',
    period: '2026/05/01 - 2026/05/12',
  },
];

export const campaignTypes: Campaign['type'][] = [
  '滿額折扣',
  '指定商品優惠',
  '團購優惠',
  '平台全站活動',
];

export const apiIntegrations: ApiIntegration[] = [
  {
    id: 'api1',
    name: '金流 API',
    status: '待 API 文件',
    note: 'Demo 不進行正式串接，正式版需依第三方金流文件與合作條件開發。',
  },
  {
    id: 'api2',
    name: 'POS API',
    status: '可串接',
    note: '已確認可行性，正式版依 POS 廠商 API 文件進行菜單與訂單同步。',
  },
  {
    id: 'api3',
    name: '外送平台 API',
    status: '已規劃',
    note: '本系統不含自建派送，外送由第三方平台串接。',
  },
  {
    id: 'api4',
    name: '派單系統 API',
    status: '未啟用',
    note: '正式版視營運需求評估是否啟用派單系統整合。',
  },
];

/* ============================= 開發時程 ============================= */

export interface TimelinePhase {
  phase: string;
  title: string;
  duration: string;
  items: string[];
}

export const timelinePhases: TimelinePhase[] = [
  {
    phase: '第一階段',
    title: '需求彙整與系統規劃',
    duration: '預估 2–3 週',
    items: ['需求訪談', '流程確認', '功能規格書', 'API 可行性確認'],
  },
  {
    phase: '第二階段',
    title: 'UI / UX 與基礎系統製作',
    duration: '預估 8–12 週',
    items: ['會員 APP', '點餐流程', '店家後台', '平台後台基礎功能'],
  },
  {
    phase: '第三階段',
    title: '聊天室、團購、CRM、API 串接',
    duration: '預估 8–12 週',
    items: ['聊天室', '群組訂餐', '活動模板', 'CRM', '金流與 POS 串接規劃'],
  },
  {
    phase: '第四階段',
    title: '測試、修正與上線',
    duration: '預估 3–5 週',
    items: ['功能測試', '付款流程測試', 'API 測試', 'Bug 修正', '教育訓練與部署'],
  },
];

export const timelineSummary = {
  mvp: '約 4–6 個月',
  full: '約 6–9 個月',
};
