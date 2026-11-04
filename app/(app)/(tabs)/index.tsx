import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Capa } from '../../../components/Capa';
import { ChipMovimento } from '../../../components/ChipMovimento';
import { SeloDisponivel } from '../../../components/SeloDisponivel';
import { theme } from '../../../constants/theme';
import { useAuth } from '../../../context/AuthContext';
import { livros, movimentos } from '../../../data/livros';

const TODOS = 'Todos';

// Rota / — Home com destaques, busca, filtro e a lista de livros.
export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { usuario } = useAuth();
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState(TODOS);

  const destaques = livros.filter((l) => l.disponivel);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return livros.filter(
      (l) =>
        (filtro === TODOS || l.movimento === filtro) &&
        (l.titulo.toLowerCase().includes(termo) || l.autor.toLowerCase().includes(termo)),
    );
  }, [busca, filtro]);

  // push: lista → detalhe, voltar faz sentido.
  const abrir = (id: number) => router.push(`/livro/${id}`);
  const mostrarDestaques = busca.trim() === '' && filtro === TODOS;

  return (
    <FlatList
      style={styles.tela}
      data={filtrados}
      keyExtractor={(livro) => String(livro.id)}
      contentContainerStyle={[styles.lista, { paddingTop: insets.top + theme.spacing.md }]}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={styles.cabecalho}>
          {/* Saudação */}
          <View style={styles.saudacao}>
            <View style={styles.saudacaoTextos}>
              <Text style={styles.ola}>Olá, {usuario}</Text>
              <Text style={styles.pergunta}>O que vamos ler hoje?</Text>
            </View>
            <Pressable style={styles.avatar} onPress={() => router.push('/perfil')}>
              <Text style={styles.avatarTexto}>{usuario?.charAt(0).toUpperCase()}</Text>
            </Pressable>
          </View>

          {/* Busca */}
          <View style={styles.busca}>
            <Ionicons name="search" size={18} color={theme.colors.muted} />
            <TextInput
              style={styles.buscaInput}
              placeholder="Buscar por título ou autor"
              placeholderTextColor={theme.colors.subtle}
              value={busca}
              onChangeText={setBusca}
              autoCorrect={false}
            />
            {busca ? (
              <Pressable onPress={() => setBusca('')} hitSlop={10}>
                <Ionicons name="close-circle" size={18} color={theme.colors.subtle} />
              </Pressable>
            ) : null}
          </View>

          {/* Destaques (só sem busca/filtro) */}
          {mostrarDestaques ? (
            <View>
              <View style={styles.secaoTopo}>
                <Text style={styles.secaoTitulo}>Disponíveis agora</Text>
                <Text style={styles.secaoInfo}>{destaques.length} livros</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carrossel}
                style={styles.sangria}
              >
                {destaques.map((livro) => (
                  <Pressable
                    key={livro.id}
                    onPress={() => abrir(livro.id)}
                    style={({ pressed }) => [styles.destaque, pressed && styles.pressionado]}
                  >
                    <Capa livro={livro} largura={124} style={styles.sombra} />
                    <Text style={styles.destaqueTitulo} numberOfLines={1}>
                      {livro.titulo}
                    </Text>
                    <Text style={styles.destaqueAutor} numberOfLines={1}>
                      {livro.autor}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          ) : null}

          {/* Filtro por movimento literário */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}
            style={styles.sangria}
          >
            {[TODOS, ...movimentos].map((m) => (
              <ChipMovimento key={m} rotulo={m} ativo={filtro === m} onPress={() => setFiltro(m)} />
            ))}
          </ScrollView>

          <View style={styles.secaoTopo}>
            <Text style={styles.secaoTitulo}>Acervo</Text>
            <Text style={styles.secaoInfo}>
              {filtrados.length} {filtrados.length === 1 ? 'livro' : 'livros'}
            </Text>
          </View>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.vazio}>
          <Ionicons name="search-outline" size={32} color={theme.colors.subtle} />
          <Text style={styles.vazioTitulo}>Nenhum livro encontrado</Text>
          <Text style={styles.vazioTexto}>Tente outro título, autor ou movimento.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => abrir(item.id)}
          style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
        >
          <Capa livro={item} largura={68} />
          <View style={styles.cardInfo}>
            <Text
              style={[styles.cardMovimento, { color: theme.movimentos[item.movimento] }]}
              numberOfLines={1}
            >
              {item.movimento}
            </Text>
            <Text style={styles.cardTitulo} numberOfLines={2}>
              {item.titulo}
            </Text>
            <Text style={styles.cardAutor} numberOfLines={1}>
              {item.autor} · {item.ano}
            </Text>
            <SeloDisponivel disponivel={item.disponivel} />
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.subtle} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  lista: {
    paddingHorizontal: theme.spacing.md + 4,
    paddingBottom: theme.spacing.xl,
    gap: theme.spacing.sm + 4,
  },
  cabecalho: {
    gap: theme.spacing.lg - 4,
    marginBottom: theme.spacing.xs,
  },
  saudacao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saudacaoTextos: {
    flex: 1,
    gap: 2,
  },
  ola: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
  },
  pergunta: {
    fontFamily: theme.fonts.serif,
    fontSize: theme.fonts.title,
    fontWeight: '700',
    color: theme.colors.text,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primarySoft,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTexto: {
    color: theme.colors.primary,
    fontSize: theme.fonts.heading,
    fontWeight: '700',
  },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + 2,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
  },
  buscaInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: theme.fonts.body,
    color: theme.colors.text,
  },
  secaoTopo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm + 4,
  },
  secaoTitulo: {
    fontSize: theme.fonts.heading,
    fontWeight: '700',
    color: theme.colors.text,
  },
  secaoInfo: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
  },
  // Faz os carrosséis encostarem nas bordas da tela.
  sangria: {
    marginHorizontal: -(theme.spacing.md + 4),
  },
  carrossel: {
    paddingHorizontal: theme.spacing.md + 4,
    gap: theme.spacing.md,
  },
  destaque: {
    width: 124,
    gap: 4,
  },
  sombra: {
    marginBottom: theme.spacing.xs,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  destaqueTitulo: {
    fontSize: theme.fonts.small,
    fontWeight: '700',
    color: theme.colors.text,
  },
  destaqueAutor: {
    fontSize: theme.fonts.tiny,
    color: theme.colors.muted,
  },
  chips: {
    paddingHorizontal: theme.spacing.md + 4,
    gap: theme.spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm + 4,
  },
  pressionado: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  cardMovimento: {
    fontSize: theme.fonts.tiny - 1,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardTitulo: {
    fontFamily: theme.fonts.serif,
    fontSize: theme.fonts.body + 1,
    fontWeight: '700',
    color: theme.colors.text,
  },
  cardAutor: {
    fontSize: theme.fonts.small - 1,
    color: theme.colors.muted,
    marginBottom: 4,
  },
  vazio: {
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.xl,
  },
  vazioTitulo: {
    fontSize: theme.fonts.body,
    fontWeight: '700',
    color: theme.colors.text,
  },
  vazioTexto: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
  },
});
