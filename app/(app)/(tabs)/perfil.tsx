import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { theme } from '../../../constants/theme';
import { useAuth } from '../../../context/AuthContext';
import { livros, movimentos } from '../../../data/livros';

type IconName = ComponentProps<typeof Ionicons>['name'];

// Rota /perfil — dados do usuário, estatísticas do acervo e botão Sair.
export default function Perfil() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { usuario, sair } = useAuth();

  const disponiveis = livros.filter((l) => l.disponivel).length;
  const estatisticas: { icone: IconName; valor: number; rotulo: string; cor: string }[] = [
    { icone: 'library-outline', valor: livros.length, rotulo: 'Acervo', cor: theme.colors.primary },
    { icone: 'checkmark-circle-outline', valor: disponiveis, rotulo: 'Disponíveis', cor: theme.colors.success },
    { icone: 'time-outline', valor: livros.length - disponiveis, rotulo: 'Emprestados', cor: theme.colors.danger },
  ];

  function handleSair() {
    sair(); // limpa a sessão
    router.replace('/login'); // replace: voltar não reabre a Home
  }

  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={[styles.conteudo, { paddingTop: insets.top + theme.spacing.lg }]}
    >
      <LinearGradient
        colors={[theme.colors.primarySoft, theme.colors.transparent]}
        style={styles.brilho}
      />

      {/* Identificação */}
      <View style={styles.identidade}>
        <View style={styles.anel}>
          <View style={styles.avatar}>
            <Text style={styles.inicial}>{usuario?.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.nome}>{usuario}</Text>
        <View style={styles.membro}>
          <Ionicons name="bookmark" size={12} color={theme.colors.primary} />
          <Text style={styles.membroTexto}>Leitor do Entrelinhas</Text>
        </View>
      </View>

      {/* Estatísticas */}
      <View style={styles.estatisticas}>
        {estatisticas.map((e) => (
          <View key={e.rotulo} style={styles.estatistica}>
            <Ionicons name={e.icone} size={20} color={e.cor} />
            <Text style={styles.estatisticaValor}>{e.valor}</Text>
            <Text style={styles.estatisticaRotulo}>{e.rotulo}</Text>
          </View>
        ))}
      </View>

      {/* Acervo por movimento literário */}
      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Acervo por movimento</Text>
        {movimentos.map((m) => {
          const qtd = livros.filter((l) => l.movimento === m).length;
          const cor = theme.movimentos[m] ?? theme.colors.primary;
          return (
            <View key={m} style={styles.movimento}>
              <View style={styles.movimentoTopo}>
                <Text style={styles.movimentoNome}>{m}</Text>
                <Text style={styles.movimentoQtd}>{qtd}</Text>
              </View>
              <View style={styles.trilho}>
                <View
                  style={[styles.barra, { width: `${(qtd / livros.length) * 100}%`, backgroundColor: cor }]}
                />
              </View>
            </View>
          );
        })}
      </View>

      {/* Sobre */}
      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Sobre</Text>
        <View style={styles.sobreLinha}>
          <Ionicons name="image-outline" size={18} color={theme.colors.muted} />
          <Text style={styles.sobreTexto}>Capas fornecidas pela Open Library Covers API</Text>
        </View>
        <View style={styles.sobreLinha}>
          <Ionicons name="code-slash-outline" size={18} color={theme.colors.muted} />
          <Text style={styles.sobreTexto}>Feito com Expo Router</Text>
        </View>
      </View>

      {/* Sair */}
      <Pressable
        onPress={handleSair}
        style={({ pressed }) => [styles.sair, pressed && styles.pressionado]}
      >
        <Ionicons name="log-out-outline" size={20} color={theme.colors.danger} />
        <Text style={styles.sairTexto}>Sair da conta</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  conteudo: {
    paddingHorizontal: theme.spacing.md + 4,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  brilho: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
  },
  identidade: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  anel: {
    padding: 4,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: theme.colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inicial: {
    fontFamily: theme.fonts.serif,
    fontSize: 38,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  nome: {
    fontFamily: theme.fonts.serif,
    fontSize: theme.fonts.title,
    fontWeight: '700',
    color: theme.colors.text,
    textTransform: 'capitalize',
  },
  membro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.primarySoft,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  membroTexto: {
    fontSize: theme.fonts.tiny,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  estatisticas: {
    flexDirection: 'row',
    gap: theme.spacing.sm + 2,
  },
  estatistica: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
  },
  estatisticaValor: {
    fontSize: theme.fonts.title,
    fontWeight: '700',
    color: theme.colors.text,
  },
  estatisticaRotulo: {
    fontSize: theme.fonts.tiny,
    color: theme.colors.muted,
  },
  cartao: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md + 4,
    gap: theme.spacing.md,
  },
  cartaoTitulo: {
    fontSize: theme.fonts.tiny,
    fontWeight: '700',
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  movimento: {
    gap: 6,
  },
  movimentoTopo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movimentoNome: {
    fontSize: theme.fonts.small,
    color: theme.colors.text,
  },
  movimentoQtd: {
    fontSize: theme.fonts.small,
    fontWeight: '700',
    color: theme.colors.muted,
  },
  trilho: {
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.surfaceAlt,
    overflow: 'hidden',
  },
  barra: {
    height: '100%',
    borderRadius: 3,
  },
  sobreLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + 2,
  },
  sobreTexto: {
    flex: 1,
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
  },
  sair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.dangerSoft,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  pressionado: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  sairTexto: {
    fontSize: theme.fonts.body,
    fontWeight: '700',
    color: theme.colors.danger,
  },
});
