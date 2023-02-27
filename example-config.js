// this file is added to the bundle as assets/example-config.js and can be used in demos for loader configuration
// ("imports" variable below is automatically computed & replaced during build)

// uses ES5 syntax
(function () {
  var cdnBaseUri = new URL(document.currentScript.getAttribute("data-orig-src") || document.currentScript.src).origin;
  var imports = {}; // this line will be auto-replaced by devkit
  for (var k in imports) imports[k] = new URL(imports[k], cdnBaseUri).toString();

  // prettier-ignore
  {
    imports["immutable"] = "https://cdn.plus4u.net/libs/immutable/3.8.2/immutable.min.js";
    imports["uu_plus4u5g02-app"] = "https://cdn.plus4u.net/uu-plus4u5g02/1.0.0/uu_plus4u5g02-app.min.js";
    imports["uu5g05-dev"] = "https://cdn.plus4u.net/uu-uu5g05/1.0.0/uu5g05-dev.min.js";
    imports["uu5richtextg01"] = "https://cdn.plus4u.net/uu-uu5richtextg01/1.0.0/uu5richtextg01.min.js";
    imports["uu_editablecomponentcontentg03"] = "https://cdn.plus4u.net/uu-editablecomponentcontentg03/3.0.0/uu_editablecomponentcontentg03.min.js";
    imports["uu_applibraryregistryg01-bricks"] = "https://cdn.plus4u.net/uu-applibraryregistryg01/1.0.0/uu_applibraryregistryg01-bricks.min.js";
    imports["uu5codekitg01"] = "https://cdn.plus4u.net/uu-uu5codekitg01/1.0.0/uu5codekitg01.min.js";
  }

  window.Uu5Loader.config({ imports });
})();

const exampleConfig = {};

if (!window.location.hostname === "localhost") {
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
  exampleConfig.baseUri = "https://uuapp-dev.plus4u.net/uu-jokes-maing01/2d2bd544eacf44b78e5ccaf16aa38b10";
  exampleConfig.oid = "6343df6292c5fb0027c276b7";
}

window.exampleConfig = exampleConfig;
