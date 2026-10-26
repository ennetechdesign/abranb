const base = "/images/arquivos-historicos";

export type ArchiveImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Gallery blocks, in display order: 3x2 grid, 2x2 grid, a portrait pair, then a single wide image. */
export const imageGrid3: ArchiveImage[] = [
  { src: `${base}/imagens/1-primeiro-coletivo-lesbico.jpg`, alt: "Primeiro coletivo lésbico: pessoas reunidas em frente a um restaurante, em registro de 19 de agosto", width: 474, height: 661 },
  { src: `${base}/imagens/2-cintura-fina.jpg`, alt: "Recorte de jornal com o título “Cintura Fina está de novo na Capital”", width: 480, height: 640 },
  { src: `${base}/imagens/3-primavera-nao-binarie.png`, alt: "Capa do livro A primavera não-binárie: protagonismo trans não-binárie no fazer científico", width: 301, height: 427 },
  { src: `${base}/imagens/4-androginos.png`, alt: "Reportagem “Os andróginos” sobre uma nova minoria, com cinco pessoas maquiadas", width: 304, height: 379 },
  { src: `${base}/imagens/5-indigenas-lgbt.png`, alt: "Duas pessoas indígenas se beijando, envoltas em uma bandeira do arco-íris", width: 373, height: 374 },
  { src: `${base}/imagens/6-indigenas-lgbt.jpg`, alt: "Grupo de pessoas indígenas LGBTQIA+ em uma passarela, com a bandeira do arco-íris", width: 640, height: 800 },
];

export const imageGrid2: ArchiveImage[] = [
  { src: `${base}/imagens/7-coletive.jpg`, alt: "Quatro pessoas posando juntas em frente a uma parede descascada", width: 720, height: 489 },
  { src: `${base}/imagens/8-majur-cacique-trans.jpg`, alt: "Majur, cacique trans, em meio à mata, com cabelo curto vermelho e blusa vermelha", width: 620, height: 410 },
  { src: `${base}/imagens/9-galf.jpg`, alt: "Grupo reunido em torno de uma coluna com cartaz, em foto antiga do GALF", width: 474, height: 266 },
  { src: `${base}/imagens/10-marcha.jpg`, alt: "Marcha com faixa “Contra a discriminação do/a trabalhador/a homossexual”", width: 640, height: 360 },
];

export const imagePair: ArchiveImage[] = [
  { src: `${base}/imagens/11-primeiro-caso-homofobia.jpeg`, alt: "Placa em bronze em homenagem a Tibira do Maranhão, índio mártir gay: 1º caso de homofobia do Brasil", width: 632, height: 1125 },
  { src: `${base}/imagens/12-primeiro-coletivo-trans-trabalhadoras-sexuais.png`, alt: "Cartaz do Grupo Astral, primeiro coletivo trans/trabalhadoras sexuais do Brasil", width: 367, height: 604 },
];

export const imageWide: ArchiveImage = {
  src: `${base}/imagens/13-revista-lampiao.jpg`,
  alt: "Capas de edições do jornal Lampião da Esquina",
  width: 600,
  height: 350,
};

export type ArchiveVideo = {
  title: string;
  thumbnail: string;
  width: number;
  height: number;
  url: string;
  /** The source PNG has a transparent margin on the right/bottom edge; crop it out. */
  trimTransparentEdge?: boolean;
};

export const videos: ArchiveVideo[] = [
  {
    title: "Foro Social Identidades No-Binarias",
    thumbnail: `${base}/videos/1-foro-social.png`,
    width: 350,
    height: 197,
    url: "https://drive.google.com/file/d/1b-LntnlR_IVrGuEYaeTU9prvQrKlmiYE/view",
  },
  {
    title: "Intervenção no Congresso Nacional",
    thumbnail: `${base}/videos/2-intervencao.png`,
    width: 358,
    height: 206,
    trimTransparentEdge: true,
    url: "https://www.instagram.com/reel/C0nXzPYtPXk/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ%3D%3D",
  },
  {
    title: "Não-binariedade: a Defensoria em defesa de diferentes Identidades de Gênero",
    thumbnail: `${base}/videos/3-defensoria.png`,
    width: 480,
    height: 360,
    url: "https://www.youtube.com/live/QdwBR4WC1TY?si=ugMiJosrEl5xbSRC",
  },
];

export type ArchiveBook = {
  title: string;
  abstract: string;
  cover: string;
  width: number;
  height: number;
  url: string;
};

export const books: ArchiveBook[] = [
  {
    title: "A primavera não-binárie",
    abstract:
      "O projeto “A primavera não-binárie: protagonismos trans NB no fazer científico” tem um peso histórico que talvez nem consigamos mensurar nesse instante que escrevo. Trata-se do início de um movimento de libertação dos corpos. Um grito que fora ouvido pelas pesquisadoras do Selo Nyota, organizado pelas mãos de Morgan Morgado, tocado e costurado entre contribuições diversas e movido por um sonho.",
    cover: `${base}/livros/1-primavera-nao-binarie.png`,
    width: 301,
    height: 427,
    url: "https://drive.google.com/file/d/1FP4eqsqepf5adZPJxxyjdcIqqZfWNkeY/view",
  },
  {
    title: "Gênero, sexualidade e educação",
    abstract:
      "“Um outro modo de compreender as identidades sexuais e de gênero mudanças implica extremamente graves. Não é tarefa fácil e trivial. Trata-se de assumir que todos os sujeitos são constituídos socialmente, que a diferença (seja ela qual for) é uma construção feita sempre a partir de um dado lugar que se toma como norma ou como centro. É preciso, pois, colocar a norma em questão, discutir o centro, questionar do natural... Mas, não há como negar que a disposição de questionar nosso próprio comportamento e nossas próprias convicções é sempre muito muito mobilizadora ...”.",
    cover: `${base}/livros/2-genero-sexualidade-e-educacao.png`,
    width: 490,
    height: 744,
    url: "https://drive.google.com/file/d/1Z8jP2e4jFjCxKS4vKtlNuNbVcx_1WvX4/view",
  },
  {
    title: "Léxico Guarani",
    abstract:
      "LÉXICO GUARANI, DIALETO MBYÁ com informações úteis para o ensino médio, a aprendizagem e a pesquisa lingüística Robert A. Dooley, SIL GUARANI-PORTUGUÊS Versão de 9 de março de 2006, 11:32:00",
    cover: `${base}/livros/3-lexico-guarani.png`,
    width: 609,
    height: 789,
    url: "https://drive.google.com/file/d/11t21H93WsHlr4gadAzwTP837nrd4JTFz/view",
  },
];

export const allBooksUrl =
  "https://drive.google.com/drive/folders/1OBtVbFnyurToqUwWTcXbL9-jj6HeTw0l";

export type ArchiveArticle = { title: string; url: string };

export const articles: ArchiveArticle[] = [
  {
    title: "Saúde e bem-estar de jovens cisgêneros transgêneros e não-binários",
    url: "https://drive.google.com/file/d/1munc9xcYmCqYjIr3aEF4M_GcqZkey8GS/view",
  },
  {
    title:
      "Comparando a saúde de pessoas adultas não-binárias e pessoas adultas transgêneras binárias em uma amostra estadual não probabilística",
    url: "https://drive.google.com/file/d/13llhS7gUMWUJd1kA4X73mq4JKzPtTcPb/view",
  },
  {
    title:
      "Correlações socioecológicas de polivitimização em uma amostra nacional de adolescentes pertencentes a minorias sexuais transgênero, gênero-queer e cisgênero",
    url: "https://drive.google.com/file/d/1oYtxGcSa75YJx1jLii_uL27qrlYv9HHq/view",
  },
  {
    title:
      "Taxas autorrelatadas de abuso, negligência e bullying sofridas por adolescentes transgêneros e não-binários na China",
    url: "https://drive.google.com/file/d/1BUCvjjGWCSzmd6mCn3TRIzaY1AGIgGOF/view",
  },
  {
    title: "Juventude não-binária: Acesso a cuidados de saúde primários afirmativos de gênero",
    url: "https://drive.google.com/file/d/1k7PTjYU3NhKUZFCN_pXqcpyRPmdiL5mc/view",
  },
];

export const allArticlesUrl =
  "https://drive.google.com/drive/folders/1WtY0hi2VuNBtv15z7uS4FNKD9V7Tqlhy";
