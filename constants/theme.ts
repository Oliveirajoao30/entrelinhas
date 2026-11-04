import { Platform } from 'react-native';

// Tema central do app (padrão da Aula 7): nenhuma cor "solta" nas telas.
// Modo escuro: fundo quase preto, cartões grafite e um destaque âmbar.
export const theme = {
  colors: {
    background: '#0B0C10', // fundo das telas
    surface: '#15171D', // cartões
    surfaceAlt: '#1D2028', // campos, chips e blocos internos
    border: '#262A34', // bordas finas
    text: '#F5F5F4', // texto principal
    muted: '#9A9CA8', // texto secundário
    subtle: '#5F6372', // texto terciário / ícones apagados
    primary: '#F2B544', // destaque âmbar
    onPrimary: '#1B1405', // texto sobre o destaque
    primarySoft: 'rgba(242, 181, 68, 0.14)',
    success: '#4ADE80', // disponível
    successSoft: 'rgba(74, 222, 128, 0.12)',
    danger: '#F87171', // emprestado / erro / sair
    dangerSoft: 'rgba(248, 113, 113, 0.12)',
    overlay: 'rgba(11, 12, 16, 0.55)', // véu sobre imagens
    shadow: '#000000', // sombras das capas
    transparent: 'transparent',
  },
  // Uma cor por movimento literário (chips, barras e capas substitutas).
  movimentos: {
    Realismo: '#A78BFA',
    Modernismo: '#38BDF8',
    Naturalismo: '#FB923C',
    'Literatura de testemunho': '#34D399',
  } as Record<string, string>,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    pill: 999,
  },
  fonts: {
    hero: 34,
    title: 26,
    heading: 20,
    body: 16,
    small: 14,
    tiny: 12,
    // Serifada nos títulos dá o "ar de livro" sem baixar fontes.
    serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'Georgia, serif' }),
  },
} as const;
