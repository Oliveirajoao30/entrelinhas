import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { theme } from '../constants/theme';
import { capaUrl, type Livro } from '../data/livros';

type Props = {
  livro: Livro;
  largura: number;
  tamanho?: 'M' | 'L';
  style?: StyleProp<ViewStyle>;
};

// Capa do livro vinda da Open Library Covers API.
// Por baixo fica sempre uma capa substituta (cor do movimento + título):
// ela aparece enquanto a imagem carrega e também se a API falhar.
// Se a capa grande (L) falhar, tenta a média (M) antes de desistir.
export function Capa({ livro, largura, tamanho = 'M', style }: Props) {
  const [tamanhoAtual, setTamanhoAtual] = useState<'M' | 'L' | null>(tamanho);
  const altura = Math.round(largura * 1.5); // proporção 2:3 de capa de livro
  const cor = theme.movimentos[livro.movimento] ?? theme.colors.primary;

  function handleErro() {
    setTamanhoAtual((atual) => (atual === 'L' ? 'M' : null));
  }

  return (
    <View style={[styles.moldura, { width: largura, height: altura }, style]}>
      <View style={[styles.substituta, { backgroundColor: cor }]}>
        <Text
          style={[styles.substitutaTexto, { fontSize: Math.max(11, largura / 9) }]}
          numberOfLines={4}
        >
          {livro.titulo}
        </Text>
      </View>

      {tamanhoAtual ? (
        <Image
          key={tamanhoAtual}
          source={{ uri: capaUrl(livro.capaId, tamanhoAtual) }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={300}
          cachePolicy="memory-disk"
          onError={handleErro}
          accessibilityLabel={`Capa de ${livro.titulo}`}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  moldura: {
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceAlt,
  },
  substituta: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    padding: theme.spacing.sm,
    justifyContent: 'flex-end',
  },
  substitutaTexto: {
    color: theme.colors.onPrimary,
    fontFamily: theme.fonts.serif,
    fontWeight: '700',
  },
});
