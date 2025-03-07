import { Utils } from "uu5g05";

class Lsi {
  /* Temporary solution from uu5 team. Official utility will be published in uu5 */
  static parseLsiOrPlainText(uu5string) {
    if (!uu5string) return undefined;
    if (typeof uu5string !== "string" || !uu5string.match(Utils.Uu5String.REGEXP.uu5string)) return uu5string;
    let lsi = {};
    let content = Utils.Uu5String.parse(uu5string);
    let allText = Utils.Uu5String.contentToChildren(content, {
      buildChildFn: (tag, props, children) => {
        let text;
        if (props.lsi && typeof props.lsi === "object") {
          lsi = props.lsi;
        } else {
          let flatArray = children != null ? [children].flat(Infinity) : [];
          text = flatArray.join("");
          if (tag === "UU5.Bricks.Lsi.Item" && props?.language) {
            lsi[props?.language] = text;
          }
        }
        return text;
      },
    });
    let result = Object.keys(lsi).length > 0 ? lsi : Array.isArray(allText) ? allText.join("") : undefined;
    return result;
  }
}

export { Lsi };
export default Lsi;
