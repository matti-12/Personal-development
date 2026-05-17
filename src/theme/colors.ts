export const Colors = {
  dark: {
    background: '#0A0A0F',
    surface: '#12121A',
    card: '#1A1A26',
    cardElevated: '#20202E',
    border: '#2A2A3A',
    borderSubtle: '#1E1E2E',

    primary: '#7C5CF8',
    primaryMuted: '#7C5CF820',
    primaryLight: '#9B7FFA',

    secondary: '#5CF8C8',
    secondaryMuted: '#5CF8C820',

    accent: '#F8A85C',
    accentMuted: '#F8A85C20',

    purple: '#7C5CF8',
    teal: '#5CF8C8',
    orange: '#F8A85C',
    pink: '#F85CC8',
    blue: '#5C9CF8',

    textPrimary: '#FFFFFF',
    textSecondary: '#9090B0',
    textMuted: '#50506A',
    textInverse: '#0A0A0F',

    success: '#4CAF7D',
    successMuted: '#4CAF7D20',
    warning: '#F8C85C',
    warningMuted: '#F8C85C20',
    error: '#F85C5C',
    errorMuted: '#F85C5C20',

    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',

    overlay: 'rgba(0,0,0,0.6)',
    glass: 'rgba(255,255,255,0.04)',
    glassBorder: 'rgba(255,255,255,0.08)',
  },
  light: {
    background: '#F5F5FA',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    cardElevated: '#F0F0F8',
    border: '#E0E0F0',
    borderSubtle: '#EBEBF5',

    primary: '#7C5CF8',
    primaryMuted: '#7C5CF815',
    primaryLight: '#9B7FFA',

    secondary: '#00B884',
    secondaryMuted: '#00B88415',

    accent: '#F8A85C',
    accentMuted: '#F8A85C15',

    purple: '#7C5CF8',
    teal: '#00B884',
    orange: '#F8A85C',
    pink: '#F85CC8',
    blue: '#5C9CF8',

    textPrimary: '#0A0A0F',
    textSecondary: '#606080',
    textMuted: '#A0A0B8',
    textInverse: '#FFFFFF',

    success: '#4CAF7D',
    successMuted: '#4CAF7D15',
    warning: '#F8C85C',
    warningMuted: '#F8C85C15',
    error: '#F85C5C',
    errorMuted: '#F85C5C15',

    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',

    overlay: 'rgba(0,0,0,0.3)',
    glass: 'rgba(0,0,0,0.04)',
    glassBorder: 'rgba(0,0,0,0.08)',
  },
} as const;

export type ColorScheme = keyof typeof Colors;
export type ThemeColors = typeof Colors.dark;
