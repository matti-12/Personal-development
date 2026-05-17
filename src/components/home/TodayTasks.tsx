import React from 'react';
import { View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Card } from '../ui/Card';
import { ThemedText } from '../ui/ThemedText';
import { Badge } from '../ui/Badge';
import { useTasksStore } from '../../stores/useTasksStore';
import { useTheme } from '../../hooks/useTheme';
import { getTodayString } from '../../utils/date';

const priorityColors = { high: '#F85C5C', medium: '#F8A85C', low: '#5C9CF8' };

export function TodayTasks() {
  const { colors } = useTheme();
  const { tasks, toggleTask } = useTasksStore();
  const today = getTodayString();
  const todayTasks = tasks.filter((t) => t.dueDate === today);
  const pending = todayTasks.filter((t) => !t.completed);
  const completed = todayTasks.filter((t) => t.completed);

  const handleToggle = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleTask(id);
  };

  return (
    <Card style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <ThemedText variant="subheading" weight="semibold">Today's Tasks</ThemedText>
        <ThemedText variant="caption" color="muted">
          {completed.length}/{todayTasks.length} done
        </ThemedText>
      </View>

      {[...pending, ...completed].map((task) => (
        <Pressable
          key={task.id}
          onPress={() => handleToggle(task.id)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: `${colors.border}50`,
          }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 11,
              borderWidth: 2,
              borderColor: task.completed ? colors.primary : colors.border,
              backgroundColor: task.completed ? colors.primary : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {task.completed && (
              <ThemedText variant="micro" customColor="#fff">✓</ThemedText>
            )}
          </View>

          <View style={{ flex: 1 }}>
            <ThemedText
              variant="body"
              weight="medium"
              style={{
                opacity: task.completed ? 0.4 : 1,
                textDecorationLine: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </ThemedText>
            {task.subtasks.length > 0 && (
              <ThemedText variant="micro" color="muted" style={{ marginTop: 2 }}>
                {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length} subtasks
              </ThemedText>
            )}
          </View>

          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
            {task.isRecurring && (
              <ThemedText variant="micro" color="muted">↩</ThemedText>
            )}
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: priorityColors[task.priority],
              }}
            />
          </View>
        </Pressable>
      ))}
    </Card>
  );
}
