import React from 'react';
import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useAppStore } from '../../src/stores/useAppStore';
import { Colors } from '../../src/theme/colors';

function TabIcon({ emoji, focused, color }: { emoji: string; focused: boolean; color: string }) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: focused ? `${color}20` : 'transparent',
      }}
    >
      <View style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
        {/* Emoji rendered as text */}
      </View>
    </View>
  );
}

export default function TabLayout() {
  const themeMode = useAppStore((s) => s.themeMode);
  const colors = Colors[themeMode];

  const tabBarStyle = {
    backgroundColor: themeMode === 'dark' ? 'rgba(12,12,20,0.95)' : 'rgba(245,245,250,0.95)',
    borderTopColor: colors.border,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 28 : 10,
    paddingTop: 8,
    elevation: 0,
    shadowOpacity: 0,
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: tabBarStyle,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <TabBarEmoji emoji="⚡" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'Goals',
          tabBarIcon: ({ focused, color }) => (
            <TabBarEmoji emoji="🎯" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused, color }) => (
            <TabBarEmoji emoji="📅" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Notes',
          tabBarIcon: ({ focused, color }) => (
            <TabBarEmoji emoji="📝" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          tabBarIcon: ({ focused, color }) => (
            <TabBarEmoji emoji="📊" focused={focused} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ focused, color }) => (
            <TabBarEmoji emoji="⋯" focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabBarEmoji({ emoji, focused, color }: { emoji: string; focused: boolean; color: string }) {
  const { View, Text } = require('react-native');
  return (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: 10,
        backgroundColor: focused ? `${color}20` : 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.55 }}>{emoji}</Text>
    </View>
  );
}
