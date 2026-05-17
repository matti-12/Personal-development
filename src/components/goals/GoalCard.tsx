import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../ui/Card';
import { ThemedText } from '../ui/ThemedText';
import { Badge } from '../ui/Badge';
import { ProgressRing } from '../ui/ProgressRing';
import { type Goal } from '../../stores/useGoalsStore';
import { useTheme } from '../../hooks/useTheme';
import { getProgressPercent, formatCurrency } from '../../utils/format';
import { formatDaysUntil } from '../../utils/date';

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

export function GoalCard({ goal, onPress }: GoalCardProps) {
  const { colors } = useTheme();
  const pct = getProgressPercent(goal.progress, goal.target);
  const completedMilestones = goal.milestones.filter((m) => m.completed).length;
  const daysLabel = formatDaysUntil(goal.deadline);

  const formatValue = (val: number) => {
    if (goal.unit === '€') return formatCurrency(val);
    if (goal.unit === '%') return `${val}%`;
    return `${val} ${goal.unit}`;
  };

  return (
    <Card onPress={onPress} style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1, marginRight: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Badge label={goal.category} color={goal.color} />
            <Badge label={goal.priority} color={
              goal.priority === 'high' ? colors.error :
              goal.priority === 'medium' ? colors.warning : colors.textMuted
            } />
          </View>

          <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 4 }}>
            {goal.title}
          </ThemedText>
          <ThemedText variant="caption" color="muted" style={{ marginBottom: 12 }}>
            {goal.description}
          </ThemedText>

          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View>
              <ThemedText variant="micro" color="muted">Progress</ThemedText>
              <ThemedText variant="body" weight="semibold" customColor={goal.color}>
                {formatValue(goal.progress)}
              </ThemedText>
            </View>
            <View>
              <ThemedText variant="micro" color="muted">Target</ThemedText>
              <ThemedText variant="body" weight="medium" color="secondary">
                {formatValue(goal.target)}
              </ThemedText>
            </View>
            <View>
              <ThemedText variant="micro" color="muted">Deadline</ThemedText>
              <ThemedText variant="body" weight="medium" color="secondary">
                {daysLabel}
              </ThemedText>
            </View>
            {goal.streak > 0 && (
              <View>
                <ThemedText variant="micro" color="muted">Streak</ThemedText>
                <ThemedText variant="body" weight="semibold" customColor="#F8A85C">
                  🔥 {goal.streak}d
                </ThemedText>
              </View>
            )}
          </View>
        </View>

        <ProgressRing
          progress={pct}
          color={goal.color}
          size={72}
          strokeWidth={6}
          showLabel
        />
      </View>

      <View
        style={{
          marginTop: 14,
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

      {goal.milestones.length > 0 && (
        <View style={{ marginTop: 12, flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
          {goal.milestones.map((m) => (
            <View
              key={m.id}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
                backgroundColor: m.completed ? `${goal.color}20` : colors.surface,
                borderWidth: 1,
                borderColor: m.completed ? `${goal.color}40` : colors.border,
              }}
            >
              <ThemedText
                variant="micro"
                customColor={m.completed ? goal.color : colors.textMuted}
                weight={m.completed ? 'semibold' : 'regular'}
                style={{ textDecorationLine: m.completed ? 'line-through' : 'none' }}
              >
                {m.completed ? '✓ ' : ''}{m.title}
              </ThemedText>
            </View>
          ))}
        </View>
      )}
    </Card>
  );
}
