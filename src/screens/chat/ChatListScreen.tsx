import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import ChatRoomCard from '../../components/ChatRoomCard';
import DemoBanner from '../../components/DemoBanner';
import { chatRooms } from '../../data/mockData';
import { ChatStackParamList } from '../../navigation/types';
import { colors, fontSize, spacing } from '../../theme';

type Nav = NativeStackNavigationProp<ChatStackParamList, 'ChatList'>;

export default function ChatListScreen() {
  const navigation = useNavigation<Nav>();

  const sections = [
    {
      title: '群組聊天',
      data: chatRooms.filter((c) => c.type === 'group'),
    },
    {
      title: '個人聊天',
      data: chatRooms.filter((c) => c.type === 'personal'),
    },
  ];

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Text style={styles.heading}>聊天室</Text>
            <Text style={styles.sub}>群組揪團、一起點餐</Text>
            <DemoBanner text="聊天與團購為示意流程，正式版支援即時訊息、推播通知與多人協作下單。" />
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeader}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <ChatRoomCard
            room={item}
            onPress={() => navigation.navigate('ChatRoom', { roomId: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  list: { padding: spacing.lg },
  heading: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.navy },
  sub: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  sectionHeader: {
    fontSize: fontSize.md,
    fontWeight: '800',
    color: colors.navy,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
});
