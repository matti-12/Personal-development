import React from 'react';
import { Pressable, View, ViewProps, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';
import { useAnimatedPress } from '../../hooks/useAnimatedPress';
import { Radius } from '../../theme/spacing';

interface CardProps extends ViewProps {
  onPress?: () => void;
  elevated?: boolean;
  padded?: boolean;
  noBorder?: boolean;
}

export function Card({ onPress, elevated, padded = true, noBorder, style, children, ...props }: CardProps) {
  const { colors } = useTheme();
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();

  const cardStyle = {
    backgroundColor: elevated ? colors.cardElevated : colors.card,
    borderRadius: Radius.xl,
    borderWidth: noBorder ? 0 : StyleSheet.hairlineWidth,
    borderColor: colors.border,
    padding: padded ? 16 : 0,
    overflow: 'hidden' as const,
  };

  if (onPress) {
    return (
      <Animated.View style={[animatedStyle, style]}>
        <Pressable
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={cardStyle}
          {...props}
        >
          {children}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
}
