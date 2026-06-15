import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TimelinePhase } from '../data/mockData';
import { colors, fontSize, radius, shadow, spacing } from '../theme';

interface Props {
  data: TimelinePhase;
  index: number;
  isLast: boolean;
}

/** 開發時程時間軸卡片 */
export default function TimelineCard({ data, index, isLast }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.timelineCol}>
        <View style={styles.node}>
          <Text style={styles.nodeText}>{index + 1}</Text>
        </View>
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.card}>
        <Text style={styles.phase}>{data.phase}</Text>
        <Text style={styles.title}>{data.title}</Text>
        <View style={styles.durationRow}>
          <Ionicons name="time-outline" size={14} color={colors.orange} />
          <Text style={styles.duration}>{data.duration}</Text>
        </View>
        <View style={styles.items}>
          {data.items.map((it) => (
            <View key={it} style={styles.itemRow}>
              <Ionicons
                name="checkmark-circle"
                size={14}
                color={colors.green}
              />
              <Text style={styles.itemText}>{it}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  timelineCol: {
    alignItems: 'center',
    width: 40,
  },
  node: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: fontSize.md,
  },
  line: {
    flex: 1,
    width: 2,
    backgroundColor: colors.navySoft,
    marginVertical: 4,
  },
  card: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    marginLeft: spacing.sm,
    ...shadow.soft,
  },
  phase: {
    fontSize: fontSize.xs,
    fontWeight: '800',
    color: colors.orange,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: '800',
    color: colors.navy,
    marginTop: 2,
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
  },
  duration: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '600',
  },
  items: {
    marginTop: spacing.md,
    gap: 6,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },
});
