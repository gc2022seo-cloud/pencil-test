import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { OrderStatusKey, orderStatusSteps } from '../data/mockData';
import { colors, fontSize, spacing } from '../theme';

interface Props {
  currentStatus: OrderStatusKey;
}

/** 訂單進度條（直式時間軸） */
export default function OrderStatusStepper({ currentStatus }: Props) {
  const currentIndex = orderStatusSteps.findIndex(
    (s) => s.key === currentStatus
  );

  return (
    <View>
      {orderStatusSteps.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        const reached = done || active;
        const isLast = index === orderStatusSteps.length - 1;

        return (
          <View key={step.key} style={styles.row}>
            <View style={styles.indicatorCol}>
              <View
                style={[
                  styles.dot,
                  reached && styles.dotActive,
                  active && styles.dotCurrent,
                ]}
              >
                {done ? (
                  <Ionicons name="checkmark" size={14} color={colors.white} />
                ) : (
                  <View style={[styles.innerDot, active && styles.innerDotActive]} />
                )}
              </View>
              {!isLast && (
                <View style={[styles.line, done && styles.lineActive]} />
              )}
            </View>
            <View style={styles.labelCol}>
              <Text
                style={[
                  styles.label,
                  reached && styles.labelActive,
                  active && styles.labelCurrent,
                ]}
              >
                {step.label}
              </Text>
              {active && <Text style={styles.activeHint}>進行中…</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  indicatorCol: {
    alignItems: 'center',
    width: 32,
  },
  dot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.creamDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotActive: {
    backgroundColor: colors.green,
  },
  dotCurrent: {
    backgroundColor: colors.orange,
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textLight,
  },
  innerDotActive: {
    backgroundColor: colors.white,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 28,
    backgroundColor: colors.creamDark,
  },
  lineActive: {
    backgroundColor: colors.green,
  },
  labelCol: {
    marginLeft: spacing.md,
    paddingBottom: spacing.lg,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  label: {
    fontSize: fontSize.md,
    color: colors.textLight,
    fontWeight: '600',
  },
  labelActive: {
    color: colors.text,
  },
  labelCurrent: {
    color: colors.orange,
    fontWeight: '800',
  },
  activeHint: {
    fontSize: fontSize.xs,
    color: colors.orange,
    marginTop: 2,
  },
});
