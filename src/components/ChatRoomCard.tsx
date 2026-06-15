import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChatRoom } from '../data/mockData';
import { colors, fontSize, radius, spacing } from '../theme';

interface Props {
  room: ChatRoom;
  onPress: () => void;
}

/** 聊天室列表卡片 */
export default function ChatRoomCard({ room, onPress }: Props) {
  const isGroup = room.type === 'group';
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.row}>
      <View style={[styles.avatar, { backgroundColor: room.avatarColor }]}>
        <Ionicons
          name={isGroup ? 'people' : 'person'}
          size={22}
          color={colors.white}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {room.name}
          </Text>
          <Text style={styles.time}>{room.lastTime}</Text>
        </View>
        <Text style={styles.message} numberOfLines={1}>
          {room.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    marginLeft: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.navy,
  },
  time: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginLeft: spacing.sm,
  },
  message: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: 3,
  },
});
