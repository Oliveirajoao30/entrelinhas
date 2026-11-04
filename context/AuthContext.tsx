import { createContext, useContext, useState, type ReactNode } from 'react';

type Ctx = {
  usuario: string | null;
  entrar: (nome: string) => void;
  sair: () => void;
};

const AuthContext = createContext<Ctx | null>(null);

// Guarda a sessão em memória (some ao fechar o app — persistência fica para aula futura).
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const entrar = (nome: string) => setUsuario(nome);
  const sair = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, entrar, sair }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth precisa estar dentro de <AuthProvider>');
  }
  return ctx;
}
