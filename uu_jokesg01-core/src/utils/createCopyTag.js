const BLACKLISTED_COPY_PROPS = ["getEditablePropValue", "generatedId", "parent", "_registerOnDccModalClose", "ref_"];
const STANDARD_VISUAL_PROPS = ["colorSchema", "elevation", "bgStyle", "borderRadius", "padding", "cardView"];

export default function createCopyTag(tagName, props, useProps = [], defaultProps = {}) {
  const useMergedProps = [...STANDARD_VISUAL_PROPS, ...useProps];
  let tagProps = Object.keys(props)
    .filter(
      (propKey) =>
        props[propKey] != null &&
        defaultProps[propKey] !== props[propKey] &&
        !BLACKLISTED_COPY_PROPS.includes(propKey) &&
        useMergedProps.includes(propKey)
    )
    .map((propsKey) => {
      let base = `${propsKey}=`;
      switch (typeof props[propsKey]) {
        case "boolean":
          return base + `${JSON.stringify(props[propsKey])}`;
        case "number":
          return base + `${props[propsKey]}`;
        case "string":
        default:
          return base + `"${props[propsKey]}"`;
      }
    });

  return `<${tagName} ${tagProps.join(" ")}${tagProps.length ? " " : ""}/>`;
}
