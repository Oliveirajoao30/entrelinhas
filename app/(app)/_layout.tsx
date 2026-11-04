import { Redirect, Stack } from 'expo-router';
import { theme } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

// Grupo (app): telas de quem já está logado. Header com as cores do tema.
export default function AppLayout() {
  const { usuario } = useAuth();

  // Guarda na porta do grupo: sem sessão → login.
  if (!usuario) {
    return <Redirect href="/login" />;
  }

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
      {/* As abas desenham o próprio header */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Livros' }} />
      <Stack.Screen name="livro/[id]" options={{ title: '' }} />
    </Stack>
  );
}
