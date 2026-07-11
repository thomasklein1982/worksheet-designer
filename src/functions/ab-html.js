import {html} from "@codemirror/lang-html"

const abHtml=html({
  selfClosingTags: true,

  extraTags: {
    "ab-arbeitsblatt": {
      attrs: {
        "titel": null
      },
      globalAttrs: false,
      children: [
        "ab-aufgabe", "div"
      ]
    },
    "ab-aufgabe": {
      attrs: {
        "titel": null
      },
      globalAttrs: false,
      children: ["ab-teilaufgaben","div"]
    },
    "ab-teilaufgaben": {
      attrs: {
        "zeilen": ["1","2","3","4","5","6","7"],
        "spalten": ["1","2","3","4","5","6","7"]
      },
      globalAttrs: false,
      children: ["ab-formel","div"]
    },
    "ab-formel": {
      attrs: {
        "tex": ["\\frac12-0,45"],
        "block": null
      },
      globalAttrs: false,
      children: []
    }
  }
});

export default abHtml;