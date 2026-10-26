/**
 * Glossary data that is not translated per locale: image files and link targets.
 * The copy lives in the `glossario` locale files; `**word**` marks highlighted words.
 */

export type Block = { kind: "p"; text: string } | { kind: "ul"; items: string[] };

export type PillData = {
  title?: string;
  blocks: Block[];
  /** Centred, narrower, title-less pill. */
  aside?: boolean;
};

export type PanelData = {
  title: string;
  intro: Block[];
  pills?: PillData[];
  outro?: Block[];
};

const img = "/images/glossario";

export type PhotoData = { src: string; width: number; height: number };

export const images = {
  identidade: { src: `${img}/identidade-de-genero.png`, width: 1152, height: 928 },
  generoImposto: { src: `${img}/genero-designado-ao-nascer.jpg`, width: 360, height: 367 },
  expressao: { src: `${img}/expressao-de-genero.jpg`, width: 2000, height: 2000 },
  intersexo: { src: `${img}/intersexo.jpg`, width: 360, height: 240 },
  intersexoFoto: { src: `${img}/intersexo-foto.png`, width: 360, height: 240 },
} satisfies Record<string, PhotoData>;

export const linguagem = {
  image: { src: `${img}/linguagem-de-tratamento.png`, width: 360, height: 246 },
  tool: {
    image: { src: `${img}/meu-conjunto.png`, width: 1600, height: 1336 },
    href: "https://meuconjunto.orientando.org/",
  },
};

export type SourceLink = { label: string; url: string };

export const fontes = {
  left: [
    { label: "Lista de identidades não-binárias - Orientando", url: "https://orientando.org/listas/lista-de-generos/" },
    { label: "Genderqueer Identities", url: "https://web.archive.org/web/20111014042115/http://genderqueerid.com/gq-terms" },
    { label: "Género fluido: qué es y a quiénes se les considera así", url: "https://depor.com/depor-play/pantalla/genero-fluido-que-es-y-que-significa-pronombre-nnda-nnlt-noticia/" },
    { label: "Demigênero - Orientando", url: "https://orientando.org/listas/lista-de-generos/demigenero/" },
    { label: "Aporagênero - Orientando", url: "https://orientando.org/listas/lista-de-generos/aporagenero/" },
    { label: "Transfeminine - Orientando", url: "https://orientando.org/listas/lista-de-generos/transfeminine" },
    { label: "Transneutre - Orientando", url: "https://orientando.org/listas/lista-de-generos/transneutre" },
    { label: "Transouterine - Orientando", url: "https://orientando.org/listas/lista-de-generos/transouterine/" },
    { label: "O que podemos com a isogeneridade", url: "https://bloguealternative.wordpress.com/2024/04/14/o-que-podemos-com-a-isogeneridade/" },
    { label: "Disforia apresentacional", url: "https://genderdysphoria.fyi/pt/disforia-apresentacional" },
    { label: "Artigo/pronome/final de palavra: como se usa, e por quais motivos", url: "https://www.youtube.com/watch?v=fCteHbnRhiw" },
    { label: "Neolinguagem", url: "https://bloguealternative.wordpress.com/neolinguagem/" },
    { label: "O que é Intersexo? - Orientando", url: "https://orientando.org/o-que-e-intersexo/" },
  ] as SourceLink[],
  right: [
    { label: "Agênero - Orientando", url: "https://orientando.org/listas/lista-de-generos/agenero/" },
    { label: "Gênero fluido - Orientando", url: "https://orientando.org/listas/lista-de-generos/genero-fluido/" },
    { label: "Poligênero - Orientando", url: "https://orientando.org/listas/lista-de-generos/poligenero/" },
    { label: "O que é demigênero?", url: "https://demigenero.carrd.co/" },
    { label: "‘Trans’ is my gender modality: a modest terminological proposal", url: "https://www.florenceashley.com/uploads/1/2/4/4/124439164/florence_ashley_trans_is_my_gender_modality.pdf" },
    { label: "Transmasculine - Orientando", url: "https://orientando.org/listas/lista-de-generos/transmasculine" },
    { label: "Transandrógine - Orientando", url: "https://orientando.org/listas/lista-de-generos/transandrogine/" },
    { label: "Transxenine - Orientando", url: "https://orientando.org/listas/lista-de-generos/transxenine/" },
    { label: "Modalidades de gênero - Orientando", url: "https://orientando.org/listas/lista-de-modalidades-de-genero/" },
    { label: "Linguagem pessoal - Plume", url: "https://amplifi.casa/~/Asterismos/tudo-ou-pelo-menos-muita-coisa-sobre-linguagem-pessoal" },
    { label: "Linguagem, poder e sexismo (módulo para uma sequência didática)", url: "https://subversiveopendiscoursebr.wordpress.com/2013/07/31/linguagem-poder-e-sexismo-modulo-para-uma-sequencia-didatica/" },
    { label: "O que é ser Intersexo", url: "https://abrai.org.br/informacoes-e-recursos/definicao-de-intersexo/" },
    { label: "Exorsexismo - Plume", url: "https://amplifi.casa/~/Asterismos/exorsexismo" },
  ] as SourceLink[],
};
