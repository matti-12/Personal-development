import React, { useState } from 'react';
import { ScrollView, View, Pressable, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '../../src/hooks/useTheme';
import { useNotesStore, type NoteFolder } from '../../src/stores/useNotesStore';
import { ThemedText } from '../../src/components/ui/ThemedText';
import { NoteCard } from '../../src/components/notes/NoteCard';

const folders: (NoteFolder | 'All')[] = ['All', 'Personal', 'Work', 'Ideas', 'Journal', 'Travel', 'Learning'];

const folderColors: Record<string, string> = {
  All: '#7C5CF8',
  Work: '#7C5CF8',
  Personal: '#5CF8C8',
  Ideas: '#F8A85C',
  Journal: '#F85CC8',
  Travel: '#5C9CF8',
  Learning: '#4CAF7D',
};

export default function NotesScreen() {
  const { colors } = useTheme();
  const { notes, searchQuery, setSearchQuery, activeFolder, setActiveFolder } = useNotesStore();
  const router = useRouter();

  const filtered = notes.filter((n) => {
    const matchFolder = activeFolder === 'All' || n.folder === activeFolder;
    const matchSearch =
      searchQuery === '' ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchFolder && matchSearch;
  });

  const pinned = filtered.filter((n) => n.isPinned);
  const unpinned = filtered.filter((n) => !n.isPinned);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <ThemedText variant="hero" weight="bold">Notes</ThemedText>
            <ThemedText variant="caption" color="muted" style={{ marginTop: 4 }}>
              {notes.length} notes · {notes.filter((n) => n.isFavorite).length} favorites
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

        {/* Search bar */}
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <ThemedText variant="body" color="muted" style={{ marginRight: 8 }}>🔍</ThemedText>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search notes..."
            placeholderTextColor={colors.textMuted}
            style={{
              flex: 1,
              color: colors.textPrimary,
              fontSize: 15,
            }}
          />
          {searchQuery !== '' && (
            <Pressable onPress={() => setSearchQuery('')}>
              <ThemedText variant="caption" color="muted">✕</ThemedText>
            </Pressable>
          )}
        </View>

        {/* Folder filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
          contentContainerStyle={{ gap: 8, paddingRight: 16 }}
        >
          {folders.map((folder) => {
            const isActive = activeFolder === folder;
            const color = folderColors[folder];
            return (
              <Pressable
                key={folder}
                onPress={() => setActiveFolder(folder)}
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
                  {folder}
                </ThemedText>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Pinned notes */}
        {pinned.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <ThemedText variant="caption" color="muted" weight="semibold">📌 PINNED</ThemedText>
            </View>
            {pinned.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onPress={() => router.push(`/note/${note.id}`)}
              />
            ))}
            {unpinned.length > 0 && (
              <View style={[styles.sectionHeader, { marginTop: 8 }]}>
                <ThemedText variant="caption" color="muted" weight="semibold">ALL NOTES</ThemedText>
              </View>
            )}
          </>
        )}

        {/* All notes */}
        {unpinned.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onPress={() => router.push(`/note/${note.id}`)}
          />
        ))}

        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 60 }}>
            <ThemedText style={{ fontSize: 48, marginBottom: 12 }}>📝</ThemedText>
            <ThemedText variant="subheading" weight="semibold" style={{ marginBottom: 8 }}>
              No notes found
            </ThemedText>
            <ThemedText variant="body" color="muted" style={{ textAlign: 'center' }}>
              {searchQuery ? 'Try a different search' : 'Create your first note'}
            </ThemedText>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionHeader: {
    marginBottom: 10,
    paddingHorizontal: 4,
  },
});
