import React, { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../src/hooks/useTheme';
import { useGoalsStore, type GoalCategory } from '../../src/stores/useGoalsStore';
import { ThemedText } from '../../src/components/ui/ThemedText';
import { GoalCard } from '../../src/components/goals/GoalCard';
import { Badge } from '../../src/components/ui/Badge';

const categories: (GoalCategory | 'All')[] = [
  'All', 'Business', 'Career', 'Fitness', 'Financial', 'Learning', 'Travel', 'Personal', 'Content',
];

const categoryColors: Record<string, string> = {
  All: '#7C5CF8',
  Business: '#7C5CF8',
  Career: '#5C9CF8',
  Fitness: '#5CF8C8',
  Financial: '#F8A85C',
  Learning: '#4CAF7D',
  Travel: '#F85CC8',
  Personal: '#F8C85C',
  Content: '#F85C5C',
};

export default function GoalsScreen() {
  const { colors } = useTheme();
  const goals = useGoalsStore((s) => s.goals);
  const [activeCategory, setActiveCategory] = useState<GoalCategory | 'All'>('All');
  const router = useRouter();

  const filtered = activeCategory === 'All' ? goals : goals.filter((g) => g.category === activeCategory);
  const totalGoals = goals.length;
  const avgProgress = Math.round(goals.reduce((acc, g) => acc + (g.progress / g.target) * 100, 0) / totalGoals);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText variant="hero" weight="bold">Goals</ThemedText>
            <ThemedText variant="caption" color="muted" style={{ marginTop: 4 }}>
              {totalGoals} active · {avgProgress}% avg progress
            </ThemedText>
          </View>
          <Pressable
            style={{
              backgroundColor: colors.primary,
              borderRadius: 14,
              width: 44,
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ThemedText customColor="#fff" style={{ fontSize: 24 }}>+</ThemedText>
          </Pressable>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatBox label="Active" value={totalGoals} color={colors.primary} />
          <StatBox label="Avg Progress" value={`${avgProgress}%`} color={colors.secondary} />
          <StatBox label="On Track" value={goals.filter((g) => g.streak > 0).length} color={colors.success} />
          <StatBox label="High Priority" value={goals.filter((g) => g.priority === 'high').length} color={colors.error} />
        </View>

        {/* Category filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const color = categoryColors[cat];
            return (
              <Pressable
                key={cat}
                onPress={() => setActiveCategory(cat)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  borderRadius: 100,
                  backgroundColor: isActive ? color : `${color}15`,
                  borderWidth: 1,
                  borderColor: isActive ? color : `${color}30`,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  customColor={isActive ? '#fff' : color}
                >
                  {cat}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Goals list */}
        {filtered.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onPress={() => router.push(`/goal/${goal.id}`)}
          />
        ))}

        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 60 }}>
            <ThemedText style={{ fontSize: 48, marginBottom: 12 }}>🎯</ThemedText>
            <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 8 }}>
              No goals yet
            </ThemedText>
            <ThemedText variant="body" color="muted" style={{ textAlign: 'center' }}>
              Add your first goal to start tracking your progress
            </ThemedText>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBox({ label, value, color }: { label: string; value: number | string; color: string }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: `${color}10`,
        borderRadius: 14,
        padding: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: `${color}20`,
      }}
    >
      <ThemedText variant="subheading" weight="bold" customColor={color}>
        {value}
      </ThemedText>
      <ThemedText variant="micro" color="muted" style={{ marginTop: 2, textAlign: 'center' }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
});
