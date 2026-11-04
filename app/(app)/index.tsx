import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';
import { livros } from '../../data/livros';

// Rota / — Home.
export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{livros.length} livros no acervo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  texto: {
    fontSize: theme.fonts.body,
    color: theme.colors.muted,
  },
});
