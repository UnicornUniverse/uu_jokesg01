export const Lsi = {
  header: {
    cs: "Edit Joke.Detail",
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
  visual: {
    cs: "Nastavení vzhledu",
    en: "Visual settings",
  },
  contextType: {
    cs: "Typ kontextu",
    en: "Context type",
  },
  none: {
    cs: "žádný",
    en: "none",
  },
  basic: {
    cs: "základní",
    en: "basic",
  },
  full: {
    cs: "úplný",
    en: "full",
  },
  card: {
    cs: "Karta",
    en: "Card",
  },
  colorScheme: {
    cs: "Barevné schéma",
    en: "Color scheme",
  },
  borderRadius: {
    cs: "Zaoblení rohů",
    en: "Border radius",
  },
  significance: {
    cs: "Význam",
    en: "Significance",
  },
  background: {
    cs: "Pozadí",
    en: "Background",
  },
  info: {
    cs: "<uu5string/>Více informací viz <UU5.Bricks.Link href='%s' target='_blank' content='dokumentace'/>.",
    en: "<uu5string/>For more information see <UU5.Bricks.Link href='%s' target='_blank' content='documentation'/>.",
  },
  advancedConfiguration: {
    en: "Advanced settings",
    cs: "Pokročilá nastavení",
  },
  uu5Id: {
    en: "Component identifier",
    cs: "Identifikátor komponenty",
  },
  invalidUu5Id: {
    en: "The identifier can contain only alphanumeric values, underscore and have length between 3 and 32 characters.",
    cs: "Identifikátor může obsahovat pouze alfanumerické znaky, podržítko a délka se musí být mezi třemi až 32 znaky.",
  },
  advancedConfigurationInfo: {
    cs: `<uu5string/>Hodnota <b>Identifikátor komponenty</b> je povinná v případě povoleného uživatelského nastavení (viz záložka Výchozí nastavení). 
      Slouží jako jednoznačný identifikátor, pod kterým je ukládáno uživatelské nastavení. 
      Za normálních okolností je hodnota vygenerována automaticky při vložení komponenty z katalogu do editovaného obsahu a 
      není nutné ji vyplňovat nebo upravovat. Pokud má více komponent stejný identifikátor komponenty, 
      tak sdílejí uživatelské nastavení. Změny provedené v jedné komponentě se projeví i v ostatních. Více informací 
      viz <UU5.Bricks.Link href='%s' target='_blank' content='dokumentace'/>.`,
    en: `<uu5string/>The <b>Component identifier</b> is required in case of the allowed user configuration (see Default configuration).
      It serves as a unique identifier under which user settings are stored. Under normal circumstances, the value is generated automatically
      when you insert a component from the catalog into the edited content and it does not need to be filled in or modified. 
      If multiple components have the same component identifier so they share user configuration. 
      Changes made in one component will be reflected in the others. 
      For more information see <UU5.Bricks.Link href='%s' target='_blank' content='documentation'/>.`,
  },
};

export default Lsi;
