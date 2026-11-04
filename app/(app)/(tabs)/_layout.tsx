import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';

// Abas lado a lado; o Stack de (app) continua por fora (o detalhe abre por cima).
// Cada aba desenha o próprio cabeçalho, por isso headerShown: false.
export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.subtle,
        tabBarLabelStyle: { fontSize: theme.fonts.tiny - 1, lineHeight: 16, fontWeight: '600' },
        // Altura fixa + área segura (barra de gestos do celular).
        tabBarStyle: {
          height: 72 + insets.bottom,
          paddingTop: 6,
          paddingBottom: insets.bottom + 10,
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
        sceneStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? 'library' : 'library-outline'}
              color={focused ? theme.colors.primary : theme.colors.subtle}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              color={focused ? theme.colors.primary : theme.colors.subtle}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
