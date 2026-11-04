import { Stack } from 'expo-router';

// Grupo (auth): telas de quem ainda não entrou.
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
