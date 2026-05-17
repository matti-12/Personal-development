import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppStore } from '../src/stores/useAppStore';
import { Colors } from '../src/theme/colors';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const themeMode = useAppStore((s) => s.themeMode);
  const colors = Colors[themeMode];

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="note/[id]" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="goal/[id]" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
