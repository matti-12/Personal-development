import React from 'react';
import { View, ScrollView } from 'react-native';
import { ThemedText } from '../ui/ThemedText';
import { useTheme } from '../../hooks/useTheme';
import { getMonthDates } from '../../utils/date';
import { format } from 'date-fns';

interface HeatmapCalendarProps {
  completedDates: string[];
  color?: string;
  title?: string;
}

export function HeatmapCalendar({ completedDates, color = '#7C5CF8', title }: HeatmapCalendarProps) {
  const { colors } = useTheme();
  const dates = getMonthDates();
  const weeks: string[][] = [];

  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  const getOpacity = (date: string) => {
    return completedDates.includes(date) ? 1 : 0.08;
  };

  return (
    <View>
      {title && (
        <ThemedText variant="caption" weight="semibold" color="secondary" style={{ marginBottom: 10 }}>
          {title}
        </ThemedText>
      )}
      <View style={{ flexDirection: 'row', gap: 4 }}>
        {weeks.map((week, wi) => (
          <View key={wi} style={{ gap: 4 }}>
            {week.map((date) => (
              <View
                key={date}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  backgroundColor: `${color}${completedDates.includes(date) ? 'FF' : '14'}`,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ThemedText
                  variant="micro"
                  customColor={completedDates.includes(date) ? colors.white : colors.textMuted}
                  weight={completedDates.includes(date) ? 'semibold' : 'regular'}
                >
                  {format(new Date(date), 'd')}
                </ThemedText>
              </View>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
