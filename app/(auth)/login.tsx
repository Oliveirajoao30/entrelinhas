import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../../constants/theme';
import { useAuth } from '../../context/AuthContext';

// Credencial fixa da atividade (não há backend).
const USUARIO_VALIDO = 'aluno';
const SENHA_VALIDA = '123';

// Rota /login — o grupo (auth) não aparece na URL.
export default function Login() {
  const router = useRouter();
  const { entrar } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.form}>
        <Text style={styles.titulo}>Biblioteca</Text>
        <Text style={styles.subtitulo}>Entre para ver o acervo</Text>

        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor={theme.colors.muted}
          autoCapitalize="none"
          autoCorrect={false}
          value={usuario}
          onChangeText={(texto) => {
            setUsuario(texto);
            setErro('');
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={theme.colors.muted}
          secureTextEntry
          value={senha}
          onChangeText={(texto) => {
            setSenha(texto);
            setErro('');
          }}
          onSubmitEditing={handleEntrar}
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <Pressable
          style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
          onPress={handleEntrar}
        >
          <Text style={styles.botaoTexto}>Entrar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: theme.spacing.lg,
  },
  form: {
    gap: theme.spacing.md,
  },
  titulo: {
    fontSize: theme.fonts.title + 8,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitulo: {
    fontSize: theme.fonts.body,
    color: theme.colors.muted,
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    fontSize: theme.fonts.body,
    color: theme.colors.text,
  },
  erro: {
    color: theme.colors.danger,
    fontSize: theme.fonts.small,
  },
  botao: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius,
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    marginTop: theme.spacing.sm,
  },
  pressionado: {
    opacity: 0.85,
  },
  botaoTexto: {
    color: theme.colors.onPrimary,
    fontSize: theme.fonts.body,
    fontWeight: '600',
  },
});
