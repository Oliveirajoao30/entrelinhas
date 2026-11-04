import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SeloDisponivel } from '../../components/SeloDisponivel';
import { theme } from '../../constants/theme';
import { livros } from '../../data/livros';

// Rota / — Home com a lista de livros.
export default function Home() {
  const router = useRouter();

  return (
    <FlatList
      data={livros}
      keyExtractor={(livro) => String(livro.id)}
      contentContainerStyle={styles.lista}
      ListHeaderComponent={
        <Text style={styles.contador}>{livros.length} livros no acervo</Text>
      }
      renderItem={({ item }) => (
        <Pressable
          // push: na lista → detalhe, voltar faz sentido.
          onPress={() => router.push(`/livro/${item.id}`)}
          style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
        >
          <View style={styles.info}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.autor}>{item.autor}</Text>
          </View>
          <SeloDisponivel disponivel={item.disponivel} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    padding: theme.spacing.md,
    gap: theme.spacing.sm + 4,
  },
  contador: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
    marginBottom: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    padding: theme.spacing.md,
    gap: theme.spacing.sm + 4,
  },
  pressionado: {
    opacity: 0.6,
  },
  info: {
    gap: 4,
  },
  titulo: {
    fontSize: theme.fonts.body,
    fontWeight: '600',
    color: theme.colors.text,
  },
  autor: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
  },
});
