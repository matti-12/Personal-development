import { View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { ThemedText } from '../src/components/ui/ThemedText';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <ThemedText variant="hero">404</ThemedText>
        <ThemedText variant="body" color="muted">This screen doesn't exist.</ThemedText>
        <Link href="/(tabs)">
          <ThemedText variant="body" color="accent">Go to home screen →</ThemedText>
        </Link>
      </View>
    </>
  );
}
