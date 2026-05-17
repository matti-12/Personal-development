import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ThemedText } from './ThemedText';

interface BadgeProps {
  label: string;
  color?: string;
  style?: ViewStyle;
}

export function Badge({ label, color = '#7C5CF8', style }: BadgeProps) {
  return (
    <View
      style={[
        {
          backgroundColor: `${color}20`,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 100,
          borderWidth: 1,
          borderColor: `${color}40`,
        },
        style,
      ]}
    >
      <ThemedText variant="micro" weight="semibold" customColor={color}>
        {label}
      </ThemedText>
    </View>
  );
}
