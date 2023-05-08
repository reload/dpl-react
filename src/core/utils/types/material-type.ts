export const enum ManifestationMaterialType {
  book = "bog",
  ebook = "ebog",
  movie = "film",
  audioBook = "lydbog (net)",
  audioBookGeneric = "lydbog",
  music = "node",
  game = "playstation 5",
  animatedSeries = "tegneserie",
  newspaperArticle = "tidsskriftsartikel",
  earticle = "artikel",
  boardGame = "spil",
  cdRom = "cd",
  magazine = "tidsskrift"
}

export const enum AutosuggestCategoryType {
  book = "bog",
  ebook = "e-bog",
  movie = "Film",
  audioBook = "lydbog (net)",
  music = "Musik",
  game = "Spil",
  animatedSeries = "tegneserie"
}

export type AutosuggestCategoryFacetType = "materialTypes" | "workTypes";

export type AutosuggestCategoryListType = {
  render: string;
  term: AutosuggestCategoryType;
  facet: AutosuggestCategoryFacetType;
};

export default {};
