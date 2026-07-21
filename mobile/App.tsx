import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useThemeStore } from '../shared/store';
import { AppNavigator } from './navigation/AppNavigator';
import { ThemeProvider } from './context/ThemeContext';
import { StyleSheet } from 'react-native';

export default function App() {
  const { loadTheme, loaded } = useThemeStore();

  useEffect(() => {
    loadTheme();
  }, []);

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
