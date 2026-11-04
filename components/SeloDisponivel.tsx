import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

// Selo "Disponível" (verde) / "Emprestado" (vermelho) com um pontinho de status.
export function SeloDisponivel({ disponivel }: { disponivel: boolean }) {
  const cor = disponivel ? theme.colors.success : theme.colors.danger;

  return (
    <View
      style={[
        styles.selo,
        { backgroundColor: disponivel ? theme.colors.successSoft : theme.colors.dangerSoft },
      ]}
    >
      <View style={[styles.ponto, { backgroundColor: cor }]} />
      <Text style={[styles.texto, { color: cor }]}>
        {disponivel ? 'Disponível' : 'Emprestado'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  selo: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  ponto: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  texto: {
    fontSize: theme.fonts.tiny,
    fontWeight: '700',
  },
});
