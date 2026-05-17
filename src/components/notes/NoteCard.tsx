import React from 'react';
import { View } from 'react-native';
import { Card } from '../ui/Card';
import { ThemedText } from '../ui/ThemedText';
import { Badge } from '../ui/Badge';
import { type Note } from '../../stores/useNotesStore';
import { useTheme } from '../../hooks/useTheme';
import { formatDate } from '../../utils/date';

const folderColors: Record<string, string> = {
  Work: '#7C5CF8',
  Personal: '#5CF8C8',
  Ideas: '#F8A85C',
  Journal: '#F85CC8',
  Travel: '#5C9CF8',
  Learning: '#4CAF7D',
};

interface NoteCardProps {
  note: Note;
  onPress?: () => void;
}

export function NoteCard({ note, onPress }: NoteCardProps) {
  const { colors } = useTheme();
  const color = folderColors[note.folder] ?? colors.primary;
  const preview = note.content.replace(/#+\s/g, '').replace(/\n/g, ' ').slice(0, 120);

  return (
    <Card onPress={onPress} style={{ marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            {note.isPinned && (
              <ThemedText variant="micro" color="muted">📌</ThemedText>
            )}
            {note.isFavorite && (
              <ThemedText variant="micro" color="muted">⭐</ThemedText>
            )}
            <Badge label={note.folder} color={color} />
          </View>
          <ThemedText variant="body" weight="semibold" style={{ marginBottom: 4 }}>
            {note.title}
          </ThemedText>
        </View>
        <ThemedText variant="micro" color="muted">
          {formatDate(note.updatedAt)}
        </ThemedText>
      </View>

      <ThemedText variant="caption" color="secondary" numberOfLines={2} style={{ lineHeight: 18, marginBottom: 10 }}>
        {preview}
      </ThemedText>

      <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
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
        <ThemedText variant="micro" color="muted" style={{ marginLeft: 'auto' }}>
          {note.wordCount} words
        </ThemedText>
      </View>
    </Card>
  );
}
