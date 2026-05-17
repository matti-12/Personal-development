import React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Card } from '../ui/Card';
import { ThemedText } from '../ui/ThemedText';
import { useHabitsStore } from '../../stores/useHabitsStore';
import { useTheme } from '../../hooks/useTheme';
import { getTodayString } from '../../utils/date';

export function HabitStrip() {
  const { colors } = useTheme();
  const { habits, toggleHabitToday } = useHabitsStore();
  const today = getTodayString();

  const handleToggle = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleHabitToday(id);
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <ThemedText variant="subheading" weight="semibold">Habits</ThemedText>
        <ThemedText variant="caption" color="muted">
          {habits.filter((h) => h.completedDates.includes(today)).length}/{habits.length} done
        </ThemedText>
      </View>
      <View style={{ gap: 10 }}>
        {habits.map((habit) => {
          const isCompleted = habit.completedDates.includes(today);
          return (
            <Pressable
              key={habit.id}
              onPress={() => handleToggle(habit.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingVertical: 4,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  backgroundColor: isCompleted ? `${habit.color}25` : colors.surface,
                  borderWidth: 1.5,
                  borderColor: isCompleted ? habit.color : colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isCompleted ? (
                  <ThemedText variant="body">{habit.emoji}</ThemedText>
                ) : (
                  <ThemedText variant="caption" customColor={colors.textMuted}>{habit.emoji}</ThemedText>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText
                  variant="body"
                  weight="medium"
                  style={{ opacity: isCompleted ? 0.5 : 1, textDecorationLine: isCompleted ? 'line-through' : 'none' }}
                >
                  {habit.title}
                </ThemedText>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <ThemedText variant="micro" customColor={habit.color} weight="semibold">
                  🔥 {habit.streak}
                </ThemedText>
              </View>
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  backgroundColor: isCompleted ? habit.color : colors.border,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isCompleted && (
                  <ThemedText variant="micro" customColor="#fff">✓</ThemedText>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}
