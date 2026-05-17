import React, { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday, isSameDay } from 'date-fns';
import { useTheme } from '../../src/hooks/useTheme';
import { ThemedText } from '../../src/components/ui/ThemedText';
import { Card } from '../../src/components/ui/Card';

type CalendarView = 'month' | 'week' | 'day' | 'agenda';

const mockEvents = [
  { id: '1', title: 'Deep Work Block', time: '09:00', duration: 120, color: '#7C5CF8', category: 'Focus' },
  { id: '2', title: 'Team Standup', time: '11:00', duration: 30, color: '#5C9CF8', category: 'Work' },
  { id: '3', title: 'Lunch & Walk', time: '13:00', duration: 60, color: '#5CF8C8', category: 'Health' },
  { id: '4', title: 'Product Review', time: '15:00', duration: 90, color: '#F8A85C', category: 'Work' },
  { id: '5', title: 'Evening Run', time: '18:00', duration: 45, color: '#F85CC8', category: 'Fitness' },
  { id: '6', title: 'Reading', time: '21:00', duration: 30, color: '#4CAF7D', category: 'Learning' },
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarScreen() {
  const { colors } = useTheme();
  const [view, setView] = useState<CalendarView>('month');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startOffset = getDay(monthStart);

  const navigateMonth = (dir: 1 | -1) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + dir);
    setCurrentMonth(newMonth);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText variant="hero" weight="bold">Calendar</ThemedText>
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

        {/* View Switcher */}
        <View style={styles.viewSwitcher}>
          {(['month', 'week', 'day', 'agenda'] as CalendarView[]).map((v) => (
            <Pressable
              key={v}
              onPress={() => setView(v)}
              style={[
                styles.viewTab,
                {
                  backgroundColor: view === v ? colors.primary : colors.glass,
                  borderColor: view === v ? colors.primary : colors.glassBorder,
                },
              ]}
            >
              <ThemedText
                variant="caption"
                weight="semibold"
                customColor={view === v ? '#fff' : colors.textSecondary}
                style={{ textTransform: 'capitalize' }}
              >
                {v}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <Pressable onPress={() => navigateMonth(-1)} style={styles.navBtn}>
            <ThemedText variant="body" customColor={colors.primary}>‹</ThemedText>
          </Pressable>
          <ThemedText variant="subheading" weight="semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </ThemedText>
          <Pressable onPress={() => navigateMonth(1)} style={styles.navBtn}>
            <ThemedText variant="body" customColor={colors.primary}>›</ThemedText>
          </Pressable>
        </View>

        {view === 'month' && (
          <Card padded={false} style={{ marginBottom: 20, overflow: 'hidden' }}>
            {/* Weekday headers */}
            <View style={styles.weekdayRow}>
              {WEEKDAYS.map((d) => (
                <View key={d} style={styles.weekdayCell}>
                  <ThemedText variant="micro" color="muted" weight="semibold">{d}</ThemedText>
                </View>
              ))}
            </View>

            {/* Day grid */}
            <View style={styles.dayGrid}>
              {Array.from({ length: startOffset }).map((_, i) => (
                <View key={`empty-${i}`} style={styles.dayCell} />
              ))}
              {days.map((day) => {
                const isSelected = isSameDay(day, selectedDate);
                const _isToday = isToday(day);
                return (
                  <Pressable
                    key={day.toISOString()}
                    onPress={() => setSelectedDate(day)}
                    style={[
                      styles.dayCell,
                      {
                        backgroundColor: isSelected
                          ? colors.primary
                          : _isToday
                          ? `${colors.primary}20`
                          : 'transparent',
                      },
                    ]}
                  >
                    <ThemedText
                      variant="caption"
                      weight={_isToday || isSelected ? 'bold' : 'regular'}
                      customColor={
                        isSelected ? '#fff' : _isToday ? colors.primary : colors.textSecondary
                      }
                    >
                      {format(day, 'd')}
                    </ThemedText>
                    {/* Event dot */}
                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary, marginTop: 2, opacity: isSelected ? 0 : 0.7 }} />
                  </Pressable>
                );
              })}
            </View>
          </Card>
        )}

        {/* Today's events */}
        <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 14 }}>
          {format(selectedDate, 'EEEE, MMM d')}
        </ThemedText>

        <View style={{ gap: 10 }}>
          {mockEvents.map((event) => (
            <EventRow key={event.id} event={event} />
          ))}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function EventRow({ event }: { event: (typeof mockEvents)[0] }) {
  const { colors } = useTheme();
  const [h, m] = event.time.split(':').map(Number);
  const endMin = h * 60 + m + event.duration;
  const endH = Math.floor(endMin / 60).toString().padStart(2, '0');
  const endM = (endMin % 60).toString().padStart(2, '0');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 12,
      }}
    >
      <View style={{ width: 48, alignItems: 'flex-end', paddingTop: 2 }}>
        <ThemedText variant="micro" color="muted">{event.time}</ThemedText>
      </View>
      <View style={{ width: 3, borderRadius: 2, backgroundColor: event.color, marginVertical: 2 }} />
      <View
        style={{
          flex: 1,
          backgroundColor: `${event.color}12`,
          borderRadius: 12,
          padding: 12,
          borderWidth: 1,
          borderColor: `${event.color}25`,
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <ThemedText variant="body" weight="semibold">{event.title}</ThemedText>
          <View
            style={{
              backgroundColor: `${event.color}25`,
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 6,
            }}
          >
            <ThemedText variant="micro" weight="semibold" customColor={event.color}>
              {event.category}
            </ThemedText>
          </View>
        </View>
        <ThemedText variant="caption" color="muted" style={{ marginTop: 3 }}>
          {event.time} – {endH}:{endM} · {event.duration} min
        </ThemedText>
      </View>
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
  viewSwitcher: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  viewTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2A3A',
  },
  weekdayCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  dayCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});
