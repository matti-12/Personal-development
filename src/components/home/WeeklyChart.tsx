import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import { Card } from '../ui/Card';
import { ThemedText } from '../ui/ThemedText';
import { useTheme } from '../../hooks/useTheme';

const weekData = [
  { day: 'M', productivity: 72, focus: 68 },
  { day: 'T', productivity: 85, focus: 80 },
  { day: 'W', productivity: 60, focus: 55 },
  { day: 'T', productivity: 90, focus: 88 },
  { day: 'F', productivity: 78, focus: 75 },
  { day: 'S', productivity: 40, focus: 35 },
  { day: 'S', productivity: 82, focus: 78 },
];

export function WeeklyChart() {
  const { colors } = useTheme();
  const chartWidth = 300;
  const chartHeight = 100;
  const barWidth = 20;
  const gap = (chartWidth - barWidth * weekData.length) / (weekData.length + 1);

  return (
    <Card style={{ marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <ThemedText variant="subheading" weight="semibold">Weekly Performance</ThemedText>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary }} />
            <ThemedText variant="micro" color="muted">Productivity</ThemedText>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.secondary }} />
            <ThemedText variant="micro" color="muted">Focus</ThemedText>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center' }}>
        <Svg width={chartWidth} height={chartHeight + 24}>
          {weekData.map((item, i) => {
            const x = gap + i * (barWidth + gap);
            const prodHeight = (item.productivity / 100) * chartHeight;
            const focusHeight = (item.focus / 100) * chartHeight;
            return (
              <React.Fragment key={i}>
                <Rect
                  x={x}
                  y={chartHeight - prodHeight}
                  width={barWidth * 0.55}
                  height={prodHeight}
                  rx={4}
                  fill={colors.primary}
                  opacity={0.85}
                />
                <Rect
                  x={x + barWidth * 0.45}
                  y={chartHeight - focusHeight}
                  width={barWidth * 0.55}
                  height={focusHeight}
                  rx={4}
                  fill={colors.secondary}
                  opacity={0.7}
                />
                <SvgText
                  x={x + barWidth / 2}
                  y={chartHeight + 18}
                  textAnchor="middle"
                  fill={colors.textMuted}
                  fontSize={11}
                  fontWeight="500"
                >
                  {item.day}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </Card>
  );
}
