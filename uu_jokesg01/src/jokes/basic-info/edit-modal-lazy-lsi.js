export const Lsi = {
  header: {
    cs: "Edit Jokes.BasicInfo",
    en: "Edit Jokes.BasicInfo",
  },
  properties: {
    cs: "Základní informace",
    en: "Basic info",
  },
  baseUri: {
    cs: "URL aplikace uuJokes",
    en: "uuJokes application URL",
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
  card: {
    cs: "Karta",
    en: "Card",
  },
  colorScheme: {
    cs: "Barevné schéma",
    en: "Color schema",
  },
  borderRadius: {
    cs: "Zaoblení rohů",
    en: "Border radius",
  },
  significance: {
    cs: "Význam",
    en: "Significance",
  },
  info: {
    cs: "<uu5string/>Více informací viz <UU5.Bricks.Link href='%s' target='_blank' content='dokumentace'/>.",
    en: "<uu5string/>For more information see <UU5.Bricks.Link href='%s' target='_blank' content='documentation'/>.",
  },
  advancedConfiguration: {
    en: "Advanced settings",
    cs: "Pokročilá nastavení",
  },
  background: {
    cs: "Pozadí",
    en: "Background",
  },
  level: {
    en: "Heading size",
    cs: "Velikost nadpisu",
  },
  advancedConfigurationInfo: {
    cs: `<uu5string/>Hodnota <b>Pozadí</b> určuje typ podkladu, na kterém je komponenta použita a má mu přizpůsobit svůj vzhled pro lepší uživatelský zážitek.
      Manuální změna hodnoty je určena zejména pro testovací účely.
      
      <br/><br/>

      Hodnota <b>Velikost nadpisu</b> umožňuje pevně stanovit požadovanou velikost nadpisu karty. Pokud není zadána, tak je automaticky určena
      na základě zanoření komponenty v obsahu. Velikost nadpisu lze nastavit pouze pro kartu typu <UU5.Bricks.Code>none</UU5.Bricks.Code>
      nebo <UU5.Bricks.Code>content</UU5.Bricks.Code> (viz nastavení vzhledu).
      `,
    en: `<uu5string/>      The <b>Background</b> value determines background type on which the component is used and should adapt its appearance for better user experience.
      Manual changes are intended especially for testing purposes.
    
      <br/><br/>
    
      The value <b>Heading size</b> allows to set required cards' heading size. If it is not set the size is automatically determined
      from the components' position in the content hierarchy. Heading size is allowed to be set only for card of type 
      <UU5.Bricks.Code>none</UU5.Bricks.Code> or <UU5.Bricks.Code>content</UU5.Bricks.Code> (see visual settings).
      `,
  },
};

export default Lsi;
