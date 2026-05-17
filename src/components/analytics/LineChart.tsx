import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, Line, Text as SvgText, Circle, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  color?: string;
  height?: number;
  filled?: boolean;
}

export function LineChart({ data, color = '#7C5CF8', height = 120, filled = true }: LineChartProps) {
  const { colors } = useTheme();
  const chartWidth = SCREEN_WIDTH - 72;
  const chartHeight = height;
  const padding = { left: 32, right: 12, top: 12, bottom: 24 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * innerW,
    y: padding.top + ((maxVal - d.value) / range) * innerH,
    value: d.value,
    label: d.label,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const fillPath = `${pathD} L ${points[points.length - 1].x} ${padding.top + innerH} L ${padding.left} ${padding.top + innerH} Z`;

  const gradientId = `grad-${color.replace('#', '')}`;

  return (
    <Svg width={chartWidth} height={chartHeight}>
      <Defs>
        <SvgGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <Stop offset="100%" stopColor={color} stopOpacity={0} />
        </SvgGradient>
      </Defs>

      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <Line
          key={t}
          x1={padding.left}
          y1={padding.top + t * innerH}
          x2={padding.left + innerW}
          y2={padding.top + t * innerH}
          stroke={colors.border}
          strokeWidth={1}
          opacity={0.4}
        />
      ))}

      {filled && (
        <Path d={fillPath} fill={`url(#${gradientId})`} />
      )}

      <Path
        d={pathD}
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {points.map((p, i) => (
        <React.Fragment key={i}>
          <Circle cx={p.x} cy={p.y} r={4} fill={color} />
          <Circle cx={p.x} cy={p.y} r={2} fill={colors.card} />
          {i % 2 === 0 && (
            <SvgText
              x={p.x}
              y={chartHeight - 4}
              textAnchor="middle"
              fill={colors.textMuted}
              fontSize={10}
              fontWeight="500"
            >
              {p.label}
            </SvgText>
          )}
        </React.Fragment>
      ))}
    </Svg>
  );
}
