import React, { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/hooks/useTheme';
import { ThemedText } from '../../src/components/ui/ThemedText';
import { Card } from '../../src/components/ui/Card';
import { ProgressRing } from '../../src/components/ui/ProgressRing';
import { LineChart } from '../../src/components/analytics/LineChart';
import { HeatmapCalendar } from '../../src/components/analytics/HeatmapCalendar';
import { useHabitsStore } from '../../src/stores/useHabitsStore';
import { useJournalStore } from '../../src/stores/useJournalStore';

type Period = '7d' | '30d' | '90d';

const productivityData7d = [
  { label: 'M', value: 72 }, { label: 'T', value: 85 }, { label: 'W', value: 60 },
  { label: 'T', value: 90 }, { label: 'F', value: 78 }, { label: 'S', value: 40 }, { label: 'S', value: 82 },
];

const focusData7d = [
  { label: 'M', value: 68 }, { label: 'T', value: 80 }, { label: 'W', value: 55 },
  { label: 'T', value: 88 }, { label: 'F', value: 75 }, { label: 'S', value: 35 }, { label: 'S', value: 78 },
];

const moodData7d = [
  { label: 'M', value: 7 }, { label: 'T', value: 8 }, { label: 'W', value: 6 },
  { label: 'T', value: 9 }, { label: 'F', value: 7 }, { label: 'S', value: 5 }, { label: 'S', value: 8 },
];

export default function AnalyticsScreen() {
  const { colors } = useTheme();
  const [period, setPeriod] = useState<Period>('7d');
  const habits = useHabitsStore((s) => s.habits);
  const entries = useJournalStore((s) => s.entries);

  const avgProductivity = Math.round(productivityData7d.reduce((a, d) => a + d.value, 0) / productivityData7d.length);
  const avgFocus = Math.round(focusData7d.reduce((a, d) => a + d.value, 0) / focusData7d.length);
  const avgMood = (moodData7d.reduce((a, d) => a + d.value, 0) / moodData7d.length).toFixed(1);
  const topStreak = Math.max(...habits.map((h) => h.streak));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ThemedText variant="hero" weight="bold" style={{ marginBottom: 6 }}>Analytics</ThemedText>
        <ThemedText variant="caption" color="muted" style={{ marginBottom: 20 }}>
          Your personal performance insights
        </ThemedText>

        {/* Period switcher */}
        <View style={styles.periodSwitcher}>
          {(['7d', '30d', '90d'] as Period[]).map((p) => (
            <Pressable
              key={p}
              onPress={() => setPeriod(p)}
              style={[
                styles.periodTab,
                {
                  backgroundColor: period === p ? colors.primary : colors.glass,
                  borderColor: period === p ? colors.primary : colors.glassBorder,
                },
              ]}
            >
              <ThemedText
                variant="caption"
                weight="semibold"
                customColor={period === p ? '#fff' : colors.textSecondary}
              >
                {p}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Summary rings */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 16 }}>
            Performance Summary
          </ThemedText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <ProgressRing progress={avgProductivity} color={colors.primary} size={80} />
              <ThemedText variant="caption" weight="semibold">Productivity</ThemedText>
            </View>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <ProgressRing progress={avgFocus} color={colors.secondary} size={80} />
              <ThemedText variant="caption" weight="semibold">Focus</ThemedText>
            </View>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <ProgressRing progress={Number(avgMood) * 10} color={colors.accent} size={80} />
              <ThemedText variant="caption" weight="semibold">Mood</ThemedText>
            </View>
          </View>
        </Card>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          <StatCard label="Avg Productivity" value={`${avgProductivity}%`} color={colors.primary} emoji="⚡" />
          <StatCard label="Avg Focus" value={`${avgFocus}%`} color={colors.secondary} emoji="🎯" />
          <StatCard label="Avg Mood" value={`${avgMood}/10`} color={colors.accent} emoji="😊" />
          <StatCard label="Top Streak" value={`${topStreak}d`} color="#F8A85C" emoji="🔥" />
        </View>

        {/* Productivity trend */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 4 }}>
            Productivity Trend
          </ThemedText>
          <ThemedText variant="micro" color="muted" style={{ marginBottom: 14 }}>
            Last 7 days
          </ThemedText>
          <LineChart data={productivityData7d} color={colors.primary} />
        </Card>

        {/* Focus trend */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 4 }}>
            Focus Score
          </ThemedText>
          <ThemedText variant="micro" color="muted" style={{ marginBottom: 14 }}>
            Last 7 days
          </ThemedText>
          <LineChart data={focusData7d} color={colors.secondary} />
        </Card>

        {/* Mood trend */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 4 }}>
            Mood Tracking
          </ThemedText>
          <ThemedText variant="micro" color="muted" style={{ marginBottom: 14 }}>
            Last 7 days
          </ThemedText>
          <LineChart data={moodData7d.map((d) => ({ ...d, value: d.value * 10 }))} color={colors.accent} />
        </Card>

        {/* Habit heatmaps */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 16 }}>
            Habit Consistency
          </ThemedText>
          <View style={{ gap: 20 }}>
            {habits.slice(0, 3).map((habit) => (
              <View key={habit.id}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                  <ThemedText variant="body" weight="medium">
                    {habit.emoji} {habit.title}
                  </ThemedText>
                  <ThemedText variant="caption" weight="semibold" customColor={habit.color}>
                    🔥 {habit.streak} day streak
                  </ThemedText>
                </View>
                <HeatmapCalendar
                  completedDates={habit.completedDates}
                  color={habit.color}
                />
              </View>
            ))}
          </View>
        </Card>

        {/* Journal insights */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>
            Journal Insights
          </ThemedText>
          {entries.slice(0, 3).map((entry) => (
            <View
              key={entry.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 10,
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: `${colors.primary}15`,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ThemedText variant="subheading">{
                  entry.mood >= 8 ? '🤩' : entry.mood >= 6 ? '😊' : entry.mood >= 4 ? '🙂' : '😐'
                }</ThemedText>
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText variant="body" weight="semibold">{entry.date}</ThemedText>
                <ThemedText variant="caption" color="muted">
                  Mood {entry.mood}/10 · Productivity {entry.productivity}%
                </ThemedText>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <ThemedText variant="caption" weight="semibold" customColor={
                  entry.productivity >= 80 ? colors.success : entry.productivity >= 60 ? colors.warning : colors.error
                }>
                  {entry.productivity}%
                </ThemedText>
              </View>
            </View>
          ))}
        </Card>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatCard({ label, value, color, emoji }: { label: string; value: string; color: string; emoji: string }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: '48%',
        backgroundColor: `${color}10`,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: `${color}20`,
      }}
    >
      <ThemedText style={{ fontSize: 24, marginBottom: 8 }}>{emoji}</ThemedText>
      <ThemedText variant="title" weight="bold" customColor={color}>{value}</ThemedText>
      <ThemedText variant="micro" color="muted" style={{ marginTop: 4 }}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 16 },
  periodSwitcher: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  periodTab: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
});
