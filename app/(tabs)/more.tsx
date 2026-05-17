import React, { useState } from 'react';
import { ScrollView, View, Pressable, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/hooks/useTheme';
import { useAppStore } from '../../src/stores/useAppStore';
import { ThemedText } from '../../src/components/ui/ThemedText';
import { Card } from '../../src/components/ui/Card';
import { Separator } from '../../src/components/ui/Separator';

const businessIdeas = [
  { id: '1', title: 'Productivity App SaaS', status: 'In Progress', priority: 'High' },
  { id: '2', title: 'Digital Course on Productivity', status: 'Planning', priority: 'Medium' },
  { id: '3', title: 'Coaching Community', status: 'Idea', priority: 'Low' },
];

const trips = [
  { id: '1', destination: 'Japan', dates: 'Oct 2026', emoji: '🇯🇵', daysLeft: 165 },
  { id: '2', destination: 'Portugal', dates: 'Dec 2026', emoji: '🇵🇹', daysLeft: 230 },
];

const kpis = [
  { label: 'MRR', value: '€0', target: '€5,000', color: '#7C5CF8' },
  { label: 'Subscribers', value: '127', target: '1,000', color: '#5CF8C8' },
  { label: 'Content Pieces', value: '12', target: '52', color: '#F8A85C' },
  { label: 'Books Read', value: '9', target: '24', color: '#5C9CF8' },
];

type Section = 'business' | 'travel' | 'journal' | 'settings';

export default function MoreScreen() {
  const { colors } = useTheme();
  const { themeMode, setThemeMode } = useAppStore();
  const [activeSection, setActiveSection] = useState<Section>('business');
  const isDark = themeMode === 'dark';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ThemedText variant="hero" weight="bold" style={{ marginBottom: 20 }}>More</ThemedText>

        {/* Section tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
        >
          {[
            { key: 'business', label: '💼 Business', color: '#7C5CF8' },
            { key: 'travel', label: '✈️ Travel', color: '#5C9CF8' },
            { key: 'journal', label: '📔 Journal', color: '#F85CC8' },
            { key: 'settings', label: '⚙️ Settings', color: '#9090B0' },
          ].map((s) => {
            const isActive = activeSection === s.key;
            return (
              <Pressable
                key={s.key}
                onPress={() => setActiveSection(s.key as Section)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 100,
                  backgroundColor: isActive ? s.color : `${s.color}15`,
                  borderWidth: 1,
                  borderColor: isActive ? s.color : `${s.color}30`,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  customColor={isActive ? '#fff' : s.color}
                >
                  {s.label}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Business Section */}
        {activeSection === 'business' && (
          <>
            {/* KPIs */}
            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>KPI Dashboard</ThemedText>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {kpis.map((kpi) => (
                  <View
                    key={kpi.label}
                    style={{
                      width: '47%',
                      backgroundColor: `${kpi.color}10`,
                      borderRadius: 14,
                      padding: 14,
                      borderWidth: 1,
                      borderColor: `${kpi.color}20`,
                    }}
                  >
                    <ThemedText variant="caption" color="muted" style={{ marginBottom: 4 }}>{kpi.label}</ThemedText>
                    <ThemedText variant="subheading" weight="bold" customColor={kpi.color}>{kpi.value}</ThemedText>
                    <ThemedText variant="micro" color="muted">→ {kpi.target}</ThemedText>
                  </View>
                ))}
              </View>
            </Card>

            {/* Business Ideas */}
            <Card style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <ThemedText variant="subheading" weight="semibold">Business Ideas</ThemedText>
                <Pressable>
                  <ThemedText variant="caption" customColor={colors.primary}>+ Add</ThemedText>
                </Pressable>
              </View>
              {businessIdeas.map((idea) => (
                <View
                  key={idea.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="body" weight="semibold">{idea.title}</ThemedText>
                    <ThemedText variant="caption" color="muted" style={{ marginTop: 2 }}>{idea.status}</ThemedText>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                      backgroundColor:
                        idea.priority === 'High' ? `${colors.error}20` :
                        idea.priority === 'Medium' ? `${colors.warning}20` : `${colors.textMuted}20`,
                    }}
                  >
                    <ThemedText
                      variant="micro"
                      weight="semibold"
                      customColor={
                        idea.priority === 'High' ? colors.error :
                        idea.priority === 'Medium' ? colors.warning : colors.textMuted
                      }
                    >
                      {idea.priority}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </Card>

            {/* Content Pipeline */}
            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>
                🎬 Content Pipeline
              </ThemedText>
              {['My Full Personal OS Tour', 'How I Plan My Year', 'Morning Routine 2026'].map((title, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingVertical: 10,
                    borderBottomWidth: i < 2 ? StyleSheet.hairlineWidth : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 10,
                      backgroundColor: `${colors.primary}15`,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ThemedText variant="caption">▶</ThemedText>
                  </View>
                  <ThemedText variant="body" weight="medium" style={{ flex: 1 }}>{title}</ThemedText>
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 3,
                      borderRadius: 6,
                      backgroundColor: `${colors.accent}20`,
                    }}
                  >
                    <ThemedText variant="micro" customColor={colors.accent} weight="semibold">Idea</ThemedText>
                  </View>
                </View>
              ))}
            </Card>
          </>
        )}

        {/* Travel Section */}
        {activeSection === 'travel' && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>Upcoming Trips</ThemedText>
              {trips.map((trip) => (
                <View
                  key={trip.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    paddingVertical: 14,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 16,
                      backgroundColor: `${colors.primary}15`,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ThemedText style={{ fontSize: 28 }}>{trip.emoji}</ThemedText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="subheading" weight="semibold">{trip.destination}</ThemedText>
                    <ThemedText variant="caption" color="muted">{trip.dates}</ThemedText>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <ThemedText variant="title" weight="bold" customColor={colors.primary}>
                      {trip.daysLeft}
                    </ThemedText>
                    <ThemedText variant="micro" color="muted">days away</ThemedText>
                  </View>
                </View>
              ))}
            </Card>

            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>
                🇯🇵 Japan Packing List
              </ThemedText>
              {[
                { item: 'Passport & visa', done: true },
                { item: 'IC Suica card', done: false },
                { item: 'Travel adapter', done: true },
                { item: 'Pocket WiFi', done: false },
                { item: 'JR Pass', done: false },
              ].map((p, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    paddingVertical: 8,
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: p.done ? colors.success : colors.border,
                      backgroundColor: p.done ? colors.success : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {p.done && <ThemedText variant="micro" customColor="#fff">✓</ThemedText>}
                  </View>
                  <ThemedText
                    variant="body"
                    style={{ opacity: p.done ? 0.5 : 1, textDecorationLine: p.done ? 'line-through' : 'none' }}
                  >
                    {p.item}
                  </ThemedText>
                </View>
              ))}
            </Card>
          </>
        )}

        {/* Journal Section */}
        {activeSection === 'journal' && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 6 }}>
                Today's Journal
              </ThemedText>
              <ThemedText variant="caption" color="muted" style={{ marginBottom: 16 }}>
                Reflect on your day
              </ThemedText>

              <JournalSection emoji="🏆" title="Today's Wins" placeholder="What went well today?" />
              <Separator spacing={16} />
              <JournalSection emoji="📚" title="Lessons Learned" placeholder="What did you learn?" />
              <Separator spacing={16} />
              <JournalSection emoji="🙏" title="Gratitude" placeholder="What are you grateful for?" />
            </Card>

            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>Recent Entries</ThemedText>
              {[
                { date: 'May 16', mood: 8, summary: 'Completed the app wireframes. Great energy day.' },
                { date: 'May 15', mood: 7, summary: 'Good day overall. Finished 3 sales calls.' },
                { date: 'May 14', mood: 9, summary: 'Best day this week. Launched new feature!' },
              ].map((entry, i) => (
                <View
                  key={i}
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                    paddingVertical: 12,
                    borderBottomWidth: i < 2 ? StyleSheet.hairlineWidth : 0,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      backgroundColor: `${colors.primary}15`,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <ThemedText variant="subheading">
                      {entry.mood >= 8 ? '🤩' : entry.mood >= 6 ? '😊' : '🙂'}
                    </ThemedText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                      <ThemedText variant="body" weight="semibold">{entry.date}</ThemedText>
                      <ThemedText variant="caption" customColor={colors.primary} weight="semibold">
                        {entry.mood}/10
                      </ThemedText>
                    </View>
                    <ThemedText variant="caption" color="muted" numberOfLines={2}>
                      {entry.summary}
                    </ThemedText>
                  </View>
                </View>
              ))}
            </Card>
          </>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <>
            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>Appearance</ThemedText>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <ThemedText style={{ fontSize: 22 }}>🌙</ThemedText>
                  <View>
                    <ThemedText variant="body" weight="semibold">Dark Mode</ThemedText>
                    <ThemedText variant="caption" color="muted">Premium dark experience</ThemedText>
                  </View>
                </View>
                <Switch
                  value={isDark}
                  onValueChange={(v) => setThemeMode(v ? 'dark' : 'light')}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor="#fff"
                />
              </View>
            </Card>

            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>Data & Privacy</ThemedText>
              {[
                { icon: '💾', title: 'Export Data', subtitle: 'Export as JSON backup', action: true },
                { icon: '📥', title: 'Import Data', subtitle: 'Restore from backup', action: true },
                { icon: '🔒', title: 'Biometric Lock', subtitle: 'Coming soon', action: false },
              ].map((item, i) => (
                <Pressable
                  key={i}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 14,
                    paddingVertical: 13,
                    borderBottomWidth: i < 2 ? StyleSheet.hairlineWidth : 0,
                    borderBottomColor: colors.border,
                    opacity: item.action ? 1 : 0.4,
                  }}
                >
                  <ThemedText style={{ fontSize: 22 }}>{item.icon}</ThemedText>
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="body" weight="semibold">{item.title}</ThemedText>
                    <ThemedText variant="caption" color="muted">{item.subtitle}</ThemedText>
                  </View>
                  {item.action && <ThemedText color="muted">›</ThemedText>}
                </Pressable>
              ))}
            </Card>

            <Card style={{ marginBottom: 16 }}>
              <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>About</ThemedText>
              <View style={{ gap: 10 }}>
                <Row label="App Version" value="1.0.0" />
                <Row label="Storage" value="100% Local" />
                <Row label="Cloud Sync" value="Off" />
                <Row label="Analytics" value="None" />
              </View>
            </Card>
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <ThemedText variant="body" color="secondary">{label}</ThemedText>
      <ThemedText variant="body" weight="medium">{value}</ThemedText>
    </View>
  );
}

function JournalSection({ emoji, title, placeholder }: { emoji: string; title: string; placeholder: string }) {
  const { colors } = useTheme();
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <ThemedText style={{ fontSize: 18 }}>{emoji}</ThemedText>
        <ThemedText variant="body" weight="semibold">{title}</ThemedText>
      </View>
      <View
        style={{
          backgroundColor: colors.surface,
          borderRadius: 10,
          padding: 12,
          minHeight: 60,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <ThemedText variant="body" color="muted">{placeholder}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingTop: 16 },
});
