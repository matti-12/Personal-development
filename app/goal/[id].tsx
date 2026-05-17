import React from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../../src/hooks/useTheme';
import { useGoalsStore } from '../../src/stores/useGoalsStore';
import { ThemedText } from '../../src/components/ui/ThemedText';
import { Badge } from '../../src/components/ui/Badge';
import { ProgressRing } from '../../src/components/ui/ProgressRing';
import { Card } from '../../src/components/ui/Card';
import { Separator } from '../../src/components/ui/Separator';
import { getProgressPercent, formatCurrency } from '../../src/utils/format';
import { formatDaysUntil } from '../../src/utils/date';

export default function GoalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { goals, toggleMilestone } = useGoalsStore();
  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ThemedText variant="body" color="muted" style={{ padding: 20 }}>Goal not found</ThemedText>
      </SafeAreaView>
    );
  }

  const pct = getProgressPercent(goal.progress, goal.target);
  const daysLabel = formatDaysUntil(goal.deadline);
  const formatVal = (v: number) => {
    if (goal.unit === '€') return formatCurrency(v);
    if (goal.unit === '%') return `${v}%`;
    return `${v} ${goal.unit}`;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Pressable onPress={() => router.back()}>
          <ThemedText variant="body" customColor={colors.primary}>← Back</ThemedText>
        </Pressable>
        <ThemedText variant="body" weight="semibold">Goal Detail</ThemedText>
        <Pressable>
          <ThemedText variant="body" customColor={colors.primary}>Edit</ThemedText>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient
          colors={[`${goal.color}20`, `${goal.color}05`]}
          style={styles.hero}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1, marginRight: 20 }}>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 10 }}>
                <Badge label={goal.category} color={goal.color} />
                <Badge label={goal.priority} color={
                  goal.priority === 'high' ? colors.error :
                  goal.priority === 'medium' ? colors.warning : colors.textMuted
                } />
              </View>
              <ThemedText variant="title" weight="bold" style={{ lineHeight: 30, marginBottom: 6 }}>
                {goal.title}
              </ThemedText>
              <ThemedText variant="body" color="secondary" style={{ lineHeight: 20 }}>
                {goal.description}
              </ThemedText>
            </View>
            <ProgressRing
              progress={pct}
              color={goal.color}
              size={88}
              strokeWidth={7}
              showLabel
            />
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatBox label="Progress" value={formatVal(goal.progress)} color={goal.color} />
          <StatBox label="Target" value={formatVal(goal.target)} color={colors.textSecondary} />
          <StatBox label="Deadline" value={daysLabel} color={colors.primary} />
          {goal.streak > 0 && (
            <StatBox label="Streak" value={`🔥 ${goal.streak}d`} color="#F8A85C" />
          )}
        </View>

        {/* Progress bar */}
        <Card style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <ThemedText variant="body" weight="semibold">Progress</ThemedText>
            <ThemedText variant="body" weight="bold" customColor={goal.color}>{pct}%</ThemedText>
          </View>
          <View style={{ height: 8, backgroundColor: colors.border, borderRadius: 4, overflow: 'hidden' }}>
            <LinearGradient
              colors={[`${goal.color}CC`, goal.color]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ height: 8, width: `${pct}%`, borderRadius: 4 }}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <ThemedText variant="micro" color="muted">{formatVal(goal.progress)}</ThemedText>
            <ThemedText variant="micro" color="muted">{formatVal(goal.target)}</ThemedText>
          </View>
        </Card>

        {/* Milestones */}
        <Card style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 }}>
            <ThemedText variant="subheading" weight="semibold">Milestones</ThemedText>
            <ThemedText variant="caption" color="muted">
              {goal.milestones.filter((m) => m.completed).length}/{goal.milestones.length} done
            </ThemedText>
          </View>
          {goal.milestones.map((milestone, i) => (
            <Pressable
              key={milestone.id}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                toggleMilestone(goal.id, milestone.id);
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 12,
                borderBottomWidth: i < goal.milestones.length - 1 ? StyleSheet.hairlineWidth : 0,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  borderWidth: 2,
                  borderColor: milestone.completed ? goal.color : colors.border,
                  backgroundColor: milestone.completed ? goal.color : 'transparent',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {milestone.completed && (
                  <ThemedText variant="micro" customColor="#fff" weight="bold">✓</ThemedText>
                )}
              </View>
              <ThemedText
                variant="body"
                weight={milestone.completed ? 'regular' : 'medium'}
                style={{
                  opacity: milestone.completed ? 0.5 : 1,
                  textDecorationLine: milestone.completed ? 'line-through' : 'none',
                }}
              >
                {milestone.title}
              </ThemedText>
            </Pressable>
          ))}
        </Card>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: `${color}10`,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: `${color}20`,
      }}
    >
      <ThemedText variant="caption" weight="bold" customColor={color} style={{ textAlign: 'center' }}>
        {value}
      </ThemedText>
      <ThemedText variant="micro" color="muted" style={{ marginTop: 2, textAlign: 'center' }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2A3A',
  },
  content: { paddingBottom: 60 },
  hero: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 20,
    margin: 16,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
});
