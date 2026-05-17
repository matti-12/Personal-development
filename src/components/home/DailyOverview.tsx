import React from 'react';
import { View } from 'react-native';
import { Card } from '../ui/Card';
import { ThemedText } from '../ui/ThemedText';
import { ProgressRing } from '../ui/ProgressRing';
import { useTasksStore } from '../../stores/useTasksStore';
import { useHabitsStore } from '../../stores/useHabitsStore';
import { useGoalsStore } from '../../stores/useGoalsStore';
import { useTheme } from '../../hooks/useTheme';
import { getTodayString } from '../../utils/date';

export function DailyOverview() {
  const { colors } = useTheme();
  const tasks = useTasksStore((s) => s.tasks);
  const habits = useHabitsStore((s) => s.habits);
  const goals = useGoalsStore((s) => s.goals);

  const today = getTodayString();
  const todayTasks = tasks.filter((t) => t.dueDate === today);
  const completedTasks = todayTasks.filter((t) => t.completed).length;
  const taskProgress = todayTasks.length > 0 ? Math.round((completedTasks / todayTasks.length) * 100) : 0;

  const completedHabits = habits.filter((h) => h.completedDates.includes(today)).length;
  const habitProgress = habits.length > 0 ? Math.round((completedHabits / habits.length) * 100) : 0;

  const avgGoalProgress = Math.round(goals.reduce((acc, g) => acc + (g.progress / g.target) * 100, 0) / goals.length);

  return (
    <Card style={{ marginBottom: 16 }}>
      <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 16 }}>
        Today's Overview
      </ThemedText>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <RingItem
          progress={taskProgress}
          label="Tasks"
          sublabel={`${completedTasks}/${todayTasks.length}`}
          color={colors.primary}
        />
        <RingItem
          progress={habitProgress}
          label="Habits"
          sublabel={`${completedHabits}/${habits.length}`}
          color={colors.secondary}
        />
        <RingItem
          progress={avgGoalProgress}
          label="Goals"
          sublabel={`${goals.length} active`}
          color={colors.accent}
        />
      </View>
    </Card>
  );
}

function RingItem({
  progress,
  label,
  sublabel,
  color,
}: {
  progress: number;
  label: string;
  sublabel: string;
  color: string;
}) {
  return (
    <View style={{ alignItems: 'center', gap: 8 }}>
      <ProgressRing
        progress={progress}
        color={color}
        size={76}
        strokeWidth={6}
        showLabel
      />
      <ThemedText variant="caption" weight="semibold">
        {label}
      </ThemedText>
      <ThemedText variant="micro" color="muted">
        {sublabel}
      </ThemedText>
    </View>
  );
}
