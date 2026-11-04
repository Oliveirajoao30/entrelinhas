import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

// Selo pequeno "Disponível" / "Emprestado".
export function SeloDisponivel({ disponivel }: { disponivel: boolean }) {
  return (
    <View style={[styles.selo, disponivel ? styles.livre : styles.ocupado]}>
      <Text
        style={[
          styles.texto,
          { color: disponivel ? theme.colors.primary : theme.colors.danger },
        ]}
      >
        {disponivel ? 'Disponível' : 'Emprestado'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  selo: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  livre: {
    backgroundColor: theme.colors.primarySoft,
  },
  ocupado: {
    backgroundColor: theme.colors.dangerSoft,
  },
  texto: {
    fontSize: 12,
    fontWeight: '600',
  },
});
