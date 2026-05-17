import { useAppStore } from '../stores/useAppStore';
import { Colors, type ThemeColors } from '../theme/colors';
import { Typography } from '../theme/typography';
import { Spacing, Radius } from '../theme/spacing';

export function useTheme() {
  const themeMode = useAppStore((s) => s.themeMode);
  const colors: ThemeColors = Colors[themeMode];

  return {
    colors,
    typography: Typography,
    spacing: Spacing,
    radius: Radius,
    isDark: themeMode === 'dark',
  };
}
