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
  {
    title: "Chamada na Secretaria de Saúde do Ceará",
    thumbnail: `${base}/videos/4-secretaria-saude-ceara.png`,
    width: 336,
    height: 258,
    url: "https://www.instagram.com/p/DFOXNaVqUi2/",
  },
  {
    title: "Audiência pública na Assembléia Legislativa de Minas Gerais",
    thumbnail: `${base}/videos/5-audiencia-alemg.png`,
    width: 728,
    height: 408,
    url: "https://www.instagram.com/p/CsjRAO0ommw/",
  },
  {
    title: "Audiência pública na câmara legislativa do Distrito Federal",
    thumbnail: `${base}/videos/6-audiencia-cldf.png`,
    width: 1087,
    height: 754,
    url: "https://www.instagram.com/p/Coj91UtK2kc/",
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
    title: "Entraves no acesso à saúde para pessoas não binárias e multiplicidade ontológica legal em territórios brasileiros",
    abstract:
      "O acesso à saúde de populações não cissexuais no Brasil enfrenta diversos entraves. De modo geral, o preconceito estrutural, a não disponibilidade de medicamentos para a terapia hormonal, a falta de capacitação de equipes, a ausência de um projeto terapêutico singular, e o longo histórico de patologização afetam diretamente. Em pessoas não binárias, outros fatores entravam esse acesso, como a ininteligibilidade que leva profissionais a buscarem hormonizar de forma binária, com os mesmos protocolos; ou, ainda, a arquitetura dos postos de saúde e outros locais da rede, que por oferecer apenas banheiros binários, exercem uma pressão silenciosa e cisnormativa nos corpos. Esta tese teve como objetivo mapear esse campo, onde tão poucas pesquisas já percorreram. De modo mais específico: a) trazer problematizações sobre a “identidade” não binária nas políticas públicas, b) contextualizar historicamente o rastro perverso da patologização/pecadologização e efeitos de corpo; e c) lançar propostas para a melhoria do acolhimento e atendimento de pessoas não binárias na rede pública de saúde. Sua justificativa está na necessidade de observância e efetivação da garantia do direito fundamental que é o acesso à saúde, independentemente da identidade de gênero. Teve como inspiração metodológica a prática autoetnográfica feminista e dos estudos de gênero, onde usei a força criativa da fabulação crítica para trazer novamente a história da patologização, mas dessa vez voltando o olhar para populações não binárias. As principais contribuições estão no campo das políticas públicas de saúde, embora seja possível encontrar problematizações filosóficas que podem ser expandidas para outros campos, principalmente o direito civil. Esta tese se mostra um material onde profissionais podem buscar informações para sua capacitação, bem como usuáries podem se informar sobre seus direitos.",
    cover: `${base}/livros/3-entraves-acesso-saude.png`,
    width: 634,
    height: 896,
    url: "https://www.researchgate.net/profile/Brune-Bonassi/publication/397738846_ENTRAVES_NO_ACESSO_A_SAUDE_PARA_PESSOAS_NAO_BINARIAS_E_MULTIPLICIDADE_ONTOLOGICA_LEGAL_EM_TERRITORIOS_BRASILEIROS/links/691d208bde81430982722cd8/ENTRAVES-NO-ACESSO-A-SAUDE-PARA-PESSOAS-NAO-BINARIAS-E-MULTIPLICIDADE-ONTOLOGICA-LEGAL-EM-TERRITORIOS-BRASILEIROS.pdf",
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
