import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SeloDisponivel } from '../../../components/SeloDisponivel';
import { theme } from '../../../constants/theme';
import { livros } from '../../../data/livros';

// Rota /livro/3 — um único arquivo atende todos os livros.
export default function DetalheLivro() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // O parâmetro chega como texto: '3' !== 3, por isso Number(id).
  const livro = livros.find((l) => l.id === Number(id));

  if (!livro) {
    return (
      <View style={styles.vazio}>
        <Stack.Screen options={{ title: 'Não encontrado' }} />
        <Text style={styles.titulo}>Livro não encontrado</Text>
        <Text style={styles.meta}>Nenhum livro com o id {id}.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: '' }} />

      <Text style={styles.titulo}>{livro.titulo}</Text>
      <Text style={styles.autor}>{livro.autor}</Text>

      <Text style={styles.meta}>
        {livro.ano} · {livro.genero} · {livro.paginas} páginas
      </Text>

      <SeloDisponivel disponivel={livro.disponivel} />

      <View style={styles.divisor} />

      <Text style={styles.secao}>Sinopse</Text>
      <Text style={styles.sinopse}>{livro.sinopse}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  vazio: {
    flex: 1,
    padding: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  titulo: {
    fontSize: theme.fonts.title + 4,
    fontWeight: '700',
    color: theme.colors.text,
  },
  autor: {
    fontSize: theme.fonts.body,
    color: theme.colors.text,
  },
  meta: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
    marginBottom: theme.spacing.sm,
  },
  divisor: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  secao: {
    fontSize: theme.fonts.small,
    fontWeight: '600',
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sinopse: {
    fontSize: theme.fonts.body,
    lineHeight: 26,
    color: theme.colors.text,
  },
});
