import React, { useState } from 'react';
import { ScrollView, View, TextInput, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../../src/hooks/useTheme';
import { useNotesStore } from '../../src/stores/useNotesStore';
import { ThemedText } from '../../src/components/ui/ThemedText';
import { Badge } from '../../src/components/ui/Badge';
import { formatDate } from '../../src/utils/date';

const folderColors: Record<string, string> = {
  Work: '#7C5CF8',
  Personal: '#5CF8C8',
  Ideas: '#F8A85C',
  Journal: '#F85CC8',
  Travel: '#5C9CF8',
  Learning: '#4CAF7D',
};

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useTheme();
  const { notes, updateNote, togglePin, toggleFavorite } = useNotesStore();
  const note = notes.find((n) => n.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note?.content ?? '');
  const [title, setTitle] = useState(note?.title ?? '');

  if (!note) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ThemedText variant="body" color="muted" style={{ padding: 20 }}>
          Note not found
        </ThemedText>
      </SafeAreaView>
    );
  }

  const color = folderColors[note.folder] ?? colors.primary;

  const handleSave = () => {
    updateNote(id, { title, content });
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={['top', 'bottom']}>
      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Pressable onPress={() => router.back()} style={styles.toolbarBtn}>
          <ThemedText variant="body" customColor={colors.primary}>← Back</ThemedText>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <Pressable onPress={() => togglePin(id)} style={styles.toolbarBtn}>
            <ThemedText variant="body">{note.isPinned ? '📌' : '📍'}</ThemedText>
          </Pressable>
          <Pressable onPress={() => toggleFavorite(id)} style={styles.toolbarBtn}>
            <ThemedText variant="body">{note.isFavorite ? '⭐' : '☆'}</ThemedText>
          </Pressable>
          <Pressable
            onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
            style={[styles.toolbarBtn, { backgroundColor: `${colors.primary}20`, paddingHorizontal: 14 }]}
          >
            <ThemedText variant="caption" weight="semibold" customColor={colors.primary}>
              {isEditing ? 'Save' : 'Edit'}
            </ThemedText>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Meta */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Badge label={note.folder} color={color} />
          {note.tags.map((tag) => (
            <View
              key={tag}
              style={{
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 6,
                backgroundColor: colors.glass,
                borderWidth: 1,
                borderColor: colors.glassBorder,
              }}
            >
              <ThemedText variant="micro" color="muted">#{tag}</ThemedText>
            </View>
          ))}
        </View>

        {/* Title */}
        {isEditing ? (
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={[styles.titleInput, { color: colors.textPrimary }]}
            multiline
          />
        ) : (
          <ThemedText variant="title" weight="bold" style={{ marginBottom: 8, lineHeight: 32 }}>
            {note.title}
          </ThemedText>
        )}

        <ThemedText variant="micro" color="muted" style={{ marginBottom: 20 }}>
          {formatDate(note.updatedAt)} · {note.wordCount} words
        </ThemedText>

        {/* Content */}
        {isEditing ? (
          <TextInput
            value={content}
            onChangeText={setContent}
            style={[styles.contentInput, { color: colors.textPrimary }]}
            multiline
            autoFocus
            textAlignVertical="top"
          />
        ) : (
          <ThemedText
            variant="body"
            color="secondary"
            style={{ lineHeight: 24, letterSpacing: 0.1 }}
          >
            {note.content.replace(/#+\s/g, '').replace(/\*\*/g, '')}
          </ThemedText>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#2A2A3A',
  },
  toolbarBtn: {
    borderRadius: 10,
    paddingVertical: 6,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 32,
  },
  contentInput: {
    fontSize: 15,
    lineHeight: 24,
    minHeight: 300,
  },
});
