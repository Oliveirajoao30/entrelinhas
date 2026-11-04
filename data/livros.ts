export type Livro = {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  movimento: string;
  paginas: number;
  sinopse: string;
  disponivel: boolean;
  capaId: number; // id da capa na Open Library Covers API
};

// Monta a URL da capa na API pública da Open Library (não precisa de chave).
// Tamanhos: 'S' pequeno, 'M' médio (listas) e 'L' grande (detalhe).
export function capaUrl(capaId: number, tamanho: 'S' | 'M' | 'L' = 'M') {
  return `https://covers.openlibrary.org/b/id/${capaId}-${tamanho}.jpg`;
}

// Tempo médio de leitura, considerando ~40 páginas por hora.
export function tempoLeitura(paginas: number) {
  return `${Math.max(1, Math.round(paginas / 40))}h`;
}

export const livros: Livro[] = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    ano: 1899,
    genero: 'Romance',
    movimento: 'Realismo',
    paginas: 256,
    sinopse:
      'Bentinho, já idoso, revisita a juventude e o casamento com Capitu, tentando provar a si mesmo a traição que talvez nunca tenha existido. Um dos maiores enigmas da literatura brasileira.',
    disponivel: true,
    capaId: 15231557,
  },
  {
    id: 2,
    titulo: 'Vidas Secas',
    autor: 'Graciliano Ramos',
    ano: 1938,
    genero: 'Romance',
    movimento: 'Modernismo',
    paginas: 176,
    sinopse:
      'A família de Fabiano atravessa o sertão fugindo da seca, em uma narrativa enxuta e precisa sobre miséria, silêncio e resistência. A cachorra Baleia é uma das personagens mais marcantes do livro.',
    disponivel: false,
    capaId: 14158825,
  },
  {
    id: 3,
    titulo: 'A Hora da Estrela',
    autor: 'Clarice Lispector',
    ano: 1977,
    genero: 'Novela',
    movimento: 'Modernismo',
    paginas: 88,
    sinopse:
      'O narrador Rodrigo S.M. conta a história de Macabéa, uma jovem nordestina no Rio de Janeiro que mal percebe a própria existência. O último livro publicado em vida por Clarice.',
    disponivel: true,
    capaId: 12370356,
  },
  {
    id: 4,
    titulo: 'Grande Sertão: Veredas',
    autor: 'João Guimarães Rosa',
    ano: 1956,
    genero: 'Romance',
    movimento: 'Modernismo',
    paginas: 624,
    sinopse:
      'O ex-jagunço Riobaldo narra suas travessias pelo sertão, a amizade com Diadorim e o suposto pacto com o diabo, em uma linguagem reinventada palavra por palavra.',
    disponivel: true,
    capaId: 12369975,
  },
  {
    id: 5,
    titulo: 'O Cortiço',
    autor: 'Aluísio Azevedo',
    ano: 1890,
    genero: 'Romance',
    movimento: 'Naturalismo',
    paginas: 304,
    sinopse:
      'A vida coletiva de um cortiço carioca e a ascensão do português João Romão mostram como o meio molda as pessoas, em um retrato vivo do Rio do século XIX.',
    disponivel: false,
    capaId: 12370912,
  },
  {
    id: 6,
    titulo: 'Capitães da Areia',
    autor: 'Jorge Amado',
    ano: 1937,
    genero: 'Romance',
    movimento: 'Modernismo',
    paginas: 280,
    sinopse:
      'Um grupo de meninos abandonados vive de pequenos furtos nas ruas de Salvador, entre a liberdade, a amizade e a dureza da vida. O livro chegou a ser queimado em praça pública em 1937.',
    disponivel: true,
    capaId: 15236135,
  },
  {
    id: 7,
    titulo: 'Memórias Póstumas de Brás Cubas',
    autor: 'Machado de Assis',
    ano: 1881,
    genero: 'Romance',
    movimento: 'Realismo',
    paginas: 240,
    sinopse:
      'Um defunto autor narra a própria vida com ironia, sem pressa e sem medo de expor as vaidades da sociedade do século XIX. O livro que inaugura o Realismo no Brasil.',
    disponivel: true,
    capaId: 12370894,
  },
  {
    id: 8,
    titulo: 'Quarto de Despejo',
    autor: 'Carolina Maria de Jesus',
    ano: 1960,
    genero: 'Diário',
    movimento: 'Literatura de testemunho',
    paginas: 200,
    sinopse:
      'O diário de Carolina registra o cotidiano na favela do Canindé, em São Paulo: a fome, o trabalho como catadora e a força de quem escreve para sobreviver.',
    disponivel: false,
    capaId: 12769759,
  },
];

// Movimentos na ordem em que aparecem, sem repetir (usado nos filtros).
export const movimentos = Array.from(new Set(livros.map((l) => l.movimento)));
