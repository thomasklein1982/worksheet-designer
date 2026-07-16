import {html} from "@codemirror/lang-html"

const textTags=["div","abc","abstand","bild","box","grafik","formel"];
const topTags=["fusszeile","kopfzeile","seite"];
const graphicTags=["karopapier","kreis","ksystem"];

const abHtml=html({
  selfClosingTags: true,

  extraTags: {
    "seite": {
      attrs: {
        "titel": null
      },
      globalAttrs: false,
      children: textTags.concat(["aufgabe","material"])
    },
    "aufgabe": {
      attrs: {
        "titel": null
      },
      globalAttrs: false,
      children: textTags
    },
    "abc": {
      attrs: {
        "zeilen": ["1","2","3","4","5","6","7"],
        "spalten": ["1","2","3","4","5","6","7"]
      },
      globalAttrs: false,
      children: ["div","box","formel"]
    },
    "formel": {
      attrs: {
        "block": null
      },
      globalAttrs: false,
      children: []
    },
    "abstand": {
      attrs: {
        "x": ["1cm","2.5cm"],
        "y": ["1cm","2.5cm"]
      },
      globalAttrs: false,
      children: []
    },
    "grafik": {
      attrs: {
        "min-x": ["0"],
        "max-x": ["10"],
        "min-y": ["0"],
        "max-y": ["10"],
        "zoom-x": ["1"],
        "zoom-y": ["1"]
      },
      globalAttrs: false,
      children: graphicTags
    }
  }
});

export default abHtml;