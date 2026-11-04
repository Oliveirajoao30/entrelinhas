export type Livro = {
  id: number;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  paginas: number;
  sinopse: string;
  disponivel: boolean;
};

export const livros: Livro[] = [
  {
    id: 1,
    titulo: 'Dom Casmurro',
    autor: 'Machado de Assis',
    ano: 1899,
    genero: 'Romance',
    paginas: 256,
    sinopse:
      'Bentinho, já idoso, revisita a juventude e o casamento com Capitu, tentando provar a si mesmo a traição que talvez nunca tenha existido.',
    disponivel: true,
  },
  {
    id: 2,
    titulo: 'Vidas Secas',
    autor: 'Graciliano Ramos',
    ano: 1938,
    genero: 'Romance',
    paginas: 176,
    sinopse:
      'A família de Fabiano atravessa o sertão fugindo da seca, em uma narrativa seca e precisa sobre miséria, silêncio e resistência.',
    disponivel: false,
  },
  {
    id: 3,
    titulo: 'A Hora da Estrela',
    autor: 'Clarice Lispector',
    ano: 1977,
    genero: 'Novela',
    paginas: 88,
    sinopse:
      'O narrador Rodrigo S.M. conta a história de Macabéa, uma jovem nordestina no Rio de Janeiro que mal percebe a própria existência.',
    disponivel: true,
  },
  {
    id: 4,
    titulo: 'Grande Sertão: Veredas',
    autor: 'João Guimarães Rosa',
    ano: 1956,
    genero: 'Romance',
    paginas: 624,
    sinopse:
      'O ex-jagunço Riobaldo narra suas travessias pelo sertão, a amizade com Diadorim e o suposto pacto com o diabo.',
    disponivel: true,
  },
  {
    id: 5,
    titulo: 'O Cortiço',
    autor: 'Aluísio Azevedo',
    ano: 1890,
    genero: 'Romance naturalista',
    paginas: 304,
    sinopse:
      'A vida coletiva de um cortiço carioca e a ascensão do português João Romão mostram como o meio molda as pessoas.',
    disponivel: false,
  },
  {
    id: 6,
    titulo: 'Capitães da Areia',
    autor: 'Jorge Amado',
    ano: 1937,
    genero: 'Romance',
    paginas: 280,
    sinopse:
      'Um grupo de meninos abandonados vive de pequenos furtos nas ruas de Salvador, entre a liberdade e a dureza da vida.',
    disponivel: true,
  },
  {
    id: 7,
    titulo: 'Memórias Póstumas de Brás Cubas',
    autor: 'Machado de Assis',
    ano: 1881,
    genero: 'Romance',
    paginas: 240,
    sinopse:
      'Um defunto autor narra a própria vida com ironia, sem pressa e sem medo de expor as vaidades da sociedade do século XIX.',
    disponivel: true,
  },
  {
    id: 8,
    titulo: 'Quarto de Despejo',
    autor: 'Carolina Maria de Jesus',
    ano: 1960,
    genero: 'Diário',
    paginas: 200,
    sinopse:
      'O diário de Carolina registra o cotidiano na favela do Canindé, a fome e a força de quem escreve para sobreviver.',
    disponivel: false,
  },
];
