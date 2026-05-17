import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
  size?: number;
  strokeWidth?: number;
  progress: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
  label?: string;
  centerContent?: React.ReactNode;
}

export function ProgressRing({
  size = 80,
  strokeWidth = 6,
  progress,
  color = '#7C5CF8',
  backgroundColor = 'rgba(255,255,255,0.06)',
  showLabel = true,
  label,
  centerContent,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(Math.min(progress, 100) / 100, {
      duration: 1200,
      easing: Easing.out(Easing.cubic),
    });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {centerContent ?? (
        showLabel && (
          <View style={{ alignItems: 'center' }}>
            <ThemedText variant="caption" weight="bold" customColor={color}>
              {progress}%
            </ThemedText>
            {label && (
              <ThemedText variant="micro" color="muted" style={{ marginTop: 1 }}>
                {label}
              </ThemedText>
            )}
          </View>
        )
      )}
    </View>
  );
}
