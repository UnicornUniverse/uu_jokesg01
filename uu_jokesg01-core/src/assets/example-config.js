const imports = {
  react: "https://cdn.plus4u.net/libs/react/17.0.1/react.min.js",
  "react-dom": "https://cdn.plus4u.net/libs/react-dom/17.0.1/react-dom.min.js",
  "create-react-class": "https://cdn.plus4u.net/libs/create-react-class/15.6.3/create-react-class.min.js",
  "prop-types": "https://cdn.plus4u.net/libs/prop-types/15.7.2/prop-types.min.js",

  uu5g04: "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04.min.js",
  "uu5g04-bricks": "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-bricks.min.js",
  "uu5g04-forms": "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-forms.min.js",
  "uu5g04-hooks": "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-hooks.min.js",
  "uu5g04-block-layout": "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-block-layout.min.js",

  uu5g05: "https://cdn.plus4u.net/uu-uu5g05/1.0.0/uu5g05.min.js",
  "uu5g05-elements": "https://cdn.plus4u.net/uu-uu5g05/1.0.0/uu5g05-elements.min.js",
  "uu5g05-editing": "https://cdn.plus4u.net/uu-uu5g05/1.0.0/uu5g05-editing.min.js",
  "uu5g05-forms": "https://cdn.plus4u.net/uu-uu5g05/1.0.0/uu5g05-forms.min.js",
  "uu5g05-dev": "https://cdn.plus4u.net/uu-uu5g05/1.0.0/uu5g05-dev.min.js",
  uu_i18ng01: "https://cdn.plus4u.net/uu-i18ng01/1.0.0/uu_i18ng01.min.js",
  uu5stringg01: "https://cdn.plus4u.net/uu-uu5stringg01/1.0.0/uu5stringg01.min.js",

  uu_appg01_core: "https://cdn.plus4u.net/uu-appg01-core/5.0.0/uu_appg01_core.min.js",
  uu_appg01: "https://cdn.plus4u.net/uu-appg01/5.0.0/uu_appg01.min.js",
  uu_appg01_oidc: "https://cdn.plus4u.net/uu-appg01-oidc/3.0.0/uu_appg01_oidc.min.js",

  uu_plus4u5g01: "https://cdn.plus4u.net/uu-plus4u5g01/4.0.0/uu_plus4u5g01.min.js",
  "uu_plus4u5g01-bricks": "https://cdn.plus4u.net/uu-plus4u5g01/4.0.0/uu_plus4u5g01-bricks.min.js",
  "uu_plus4u5g01-app": "https://cdn.plus4u.net/uu-plus4u5g01/4.0.0/uu_plus4u5g01-app.min.js",
  "uu_plus4u5g01-hooks": "https://cdn.plus4u.net/uu-plus4u5g01/4.0.0/uu_plus4u5g01-hooks.min.js",

  uu_plus4u5g02: "https://cdn.plus4u.net/uu-plus4u5g02/1.0.0/uu_plus4u5g02.min.js",
  "uu_plus4u5g02-elements": "https://cdn.plus4u.net/uu-plus4u5g02/1.0.0/uu_plus4u5g02-elements.min.js",
  "uu_plus4u5g02-app": "https://cdn.plus4u.net/uu-plus4u5g02/1.0.0/uu_plus4u5g02-app.min.js",

  uu_pg01: "https://cdn.plus4u.net/uu-pg01/3.0.0/uu_pg01.min.js",
  "uu_pg01-bricks": "https://cdn.plus4u.net/uu-pg01/3.0.0/uu_pg01-bricks.min.js",
  uu_contentkitg01: "https://cdn.plus4u.net/uu-contentkitg01/2.0.0/uu_contentkitg01.min.js",

  uu5tilesg01: "https://cdn.plus4u.net/uu-uu5tilesg01/1.0.0/uu5tilesg01.min.js",
  uu5tilesg02: "https://cdn.plus4u.net/uu-uu5tilesg02/2.0.0/uu5tilesg02.min.js",
  "uu5tilesg02-controls": "https://cdn.plus4u.net/uu-uu5tilesg02/2.0.0/uu5tilesg02-controls.min.js",
  "uu5tilesg02-elements": "https://cdn.plus4u.net/uu-uu5tilesg02/2.0.0/uu5tilesg02-elements.min.js",
  uu5dndg01: "https://cdn.plus4u.net/uu-uu5dndg01/1.0.0/uu5dndg01.min.js",

  uu_territoryg01: "https://cdn.plus4u.net/uu-territoryg01/2.0.0/uu_territoryg01.min.js",
  "uu_territoryg01-bricks": "https://cdn.plus4u.net/uu-territoryg01/2.0.0/uu_territoryg01-bricks.min.js",

  "uu5g04-bricks-editable": "https://cdn.plus4u.net/uu-uu5g04/1.0.0/uu5g04-bricks-editable.min.js",
  uu5codekitg01: "https://cdn.plus4u.net/uu-uu5codekitg01/1.0.0/uu5codekitg01.min.js",
  "uu5codekitg01-markdown": "https://cdn.plus4u.net/uu-uu5codekitg01/1.0.0/uu5codekitg01-markdown.min.js",
  uu5richtextg01: "https://cdn.plus4u.net/uu-uu5richtextg01/1.0.0/uu5richtextg01.min.js",
  immutable: "https://cdn.plus4u.net/libs/immutable/3.8.2/immutable.min.js",
  uu_dynamiccomponentcontentg02:
    "https://cdn.plus4u.net/uu-dynamiccomponentcontentg02/3.0.0/uu_dynamiccomponentcontentg02.min.js",

  uu_jokesg01: "https://cdn.plus4u.net/uu-jokesg01/1.0.0/uu_jokesg01.min.js",
  "uu_jokesg01-core": "https://cdn.plus4u.net/uu-jokesg01/1.0.0/uu_jokesg01-core.min.js",
  "uu_jokesg01-demo": "https://cdn.plus4u.net/uu-jokesg01/1.0.0/uu_jokesg01-demo.min.js",
};

// eslint-disable-next-line no-undef
Uu5Loader.config({ imports });

const exampleConfig = {};

if (window.location.hostname === "localhost") {
  exampleConfig.baseUri = "http://localhost:8080/uu-jokes-maing01/00000d09ee2040f9a6c27e66475a57af";
  exampleConfig.oid = "62de7bd3dbc1b34378458abb";

  window.uu5Environment = {
    uu5g05_trustedUriRegExp: ".*",
    uu_app_oidc_providers_oidcg02_uri:
      "https://uuapp-dev.plus4u.net/uu-oidc-maing02/eca71064ecce44b0a25ce940eb8f053d/oidc",
    uu_plus4u5g02_identityManagementBaseUri:
      "https://uuapp-dev.plus4u.net/uu-identitymanagement-maing01/58ceb15c275c4b31bfe0fc9768aa6a9c",
    uu5g05_componentUveUri:
      "https://uuapp.plus4u.net/uu-plus4ugo-maing01/f34b62a867db4bd89490534bb26451ad/component/render",
  };
} else {
  exampleConfig.baseUri = "https://uuapp.plus4u.net/uu-jokes-maing01/2d2bd544eacf44b78e5ccaf16aa38b10";
  exampleConfig.oid = "611f837dfbb7bd0027e3b405";
}

window.exampleConfig = exampleConfig;
