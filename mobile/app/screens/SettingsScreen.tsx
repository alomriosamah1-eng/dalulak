import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { useThemeStore } from '../../shared/store';

const themes = [
  { key: 'dark' as const, label: 'داكن', emoji: '🌙' },
  { key: 'light' as const, label: 'فاتح', emoji: '☀️' },
  { key: 'amoled' as const, label: 'أموليد', emoji: '🖤' },
];

export default function SettingsScreen() {
  const { colors } = useTheme();
  const { theme, setTheme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>الإعدادات</Text>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>المظهر</Text>
        <View style={styles.themeRow}>
          {themes.map((t) => (
            <TouchableOpacity
              key={t.key}
              onPress={() => setTheme(t.key)}
              style={[
                styles.themeButton,
                {
                  backgroundColor: colors.card,
                  borderColor: theme === t.key ? colors.primary : colors.border,
                  borderWidth: theme === t.key ? 2 : 1,
                },
              ]}
            >
              <Text style={styles.themeEmoji}>{t.emoji}</Text>
              <Text style={[styles.themeLabel, { color: colors.text }]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={[styles.footer, { color: colors.muted }]}>
          دليلك التعليمي والعملي v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, marginTop: 16 },
  themeRow: { flexDirection: 'row', gap: 12, justifyContent: 'center' },
  themeButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: 100,
  },
  themeEmoji: { fontSize: 28, marginBottom: 8 },
  themeLabel: { fontSize: 12, fontWeight: '600' },
  footer: { textAlign: 'center', marginTop: 40, fontSize: 12 },
});
