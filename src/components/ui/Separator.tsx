import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

export function Separator({ spacing = 12 }: { spacing?: number }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing,
        opacity: 0.5,
      }}
    />
  );
}
