import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import type { Resource } from '../../shared/types';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const { colors } = useTheme();
  const url = resource.link || resource.officialUrl;

  const handlePress = () => {
    if (url) Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
    >
      <Text style={[styles.name, { color: colors.text }]}>{resource.name}</Text>
      {resource.description && (
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={2}>
          {resource.description}
        </Text>
      )}
      <View style={styles.metaRow}>
        {resource.language && (
          <Text style={[styles.badge, { backgroundColor: colors.surface, color: colors.primary }]}>
            {resource.language}
          </Text>
        )}
        {resource.level && (
          <Text style={[styles.badge, { backgroundColor: colors.surface, color: colors.accent }]}>
            {resource.level}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  description: { fontSize: 13, lineHeight: 20, marginBottom: 10 },
  metaRow: { flexDirection: 'row', gap: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontSize: 11, fontWeight: '600', overflow: 'hidden' },
});
