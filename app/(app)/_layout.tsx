import { Stack } from 'expo-router';
import { theme } from '../../constants/theme';

// Grupo (app): telas de quem já está logado. Header com as cores do tema.
export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.background },
        headerTintColor: theme.colors.text,
        headerTitleStyle: { fontWeight: '600' },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Livros' }} />
    </Stack>
  );
}
