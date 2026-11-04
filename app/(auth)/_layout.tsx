import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

// Grupo (auth): telas de quem ainda não entrou.
export default function AuthLayout() {
  const { usuario } = useAuth();

  // Já está logado? Não faz sentido ver o login de novo.
  if (usuario) {
    return <Redirect href="/" />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
