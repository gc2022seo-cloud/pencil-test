import { Ionicons } from '@expo/vector-icons';
import {
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import GroupOrderCard from '../../components/GroupOrderCard';
import {
  ChatMessage,
  getChatRoomById,
} from '../../data/mockData';
import { ChatStackParamList } from '../../navigation/types';
import { colors, fontSize, radius, spacing } from '../../theme';

type Nav = NativeStackNavigationProp<ChatStackParamList, 'ChatRoom'>;
type Rt = RouteProp<ChatStackParamList, 'ChatRoom'>;

export default function ChatRoomScreen() {
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<Rt>();
  const room = getChatRoomById(params.roomId);
  const [messages, setMessages] = useState<ChatMessage[]>(
    room?.messages ?? []
  );
  const [text, setText] = useState('');
  const listRef = useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    navigation.setOptions({ title: room?.name ?? '聊天室' });
  }, [navigation, room?.name]);

  const send = () => {
    if (!text.trim()) return;
    const msg: ChatMessage = {
      id: `me-${Date.now()}`,
      sender: '我',
      text: text.trim(),
      time: '現在',
      isMe: true,
    };
    setMessages((prev) => [...prev, msg]);
    setText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const createGroupOrder = () => {
    const msg: ChatMessage = {
      id: `go-${Date.now()}`,
      sender: '我',
      text: '我發起了一個團體訂餐，大家一起點餐吧！',
      time: '現在',
      isMe: true,
      groupOrder: {
        id: 'g1',
        restaurantName: '一蘭風味拉麵屋',
        deadline: '今天 11:30',
        participants: 4,
      },
    };
    setMessages((prev) => [...prev, msg]);
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const renderItem = ({ item }: { item: ChatMessage }) => (
    <View>
      <View
        style={[
          styles.bubbleRow,
          item.isMe ? styles.bubbleRowMe : styles.bubbleRowOther,
        ]}
      >
        <View style={{ maxWidth: '78%' }}>
          {!item.isMe && <Text style={styles.sender}>{item.sender}</Text>}
          <View
            style={[
              styles.bubble,
              item.isMe ? styles.bubbleMe : styles.bubbleOther,
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                item.isMe && styles.bubbleTextMe,
              ]}
            >
              {item.text}
            </Text>
          </View>
          <Text
            style={[styles.time, item.isMe ? styles.timeMe : styles.timeOther]}
          >
            {item.time}
          </Text>
        </View>
      </View>
      {item.groupOrder && (
        <View
          style={[
            styles.cardWrap,
            item.isMe ? styles.cardWrapMe : styles.cardWrapOther,
          ]}
        >
          <GroupOrderCard
            data={item.groupOrder}
            onPress={() =>
              navigation.navigate('GroupOrder', {
                groupId: item.groupOrder!.id,
              })
            }
          />
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        onContentSizeChange={() =>
          listRef.current?.scrollToEnd({ animated: false })
        }
      />

      <View style={styles.composer}>
        <TouchableOpacity style={styles.groupBtn} onPress={createGroupOrder}>
          <Ionicons name="restaurant" size={20} color={colors.white} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="輸入訊息…"
          placeholderTextColor={colors.textLight}
          value={text}
          onChangeText={setText}
          onSubmitEditing={send}
          returnKeyType="send"
        />
        <TouchableOpacity style={styles.sendBtn} onPress={send}>
          <Ionicons name="send" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.hintBar}>
        <Ionicons name="restaurant" size={12} color={colors.orange} />
        <Text style={styles.hintText}>點左側按鈕可「建立團體訂餐」</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  list: { padding: spacing.lg },
  bubbleRow: { marginBottom: spacing.xs },
  bubbleRowMe: { alignItems: 'flex-end' },
  bubbleRowOther: { alignItems: 'flex-start' },
  sender: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginBottom: 2,
    marginLeft: spacing.sm,
  },
  bubble: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
  },
  bubbleMe: {
    backgroundColor: colors.orange,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
  },
  bubbleText: { fontSize: fontSize.md, color: colors.text, lineHeight: 20 },
  bubbleTextMe: { color: colors.white },
  time: { fontSize: 10, color: colors.textLight, marginTop: 2 },
  timeMe: { textAlign: 'right', marginRight: spacing.sm },
  timeOther: { marginLeft: spacing.sm },
  cardWrap: { marginBottom: spacing.md },
  cardWrapMe: { alignItems: 'flex-end' },
  cardWrapOther: { alignItems: 'flex-start' },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  groupBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: colors.cream,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: colors.white,
    paddingBottom: spacing.lg,
    paddingTop: spacing.xs,
  },
  hintText: { fontSize: fontSize.xs, color: colors.textMuted },
});
