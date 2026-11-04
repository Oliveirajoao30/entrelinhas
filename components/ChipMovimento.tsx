import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';

type Props = {
  rotulo: string;
  ativo?: boolean;
  onPress?: () => void;
};

// Chip com a cor do movimento literário. Usado no filtro da Home e no detalhe.
export function ChipMovimento({ rotulo, ativo = false, onPress }: Props) {
  const cor = theme.movimentos[rotulo] ?? theme.colors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        styles.chip,
        ativo && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
      ]}
    >
      {rotulo !== 'Todos' && !ativo ? (
        <View style={[styles.ponto, { backgroundColor: cor }]} />
      ) : null}
      <Text style={[styles.texto, ativo && { color: theme.colors.onPrimary }]}>{rotulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  ponto: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  texto: {
    color: theme.colors.text,
    fontSize: theme.fonts.small,
    fontWeight: '600',
  },
});
