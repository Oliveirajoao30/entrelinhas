import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Capa } from '../../../components/Capa';
import { ChipMovimento } from '../../../components/ChipMovimento';
import { SeloDisponivel } from '../../../components/SeloDisponivel';
import { theme } from '../../../constants/theme';
import { capaUrl, livros, tempoLeitura } from '../../../data/livros';

type IconName = ComponentProps<typeof Ionicons>['name'];

// Rota /livro/3 — um único arquivo atende todos os livros.
export default function DetalheLivro() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [marcado, setMarcado] = useState(false);

  // O parâmetro chega como texto: '3' !== 3, por isso Number(id).
  const livro = livros.find((l) => l.id === Number(id));

  if (!livro) {
    return (
      <View style={[styles.vazio, { paddingTop: insets.top + 80 }]}>
        <Ionicons name="book-outline" size={40} color={theme.colors.subtle} />
        <Text style={styles.vazioTitulo}>Livro não encontrado</Text>
        <Text style={styles.vazioTexto}>Nenhum livro com o id {id}.</Text>
        <Pressable style={styles.botaoSecundario} onPress={() => router.back()}>
          <Text style={styles.botaoSecundarioTexto}>Voltar ao acervo</Text>
        </Pressable>
      </View>
    );
  }

  const blocos: { icone: IconName; valor: string; rotulo: string }[] = [
    { icone: 'calendar-outline', valor: String(livro.ano), rotulo: 'Publicação' },
    { icone: 'document-text-outline', valor: String(livro.paginas), rotulo: 'Páginas' },
    { icone: 'time-outline', valor: tempoLeitura(livro.paginas), rotulo: 'Leitura' },
  ];

  const ficha = [
    { rotulo: 'Autor', valor: livro.autor },
    { rotulo: 'Gênero', valor: livro.genero },
    { rotulo: 'Movimento', valor: livro.movimento },
  ];

  // Ação muda conforme a disponibilidade (estado só nesta tela).
  const acao = livro.disponivel
    ? marcado
      ? { texto: 'Reservado', icone: 'checkmark-circle' as IconName }
      : { texto: 'Reservar livro', icone: 'bookmark-outline' as IconName }
    : marcado
      ? { texto: 'Você será avisado', icone: 'checkmark-circle' as IconName }
      : { texto: 'Avisar quando voltar', icone: 'notifications-outline' as IconName };

  return (
    <View style={styles.tela}>
      <ScrollView contentContainerStyle={{ paddingBottom: theme.spacing.lg }}>
        {/* Topo: capa desfocada ao fundo + capa nítida no centro */}
        <View style={[styles.hero, { paddingTop: insets.top + 64 }]}>
          <Image
            source={{ uri: capaUrl(livro.capaId, 'M') }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            blurRadius={40}
          />
          <LinearGradient
            colors={[theme.colors.overlay, theme.colors.background]}
            style={StyleSheet.absoluteFill}
          />
          <Capa livro={livro} largura={170} tamanho="L" style={styles.capa} />
        </View>

        <View style={styles.corpo}>
          {/* Título e status */}
          <View style={styles.titulos}>
            <Text style={styles.titulo}>{livro.titulo}</Text>
            <Text style={styles.autor}>{livro.autor}</Text>
            <View style={styles.etiquetas}>
              <ChipMovimento rotulo={livro.movimento} />
              <SeloDisponivel disponivel={livro.disponivel} />
            </View>
          </View>

          {/* Blocos de informação */}
          <View style={styles.blocos}>
            {blocos.map((b, i) => (
              <View key={b.rotulo} style={[styles.bloco, i > 0 && styles.blocoDivisor]}>
                <Ionicons name={b.icone} size={18} color={theme.colors.primary} />
                <Text style={styles.blocoValor}>{b.valor}</Text>
                <Text style={styles.blocoRotulo}>{b.rotulo}</Text>
              </View>
            ))}
          </View>

          {/* Sinopse */}
          <View style={styles.cartao}>
            <Text style={styles.cartaoTitulo}>Sinopse</Text>
            <Text style={styles.sinopse}>{livro.sinopse}</Text>
          </View>

          {/* Ficha técnica */}
          <View style={styles.cartao}>
            <Text style={styles.cartaoTitulo}>Ficha técnica</Text>
            {ficha.map((f, i) => (
              <View key={f.rotulo} style={[styles.linha, i > 0 && styles.linhaDivisor]}>
                <Text style={styles.linhaRotulo}>{f.rotulo}</Text>
                <Text style={styles.linhaValor}>{f.valor}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Barra de ação fixa */}
      <View style={[styles.barra, { paddingBottom: insets.bottom + theme.spacing.md }]}>
        <Pressable
          onPress={() => setMarcado((v) => !v)}
          style={({ pressed }) => [
            styles.botao,
            marcado && styles.botaoMarcado,
            pressed && styles.pressionado,
          ]}
        >
          <Ionicons
            name={acao.icone}
            size={20}
            color={marcado ? theme.colors.success : theme.colors.onPrimary}
          />
          <Text style={[styles.botaoTexto, marcado && { color: theme.colors.success }]}>
            {acao.texto}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  hero: {
    alignItems: 'center',
    paddingBottom: theme.spacing.lg,
    overflow: 'hidden',
  },
  capa: {
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.7,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 16,
  },
  corpo: {
    paddingHorizontal: theme.spacing.md + 4,
    gap: theme.spacing.md,
  },
  titulos: {
    alignItems: 'center',
    gap: 6,
  },
  titulo: {
    textAlign: 'center',
    fontFamily: theme.fonts.serif,
    fontSize: theme.fonts.title + 2,
    fontWeight: '700',
    color: theme.colors.text,
  },
  autor: {
    fontSize: theme.fonts.body,
    color: theme.colors.muted,
  },
  etiquetas: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  blocos: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
  },
  bloco: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  blocoDivisor: {
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border,
  },
  blocoValor: {
    fontSize: theme.fonts.heading,
    fontWeight: '700',
    color: theme.colors.text,
  },
  blocoRotulo: {
    fontSize: theme.fonts.tiny,
    color: theme.colors.muted,
  },
  cartao: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md + 4,
    gap: theme.spacing.sm + 4,
  },
  cartaoTitulo: {
    fontSize: theme.fonts.tiny,
    fontWeight: '700',
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sinopse: {
    fontSize: theme.fonts.body,
    lineHeight: 25,
    color: theme.colors.text,
  },
  linha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    paddingTop: 2,
  },
  linhaDivisor: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm + 4,
  },
  linhaRotulo: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
  },
  linhaValor: {
    flexShrink: 1,
    textAlign: 'right',
    fontSize: theme.fonts.small,
    fontWeight: '600',
    color: theme.colors.text,
  },
  barra: {
    paddingHorizontal: theme.spacing.md + 4,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  botaoMarcado: {
    backgroundColor: theme.colors.successSoft,
    borderColor: theme.colors.success,
  },
  pressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  botaoTexto: {
    fontSize: theme.fonts.body,
    fontWeight: '700',
    color: theme.colors.onPrimary,
  },
  vazio: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  vazioTitulo: {
    fontSize: theme.fonts.heading,
    fontWeight: '700',
    color: theme.colors.text,
  },
  vazioTexto: {
    fontSize: theme.fonts.small,
    color: theme.colors.muted,
  },
  botaoSecundario: {
    marginTop: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm + 4,
    paddingHorizontal: theme.spacing.lg,
  },
  botaoSecundarioTexto: {
    color: theme.colors.text,
    fontWeight: '600',
  },
});
