import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/hooks/useTheme';
import { GreetingHeader } from '../../src/components/home/GreetingHeader';
import { DailyOverview } from '../../src/components/home/DailyOverview';
import { HabitStrip } from '../../src/components/home/HabitStrip';
import { TodayTasks } from '../../src/components/home/TodayTasks';
import { GoalsPreview } from '../../src/components/home/GoalsPreview';
import { MoodTracker } from '../../src/components/home/MoodTracker';
import { WeeklyChart } from '../../src/components/home/WeeklyChart';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GreetingHeader />
        <DailyOverview />
        <MoodTracker />
        <TodayTasks />
        <HabitStrip />
        <GoalsPreview />
        <WeeklyChart />
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
