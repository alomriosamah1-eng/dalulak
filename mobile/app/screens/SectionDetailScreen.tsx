import { View, Text, FlatList, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { sections } from './SectionsGridScreen';
import type { Resource } from '../../shared/types';
import {
  learningData, youtubeData, workData, toolsData, testsData, aiData,
  designData, businessData, productivityData, marketingData, freelancingData,
  communitiesData, podcastsData, newslettersData, booksData, openSourceData,
} from '../../shared/data';

const dataMap: Record<string, Resource[]> = {
  learning: learningData, youtube: youtubeData, work: workData, tools: toolsData,
  tests: testsData, ai: aiData, design: designData, business: businessData,
  productivity: productivityData, marketing: marketingData, freelancing: freelancingData,
  communities: communitiesData, podcasts: podcastsData, newsletters: newslettersData,
  books: booksData, 'open-source': openSourceData,
};

interface SectionDetailScreenProps {
  route: { params: { sectionId: string } };
  navigation: { goBack: () => void };
}

export default function SectionDetailScreen({ route, navigation }: SectionDetailScreenProps) {
  const { sectionId } = route.params;
  const { colors } = useTheme();
  const section = sections.find(s => s.id === sectionId);
  const data = dataMap[sectionId] || [];

  if (!section) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>القسم غير موجود</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backText, { color: colors.primary }]}>رجوع</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>{section.title}</Text>
        <View style={styles.backButton} />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              const url = item.link || item.officialUrl;
              if (url) Linking.openURL(url);
            }}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
            {item.description && (
              <Text style={[styles.desc, { color: colors.textSecondary }]} numberOfLines={2}>
                {item.description}
              </Text>
            )}
            <View style={styles.metaRow}>
              {item.language && (
                <Text style={[styles.badge, { backgroundColor: colors.surface, color: colors.primary }]}>
                  {item.language}
                </Text>
              )}
              {item.level && (
                <Text style={[styles.badge, { backgroundColor: colors.surface, color: colors.accent }]}>
                  {item.level}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backButton: { width: 60 },
  backText: { fontSize: 16, fontWeight: '600' },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', flex: 1 },
  list: { padding: 12 },
  card: { padding: 16, borderRadius: 12, borderWidth: 1, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 6 },
  desc: { fontSize: 13, lineHeight: 20, marginBottom: 10 },
  metaRow: { flexDirection: 'row', gap: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, fontSize: 11, fontWeight: '600', overflow: 'hidden' },
});
