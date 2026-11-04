import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { theme } from '../constants/theme';
import { AuthProvider } from '../context/AuthContext';

// Layout raiz: o AuthProvider envolve o app inteiro,
// e cada grupo ((auth) e (app)) desenha o próprio header.
export default function RootLayout() {
  return (
    <AuthProvider>
      {/* Texto claro na barra de status, combinando com o modo escuro */}
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </AuthProvider>
  );
}
