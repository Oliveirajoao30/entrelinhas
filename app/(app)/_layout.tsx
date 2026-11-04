import { Ionicons } from '@expo/vector-icons';
import { Redirect, Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { theme } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

// Grupo (app): telas de quem já está logado. Header com as cores do tema.
export default function AppLayout() {
  const { usuario } = useAuth();
  const router = useRouter();

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
      <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Início' }} />
      {/* Detalhe: header transparente sobre a capa, com botão voltar redondo */}
      <Stack.Screen
        name="livro/[id]"
        options={{
          title: '',
          headerTransparent: true,
          headerStyle: { backgroundColor: theme.colors.transparent },
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.voltar} hitSlop={8}>
              <Ionicons name="chevron-back" size={22} color={theme.colors.text} />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  voltar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.overlay,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
