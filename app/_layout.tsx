import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Layout raiz: cada grupo ((auth) e (app)) desenha o próprio header.
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
