export const Lsi = {
  header: {
    cs: "Upravit Joke.Detail",
    en: "Edit Joke.Detail",
  },
  properties: {
    cs: "Vtip",
    en: "Joke",
  },
  baseUri: {
    cs: "URL aplikace uuJokes",
    en: "uuJokes application URL",
  },
  oid: {
    cs: "Identifikátor (oid)",
    en: "Identifier (oid)",
  },
  configuration: {
    cs: "Výchozí nastavení",
    en: "Default configuration",
  },
  configurationInfo: {
    cs: `<uu5string/>Výchozí nastavení komponenty je použito pro uživatele, kteří si neuloží vlastní oblíbené nastavení. 
      Zároveň je možné zakázat uživatelům provádět změny výchozích hodnot a vynutit si tak stejné chování komponenty pro všechny uživatele.
      Více informací viz <UU5.Bricks.Link href='%s' target='_blank' content='dokumentace'/>.`,
    en: `<uu5string/>The default configuration of the component is used for users who do not save their own favorite configuration.
      At the same time, it is possible to prevent users from making changes to the default values and 
      thus force the same behavior of the component for all users. 
      For more information see <UU5.Bricks.Link href='%s' target='_blank' content='documentation'/>.`,
  },
  showCategories: {
    en: "Show categories",
    cs: "Zobrazit kategorie",
  },
  showAuthor: {
    en: "Show author",
    cs: "Zobrazit autora",
  },
  showCreationTime: {
    en: "Show creation time",
    cs: "Zobrazit čas vytvoření",
  },
  disableUserPreference: {
    en: "Forbid user configuration",
    cs: "Zakázat uživatelské nastavení",
  },
  margin: {
    cs: "Okraj",
    en: "Margin",
  },
  visual: {
    cs: "Nastavení vzhledu",
    en: "Visual settings",
  },
  identificationType: {
    cs: "Typ identifikace",
    en: "Identification type",
  },
  default: {
    cs: "výchozí",
    en: "default",
  },
  none: {
    cs: "žádný",
    en: "none",
  },
  basic: {
    cs: "základní",
    en: "basic",
  },
  width: {
    cs: "Šířka",
    en: "Width",
  },
  height: {
    cs: "Výška",
    en: "Height",
  },
  widthHeightMessage: {
    en: "Different units can be used (px, em, vw, % and others). If the unit is not specified, px is used.",
    cs: "Lze použít různé jednotky (px, em, vw, % a další). Pokud není jednotka specifikována, použijí se px.",
  },
  info: {
    cs: "<uu5string/>Více informací viz <UU5.Bricks.Link href='%s' target='_blank' content='dokumentace'/>.",
    en: "<uu5string/>For more information see <UU5.Bricks.Link href='%s' target='_blank' content='documentation'/>.",
  },
  advancedConfiguration: {
    en: "Advanced settings",
    cs: "Pokročilá nastavení",
  },
  level: {
    en: "Heading size",
    cs: "Velikost nadpisu",
  },
  advancedConfigurationInfo: {
    cs: `<uu5string/>Hodnota <b>Velikost nadpisu</b> umožňuje pevně stanovit požadovanou velikost nadpisu karty. Pokud není zadána, tak je automaticky určena
      na základě zanoření komponenty v obsahu. Velikost nadpisu lze nastavit pouze pro kartu typu <UU5.Bricks.Code>none</UU5.Bricks.Code>
      nebo <UU5.Bricks.Code>content</UU5.Bricks.Code> (viz nastavení vzhledu).
      `,
    en: `<uu5string/>The value <b>Heading size</b> allows to set required cards' heading size. If it is not set the size is automatically determined
      from the components' position in the content hierarchy. Heading size is allowed to be set only for card of type 
      <UU5.Bricks.Code>none</UU5.Bricks.Code> or <UU5.Bricks.Code>content</UU5.Bricks.Code> (see visual settings).
      `,
  },
};

export default Lsi;
