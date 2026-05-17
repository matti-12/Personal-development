import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Typography } from '../../theme/typography';

type TextVariant = 'hero' | 'title' | 'heading' | 'subheading' | 'body' | 'caption' | 'micro';
type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'heavy';
type TextColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error';

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  customColor?: string;
}

const variantSizes: Record<TextVariant, number> = {
  hero: Typography.sizes['3xl'],
  title: Typography.sizes['2xl'],
  heading: Typography.sizes.xl,
  subheading: Typography.sizes.lg,
  body: Typography.sizes.base,
  caption: Typography.sizes.sm,
  micro: Typography.sizes.xs,
};

export function ThemedText({
  variant = 'body',
  weight = 'regular',
  color = 'primary',
  customColor,
  style,
  ...props
}: ThemedTextProps) {
  const { colors } = useTheme();

  const colorMap: Record<TextColor, string> = {
    primary: colors.textPrimary,
    secondary: colors.textSecondary,
    muted: colors.textMuted,
    accent: colors.primary,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
  };

  return (
    <Text
      style={[
        {
          fontSize: variantSizes[variant],
          fontWeight: Typography.weights[weight],
          color: customColor ?? colorMap[color],
          letterSpacing: variant === 'hero' || variant === 'title' ? -0.5 : 0,
        },
        style,
      ]}
      {...props}
    />
  );
}
