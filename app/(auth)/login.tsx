import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Capa } from '../../components/Capa';
import { theme } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';
import { livros } from '../../data/livros';

// Credencial fixa da atividade (não há backend).
const USUARIO_VALIDO = 'aluno';
const SENHA_VALIDA = '123';

// Três capas em leque para ilustrar o topo do login.
const capasDoLeque = [livros[0], livros[2], livros[5]];

// Rota /login — o grupo (auth) não aparece na URL.
export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { entrar } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [campoAtivo, setCampoAtivo] = useState<'usuario' | 'senha' | null>(null);

  function handleEntrar() {
    if (usuario.trim() === USUARIO_VALIDO && senha === SENHA_VALIDA) {
      entrar(usuario.trim());
      // replace (e não push): o botão voltar não retorna ao login.
      router.replace('/');
    } else {
      setErro('Usuário ou senha inválidos.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.tela}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Brilho âmbar no topo */}
      <LinearGradient
        colors={[theme.colors.primarySoft, theme.colors.transparent]}
        style={styles.brilho}
      />

      <ScrollView
        contentContainerStyle={[
          styles.conteudo,
          { paddingTop: insets.top + theme.spacing.xl, paddingBottom: insets.bottom + theme.spacing.lg },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* Capas em leque */}
        <View style={styles.leque}>
          <Capa livro={capasDoLeque[0]} largura={84} style={[styles.capaLado, styles.capaEsquerda]} />
          <Capa livro={capasDoLeque[2]} largura={84} style={[styles.capaLado, styles.capaDireita]} />
          <Capa livro={capasDoLeque[1]} largura={104} style={styles.capaCentro} />
        </View>

        {/* Marca */}
        <View style={styles.marca}>
          <View style={styles.logo}>
            <Ionicons name="bookmark" size={18} color={theme.colors.onPrimary} />
          </View>
          <Text style={styles.nomeApp}>Entrelinhas</Text>
        </View>
        <Text style={styles.subtitulo}>Clássicos da literatura brasileira na palma da mão.</Text>

        {/* Formulário */}
        <View style={styles.cartao}>
          <Text style={styles.rotulo}>Usuário</Text>
          <View style={[styles.campo, campoAtivo === 'usuario' && styles.campoAtivo]}>
            <Ionicons name="person-outline" size={18} color={theme.colors.muted} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu usuário"
              placeholderTextColor={theme.colors.subtle}
              autoCapitalize="none"
              autoCorrect={false}
              value={usuario}
              onFocus={() => setCampoAtivo('usuario')}
              onBlur={() => setCampoAtivo(null)}
              onChangeText={(texto) => {
                setUsuario(texto);
                setErro('');
              }}
            />
          </View>

          <Text style={styles.rotulo}>Senha</Text>
          <View style={[styles.campo, campoAtivo === 'senha' && styles.campoAtivo]}>
            <Ionicons name="lock-closed-outline" size={18} color={theme.colors.muted} />
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor={theme.colors.subtle}
              secureTextEntry={!mostrarSenha}
              value={senha}
              onFocus={() => setCampoAtivo('senha')}
              onBlur={() => setCampoAtivo(null)}
              onChangeText={(texto) => {
                setSenha(texto);
                setErro('');
              }}
              onSubmitEditing={handleEntrar}
            />
            <Pressable onPress={() => setMostrarSenha((v) => !v)} hitSlop={10}>
              <Ionicons
                name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                size={18}
                color={theme.colors.muted}
              />
            </Pressable>
          </View>

          {erro ? (
            <View style={styles.erro}>
              <Ionicons name="alert-circle" size={16} color={theme.colors.danger} />
              <Text style={styles.erroTexto}>{erro}</Text>
            </View>
          ) : null}

          <Pressable
            onPress={handleEntrar}
            style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
          >
            <Text style={styles.botaoTexto}>Entrar</Text>
            <Ionicons name="arrow-forward" size={18} color={theme.colors.onPrimary} />
          </Pressable>
        </View>

        <Text style={styles.dica}>
          Acesso de teste: <Text style={styles.dicaDestaque}>aluno</Text> /{' '}
          <Text style={styles.dicaDestaque}>123</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  brilho: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 380,
  },
  conteudo: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
  },
  leque: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.lg,
  },
  capaCentro: {
    position: 'absolute',
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  capaLado: {
    position: 'absolute',
    opacity: 0.75,
  },
  capaEsquerda: {
    transform: [{ translateX: -62 }, { rotate: '-12deg' }],
  },
  capaDireita: {
    transform: [{ translateX: 62 }, { rotate: '12deg' }],
  },
  marca: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm + 2,
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nomeApp: {
    fontFamily: theme.fonts.serif,
    fontSize: theme.fonts.hero,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitulo: {
    textAlign: 'center',
    fontSize: theme.fonts.body,
    color: theme.colors.muted,
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  cartao: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg - 4,
    gap: theme.spacing.sm,
  },
  rotulo: {
    fontSize: theme.fonts.tiny,
    fontWeight: '700',
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: theme.spacing.xs,
  },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm + 2,
    backgroundColor: theme.colors.surfaceAlt,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
  },
  campoAtivo: {
    borderColor: theme.colors.primary,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: theme.fonts.body,
    color: theme.colors.text,
  },
  erro: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.dangerSoft,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.sm + 2,
    marginTop: theme.spacing.xs,
  },
  erroTexto: {
    color: theme.colors.danger,
    fontSize: theme.fonts.small,
    fontWeight: '600',
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  pressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  botaoTexto: {
    color: theme.colors.onPrimary,
    fontSize: theme.fonts.body,
    fontWeight: '700',
  },
  dica: {
    textAlign: 'center',
    color: theme.colors.subtle,
    fontSize: theme.fonts.small,
    marginTop: theme.spacing.lg,
  },
  dicaDestaque: {
    color: theme.colors.muted,
    fontWeight: '700',
  },
});
