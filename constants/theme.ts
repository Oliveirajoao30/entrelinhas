// Tema central do app (padrão da Aula 7): nenhuma cor "solta" nas telas.
export const theme = {
  colors: {
    background: '#FAFAF9', // fundo das telas
    surface: '#FFFFFF', // cards e campos
    text: '#1C1917', // texto principal
    muted: '#78716C', // texto secundário
    border: '#E7E5E4', // bordas finas
    primary: '#1F4D3A', // única cor de destaque
    onPrimary: '#FFFFFF', // texto sobre a cor de destaque
    primarySoft: '#E8F0EC', // fundo de selos "disponível"
    danger: '#B42318', // mensagens de erro
    dangerSoft: '#FDECEA', // fundo de selos "emprestado"
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  fonts: {
    title: 24,
    body: 17,
    small: 14,
  },
  radius: 12,
} as const;
