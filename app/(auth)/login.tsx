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
import { theme } from '../../constants/theme';

// Rota /login — o grupo (auth) não aparece na URL.
export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

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
          onChangeText={setUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor={theme.colors.muted}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <Pressable
          style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
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
