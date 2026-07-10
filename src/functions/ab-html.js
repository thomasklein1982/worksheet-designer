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
      globalAttrs: false
    },
  }
});

export default abHtml;