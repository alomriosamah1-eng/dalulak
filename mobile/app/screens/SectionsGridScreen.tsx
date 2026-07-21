import { Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import type { Resource } from '../../../shared/types';

interface SectionData {
  id: string;
  title: string;
  emoji: string;
  data: Resource[];
}

import {
  learningData, youtubeData, workData, toolsData, testsData, aiData,
  designData, businessData, productivityData, marketingData, freelancingData,
  communitiesData, podcastsData, newslettersData, booksData, openSourceData,
} from '../../../shared/data';

const sections: SectionData[] = [
  { id: 'learning', title: 'منصات التعلم المجانية', emoji: '📚', data: learningData },
  { id: 'youtube', title: 'قنوات يوتيوب تعليمية', emoji: '🎬', data: youtubeData },
  { id: 'work', title: 'منصات العمل عن بعد', emoji: '💼', data: workData },
  { id: 'tools', title: 'أدوات الإنتاج المجانية', emoji: '🔧', data: toolsData },
  { id: 'tests', title: 'منصات اختبارات وتقييم', emoji: '📝', data: testsData },
  { id: 'ai', title: 'الذكاء الاصطناعي', emoji: '🤖', data: aiData },
  { id: 'design', title: 'التصميم والإبداع', emoji: '🎨', data: designData },
  { id: 'business', title: 'إدارة الأعمال', emoji: '🏢', data: businessData },
  { id: 'productivity', title: 'الإنتاجية', emoji: '⚡', data: productivityData },
  { id: 'marketing', title: 'التسويق الرقمي', emoji: '📈', data: marketingData },
  { id: 'freelancing', title: 'العمل الحر', emoji: '🌍', data: freelancingData },
  { id: 'communities', title: 'المجتمعات', emoji: '👥', data: communitiesData },
  { id: 'podcasts', title: 'البودكاست', emoji: '🎧', data: podcastsData },
  { id: 'newsletters', title: 'النشرات البريدية', emoji: '📰', data: newslettersData },
  { id: 'books', title: 'الكتب', emoji: '📖', data: booksData },
  { id: 'open-source', title: 'المصادر المفتوحة', emoji: '🔓', data: openSourceData },
];

interface SectionsGridScreenProps {
  onNavigate: (sectionId: string) => void;
}

export default function SectionsGridScreen({ onNavigate }: SectionsGridScreenProps) {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>الأقسام</Text>
      <ScrollView contentContainerStyle={styles.grid}>
        {sections.map((section) => (
          <TouchableOpacity
            key={section.id}
            onPress={() => onNavigate(section.id)}
            style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <Text style={styles.emoji}>{section.emoji}</Text>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{section.title}</Text>
            <Text style={[styles.cardCount, { color: colors.muted }]}>
              {section.data.length} مورد
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export { sections };
export type { SectionData };

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', padding: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: 8, justifyContent: 'center' },
  card: {
    width: '45%',
    margin: 6,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  emoji: { fontSize: 32, marginBottom: 8 },
  cardTitle: { fontSize: 13, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  cardCount: { fontSize: 11 },
});
