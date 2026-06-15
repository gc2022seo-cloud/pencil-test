# 點餐平台暨聊天室團購系統 — Demo APP

這是一個用於向客戶展示的**前端 Demo**，以 **React Native + Expo + TypeScript** 製作。
全部資料皆為 **mock 假資料**，不串接正式金流、POS 或外送平台 API，目的是讓客戶理解正式系統完成後會具備哪些功能與操作流程。

## 技術

- React Native + Expo (SDK 51)
- TypeScript
- React Navigation（Bottom Tabs + Native Stack）
- 全部 mock data 位於 `src/data/mockData.ts`

## 啟動方式

```bash
npm install
npm run start
```

啟動後可：

- 按 `i` 開啟 iOS 模擬器、按 `a` 開啟 Android 模擬器
- 或用手機安裝 **Expo Go**，掃描終端機顯示的 QR Code
- 按 `w` 以網頁（web）方式預覽

> 型別檢查：`npm run tsc`

## 底部導覽（6 個分頁）

| 分頁 | 內容 |
| --- | --- |
| 首頁 | 系統介紹 Landing、會員登入／註冊 |
| 點餐 | 店家列表 → 菜單 → 購物車／訂單確認 → 訂單狀態 |
| 聊天 | 聊天室列表 → 對話頁（可建立團體訂餐）→ 團體訂餐頁 |
| 店家後台 | 後台首頁、菜單管理、訂單管理、客戶 CRM |
| 平台後台 | 中控台、活動模板、API 串接狀態 |
| 時程 | 四階段開發時程時間軸 |

## 專案結構

```
App.tsx                      進入點
app.json                     Expo 設定
src/
├── components/              共用元件（RestaurantCard、MenuItemCard、OrderStatusStepper、
│                            ChatRoomCard、GroupOrderCard、DashboardMetricCard、
│                            TimelineCard、StatusBadge、DemoBanner、PrimaryButton、SubNavBar）
├── context/                 CartContext（購物車狀態）
├── data/                    mockData.ts（全部假資料與型別）
├── navigation/             導覽設定（RootNavigator、stacks、types）
├── screens/                各頁面（home / order / chat / merchant / platform / timeline）
└── theme/                  色系與樣式設定（米白、橘色、深藍、淺綠）
```

## Demo 限制說明

- 本 Demo 為前端展示版本
- 尚未串接正式金流
- 尚未串接正式 POS
- 尚未串接正式外送平台
- 團體分帳、退款、優惠重算為正式版進階功能

APP 內多處皆有對應的 Demo 提示橫幅（`DemoBanner`）說明上述限制。
