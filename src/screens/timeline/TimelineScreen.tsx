import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import DemoBanner from '../../components/DemoBanner';
import TimelineCard from '../../components/TimelineCard';
import { timelinePhases, timelineSummary } from '../../data/mockData';
import { colors, fontSize, radius, shadow, spacing } from '../../theme';

export default function TimelineScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>開發時程</Text>
      <Text style={styles.sub}>四階段交付規劃</Text>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: colors.orange }]}>
          <Ionicons name="rocket-outline" size={20} color={colors.white} />
          <Text style={styles.summaryLabel}>MVP 版本</Text>
          <Text style={styles.summaryValue}>{timelineSummary.mvp}</Text>
        </View>
        <View style={{ width: spacing.md }} />
        <View style={[styles.summaryCard, { backgroundColor: colors.navy }]}>
          <Ionicons name="trophy-outline" size={20} color={colors.white} />
          <Text style={styles.summaryLabel}>完整版本</Text>
          <Text style={styles.summaryValue}>{timelineSummary.full}</Text>
        </View>
      </View>

      <View style={styles.timeline}>
        {timelinePhases.map((p, i) => (
          <TimelineCard
            key={p.phase}
            data={p}
            index={i}
            isLast={i === timelinePhases.length - 1}
          />
        ))}
      </View>

      <DemoBanner text="時程為預估範圍，實際依需求範圍、第三方 API 提供時程與測試結果調整。" />
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.cream },
  content: { padding: spacing.lg },
  heading: { fontSize: fontSize.xxl, fontWeight: '900', color: colors.navy },
  sub: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2, marginBottom: spacing.lg },
  summaryRow: { flexDirection: 'row', marginBottom: spacing.xl },
  summaryCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    ...shadow.card,
  },
  summaryLabel: {
    color: '#FFFFFFCC',
    fontSize: fontSize.sm,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  summaryValue: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: '900',
    marginTop: 2,
  },
  timeline: { marginTop: spacing.sm },
});
