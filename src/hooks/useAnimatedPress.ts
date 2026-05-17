import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export function useAnimatedPress(scale = 0.96) {
  const pressed = useSharedValue(false);
  const scaleValue = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleValue.value }],
  }));

  const onPressIn = () => {
    pressed.value = true;
    scaleValue.value = withSpring(scale, { damping: 15, stiffness: 300 });
  };

  const onPressOut = () => {
    pressed.value = false;
    scaleValue.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  return { animatedStyle, onPressIn, onPressOut };
}
