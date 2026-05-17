import React from 'react';
import { View } from 'react-native';
import { format } from 'date-fns';
import { ThemedText } from '../ui/ThemedText';
import { useAppStore } from '../../stores/useAppStore';
import { getGreeting } from '../../utils/date';
import { useTheme } from '../../hooks/useTheme';

export function GreetingHeader() {
  const { colors } = useTheme();
  const userName = useAppStore((s) => s.userName);
  const focusScore = useAppStore((s) => s.focusScore);
  const productivityScore = useAppStore((s) => s.productivityScore);

  const greeting = getGreeting(userName);
  const dateLabel = format(new Date(), 'EEEE, MMMM d');

  return (
    <View style={{ marginBottom: 8 }}>
      <ThemedText variant="caption" color="muted" weight="medium" style={{ marginBottom: 4 }}>
        {dateLabel}
      </ThemedText>
      <ThemedText variant="title" weight="bold" style={{ lineHeight: 34, marginBottom: 16 }}>
        {greeting}
      </ThemedText>

      <View style={{ flexDirection: 'row', gap: 12 }}>
        <ScoreChip label="Focus" value={focusScore} color={colors.primary} />
        <ScoreChip label="Productivity" value={productivityScore} color={colors.secondary} />
      </View>
    </View>
  );
}

function ScoreChip({ label, value, color }: { label: string; value: number; color: string }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: `${color}15`,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: `${color}30`,
      }}
    >
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
      <ThemedText variant="caption" weight="semibold" customColor={color}>
        {label} {value}
      </ThemedText>
    </View>
  );
}
