import {html} from "@codemirror/lang-html"

const textTags=["div","abc","abstand","bild","box","grafik","formel","titel","mathe-trainer","hessenkasten","daneben","zentriert"];
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
        "titel": null,
        punkte: null
      },
      globalAttrs: false,
      children: textTags
    },
    "abc": {
      attrs: {
        "spalten": ["1","2","3","4","5","6","7"],
        zeichen: ["a)","1)","1.", "(A)", "◼"]
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
    },
    setup: {
      attrs: {
        papier: ["21x29.7","29.7x21","14.8x21","21x14.8"],
        punkte: ["(# P)","#P"],
        aufgabe: ["#aufgabe","A#aufgabe","#aufgabe."]
      },
      globalAttrs: false,
      children: null
    },
    bild: {
      attrs: {
        datei: null,
        breite: ["3cm"],
        hoehe: ["3cm"],
        links: ["0cm"],
        rechts: ["0cm"],
        oben: ["0cm"],
        unten: ["0cm"],
      },
      globalAttrs: false,
      children: null
    },
    box: {
      attrs: {
        links: ["0cm"],
        rechts: ["0cm"],
        oben: ["0cm"],
        unten: ["0cm"],
      },
      globalAttrs: false,
      children: textTags.concat(["aufgabe","material"])
    },
    hessenkasten: {
      attrs: {
        breite: ["4cm","5cm","6cm","7cm","8cm"]
      },
      globalAttrs: false,
      children: textTags
    },
    titel: {

    },
    "mathe-trainer": {
      attrs: {
        link: null,
        nummer: ["1","2","3","4","5","6","7","8","9"],
        spalten: ["1","2","3","4"],
        hoehe: ["1cm","2cm","3cm","4cm","5cm","6cm"],
        seed: ["1","2","3","4","5"]
      },
      globalAttrs: false,
      children: null
    },
    fragment: {
      attrs: {
        name: null,
      },
      globalAttrs: false,
      children: null
    },
    weblink: {
      attrs: {
        
      },
      globalAttrs: false,
      children: null
    },
    daneben: {
      attrs: {
        links: null
      },
      globalAttrs: false,
      children: textTags
    },
    zentriert: {
      globalAttrs: false,
      children: textTags
    }
  }
});

export default abHtml;