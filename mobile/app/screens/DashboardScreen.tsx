import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { totalResources, sectionCounts } from '../../shared/data';

export default function DashboardScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>دليلك التعليمي والعملي</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          إجمالي الموارد: {totalResources}
        </Text>
        <View style={styles.statsGrid}>
          {Object.entries(sectionCounts).map(([key, count]) => (
            <View key={key} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={[styles.statCount, { color: colors.primary }]}>{count}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{key}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 24 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  statCard: {
    width: '30%',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 8,
  },
  statCount: { fontSize: 20, fontWeight: 'bold' },
  statLabel: { fontSize: 10, marginTop: 4 },
});
