import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';
import { useAuth } from '../../../context/AuthContext';
import { livros } from '../../../data/livros';

// Rota /perfil — dados do usuário e botão Sair.
export default function Perfil() {
  const router = useRouter();
  const { usuario, sair } = useAuth();
  const disponiveis = livros.filter((l) => l.disponivel).length;

  function handleSair() {
    sair(); // limpa a sessão
    router.replace('/login'); // replace: voltar não reabre a Home
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.inicial}>{usuario?.charAt(0).toUpperCase()}</Text>
      </View>
      <Text style={styles.nome}>{usuario}</Text>
      <Text style={styles.meta}>
        {disponiveis} de {livros.length} livros disponíveis
      </Text>

      <Pressable
        onPress={handleSair}
        style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
      >
        <Text style={styles.botaoTexto}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  inicial: {
    fontSize: theme.fonts.title + 4,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  nome: {
    fontSize: theme.fonts.title,
    fontWeight: '700',
    color: theme.colors.text,
  },
  meta: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
  },
  botao: {
    alignSelf: 'stretch',
    marginTop: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  pressionado: {
    opacity: 0.6,
  },
  botaoTexto: {
    fontSize: theme.fonts.body,
    fontWeight: '600',
    color: theme.colors.danger,
  },
});
