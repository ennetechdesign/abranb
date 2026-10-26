export type Collective = {
  name: string;
  /** File under public/images/coletives/{locais|nacionais}/. */
  logo: string;
  url: string;
  /** Two-letter state code (e.g. "PB"); only for local collectives shown on the map, at most one per state. */
  state?: string;
};

export const localCollectives: Collective[] = [
  { name: "Coletivo pela Diversidade Beth Pantera", logo: "beth-pantera.jpg", url: "https://linktr.ee/bethpanteraoficial" },
  { name: "CATS", logo: "cats-trans.jpg", url: "https://www.instagram.com/cats_trans/" },
  { name: "Coletivo Cintura Fina (UFMG)", logo: "cintura-fina-mg.png", url: "https://linktr.ee/coletivocinturafina" },
  { name: "Coletive Não-Binárie da Paraíba", logo: "coletive-nb-pb.jpg", url: "https://coletivenaobinariepb.com.br/", state: "PB" },
  { name: "Coletivo Não-Binárie de Minas Gerais", logo: "coletivo-nbmg.jpg", url: "https://www.instagram.com/coletivo.nbmg", state: "MG" },
  { name: "Coletive Não Binárie do Rio de Janeiro (CoNB)", logo: "conb-rj.jpg", url: "https://linktr.ee/conb.rj", state: "RJ" },
  { name: "Desvio Coletivo", logo: "desvio-coletivo.jpg", url: "https://www.desviocoletivo.com.br/" },
  { name: "Coletiva Não Binárie Madame Satã", logo: "madame-sata.jpg", url: "https://linktr.ee/coletivamadamesata", state: "PE" },
  { name: "Núcleo de Transmasculinidades da Família Stronger", logo: "transmasculinidades-stronger.jpg", url: "https://www.instagram.com/nucleodetransmasculinidades/" },
  { name: "Coletivo Trans Não-Binárie", logo: "trans-nao-binarie.jpg", url: "https://www.instagram.com/transnaobinarie/" },
  { name: "Coletivo Intertransvestigênere Xica Manicongo - USP", logo: "xica-manicongo.jpg", url: "https://www.instagram.com/itgmanicongo/", state: "SP" },
  { name: "Associação de Não-Binárie do Amazonas", logo: "anb-amazonas.jpg", url: "https://www.instagram.com/anb.amazonas", state: "AM" },
  { name: "ColetivES Não-Binárie", logo: "nb-coletives.jpg", url: "https://www.instagram.com/nb.coletives", state: "ES" },
  { name: "Território Não-Binárie", logo: "territorio-nb.jpg", url: "https://www.instagram.com/territorionb/", state: "DF" },
];

export const nationalCollectives: Collective[] = [
  { name: "Articulação Brasileira Não-Binárie", logo: "abranb.jpg", url: "https://linktr.ee/abranb.articulacao" },
  { name: "Red No Binaries Abya Yala/Latinoamerica", logo: "abya-yala.jpg", url: "https://www.instagram.com/p/CRS3oJTAV1z/" },
  { name: "Núcleo não-binárie da Aliança", logo: "alianca-lgbti.png", url: "https://aliancalgbti.org.br/" },
  { name: "Área Não Binária da Aliança Nacional LGBTI+", logo: "area-nao-binaria.jpg", url: "https://www.instagram.com/areanaobinaria/" },
  { name: "Código Não Binário", logo: "codigo-nao-binario.png", url: "https://codigonaobinario.org/" },
  { name: "Núcleo não-binárie do IBRAT", logo: "ibrat.jpg", url: "https://www.ibratnacional.com/" },
  { name: "Não-Bináries BR", logo: "nao-binaries-br.jpg", url: "https://www.instagram.com/naobinariesbr" },
  { name: "Não-Binariedade Histórica", logo: "nbh-brasil.jpg", url: "https://www.instagram.com/nbhbrasil" },
  { name: "Rede de Pessoas Não Binárias", logo: "rede-nb.jpg", url: "https://www.instagram.com/rede.nb/" },
  { name: "Rede de Não-Bináries+ do Brasil", logo: "rede-nb-mais.jpg", url: "https://www.instagram.com/redenbmais/" },
  { name: "Rede Nacional Não-Binária e Transmasculina", logo: "rennat-pe.jpg", url: "https://www.instagram.com/rennat.oficial/" },
];
