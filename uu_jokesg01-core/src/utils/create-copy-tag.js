import UU5 from "uu5g04";

const BLACKLISTED_COPY_PROPS = ["getEditablePropValue", "generatedId", "parent", "_registerOnDccModalClose", "ref_"];
const STANDARD_VISUAL_PROPS = ["colorSchema", "elevation", "bgStyle", "borderRadius", "padding", "cardView"];

export default function createCopyTag(tag, props, useProps = [], defaultProps = {}) {
  const allowedProps = [...STANDARD_VISUAL_PROPS, ...useProps];
  const tagProps = {};

  Object.keys(props).forEach((propKey) => {
    if (
      props[propKey] != null &&
      defaultProps[propKey] !== props[propKey] &&
      !BLACKLISTED_COPY_PROPS.includes(propKey) &&
      allowedProps.includes(propKey)
    ) {
      tagProps[propKey] = props[propKey];
    }
  });

  return new UU5.Common.UU5String([{ tag, props: tagProps }]).toString();
}
