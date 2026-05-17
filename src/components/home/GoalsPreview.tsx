import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from '../ui/Card';
import { ThemedText } from '../ui/ThemedText';
import { useGoalsStore } from '../../stores/useGoalsStore';
import { useTheme } from '../../hooks/useTheme';
import { getProgressPercent } from '../../utils/format';

export function GoalsPreview() {
  const { colors } = useTheme();
  const goals = useGoalsStore((s) => s.goals);
  const router = useRouter();
  const topGoals = goals.filter((g) => g.priority === 'high').slice(0, 3);

  return (
    <Card style={{ marginBottom: 16 }} onPress={() => router.push('/(tabs)/goals')}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <ThemedText variant="subheading" weight="semibold">Top Goals</ThemedText>
        <ThemedText variant="caption" customColor={colors.primary}>See all →</ThemedText>
      </View>

      <View style={{ gap: 14 }}>
        {topGoals.map((goal) => {
          const pct = getProgressPercent(goal.progress, goal.target);
          return (
            <View key={goal.id}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: goal.color,
                    }}
                  />
                  <ThemedText variant="body" weight="medium">{goal.title}</ThemedText>
                </View>
                <ThemedText variant="caption" weight="semibold" customColor={goal.color}>
                  {pct}%
                </ThemedText>
              </View>
              <View
                style={{
                  height: 4,
                  backgroundColor: colors.border,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: 4,
                    width: `${pct}%`,
                    backgroundColor: goal.color,
                    borderRadius: 2,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}
