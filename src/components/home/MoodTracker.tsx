import React from 'react';
import { View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Card } from '../ui/Card';
import { ThemedText } from '../ui/ThemedText';
import { useAppStore } from '../../stores/useAppStore';
import { useTheme } from '../../hooks/useTheme';

const moods = [
  { value: 1, emoji: '😫', label: 'Rough' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 5, emoji: '🙂', label: 'Good' },
  { value: 7, emoji: '😊', label: 'Great' },
  { value: 9, emoji: '🤩', label: 'Amazing' },
];

export function MoodTracker() {
  const { colors } = useTheme();
  const { todayMood, setTodayMood } = useAppStore();

  return (
    <Card style={{ marginBottom: 16 }}>
      <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 4 }}>
        How are you feeling?
      </ThemedText>
      <ThemedText variant="caption" color="muted" style={{ marginBottom: 16 }}>
        Track your mood to spot patterns
      </ThemedText>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {moods.map((mood) => {
          const isSelected = todayMood === mood.value;
          return (
            <Pressable
              key={mood.value}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setTodayMood(mood.value);
              }}
              style={{
                alignItems: 'center',
                gap: 6,
                padding: 10,
                borderRadius: 14,
                backgroundColor: isSelected ? `${colors.primary}20` : 'transparent',
                borderWidth: 1.5,
                borderColor: isSelected ? colors.primary : 'transparent',
              }}
            >
              <ThemedText style={{ fontSize: 28 }}>{mood.emoji}</ThemedText>
              <ThemedText
                variant="micro"
                weight={isSelected ? 'semibold' : 'regular'}
                customColor={isSelected ? colors.primary : colors.textMuted}
              >
                {mood.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>
    </Card>
  );
}
