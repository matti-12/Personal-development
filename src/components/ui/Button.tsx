import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import { useAnimatedPress } from '../../hooks/useAnimatedPress';
import { ThemedText } from './ThemedText';
import { Radius } from '../../theme/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeMap = {
  sm: { height: 36, fontSize: 13, px: 14 },
  md: { height: 48, fontSize: 15, px: 20 },
  lg: { height: 56, fontSize: 17, px: 24 },
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
  leftIcon,
  fullWidth,
}: ButtonProps) {
  const { colors } = useTheme();
  const { animatedStyle, onPressIn, onPressOut } = useAnimatedPress();
  const { height, fontSize, px } = sizeMap[size];

  const getContent = () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingHorizontal: px,
        height,
        borderRadius: Radius.lg,
        opacity: disabled ? 0.5 : 1,
        ...(variant === 'secondary' && {
          backgroundColor: colors.primaryMuted,
          borderWidth: 1,
          borderColor: colors.primary,
        }),
        ...(variant === 'ghost' && {
          backgroundColor: colors.glass,
        }),
        ...(variant === 'destructive' && {
          backgroundColor: colors.errorMuted,
        }),
      }}
    >
      {leftIcon}
      <ThemedText
        variant="body"
        weight="semibold"
        customColor={
          variant === 'primary'
            ? colors.white
            : variant === 'destructive'
            ? colors.error
            : colors.primary
        }
        style={{ fontSize }}
      >
        {title}
      </ThemedText>
    </View>
  );

  return (
    <Animated.View style={[animatedStyle, fullWidth && { width: '100%' }]}>
      <Pressable
        onPress={disabled ? undefined : onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ borderRadius: Radius.lg, overflow: 'hidden' }}
      >
        {variant === 'primary' ? (
          <LinearGradient
            colors={['#9B7FFA', '#7C5CF8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height,
              borderRadius: Radius.lg,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              paddingHorizontal: px,
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {leftIcon}
            <ThemedText
              variant="body"
              weight="semibold"
              customColor={colors.white}
              style={{ fontSize }}
            >
              {title}
            </ThemedText>
          </LinearGradient>
        ) : (
          getContent()
        )}
      </Pressable>
    </Animated.View>
  );
}
