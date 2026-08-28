<template>
  <div id="wrapper">
    <div ref="parent">

    </div>
  </div>
</template>

<script>
import {EditorState} from "@codemirror/state";
import {
  EditorView, keymap, highlightSpecialChars, drawSelection,
  highlightActiveLine, dropCursor, rectangularSelection,
  crosshairCursor, lineNumbers, highlightActiveLineGutter
} from "@codemirror/view"
import {
  defaultHighlightStyle, syntaxHighlighting, indentOnInput,
  bracketMatching, foldGutter, foldKeymap
} from "@codemirror/language"
import {
  defaultKeymap, history, historyKeymap, indentWithTab
} from "@codemirror/commands"
import {
  searchKeymap, highlightSelectionMatches
} from "@codemirror/search"
import {
  autocompletion, completionKeymap, closeBrackets,
  closeBracketsKeymap
} from "@codemirror/autocomplete"
import {lintKeymap} from "@codemirror/lint"
import { html } from "@codemirror/lang-html";
import abHtml from "../functions/ab-html";
import createFullHtmlCode from "../functions/createHtmlCode";


export default{
  props: {
    syncObject: Object,
    syncAttribute: String,
    language: String
  },
  components: {

  },
  data(){
    return {
      editor: null
    }
  },
  mounted(){
    let lang;
    if(this.language==="ab-html"){
      lang=abHtml;
    }
    let timer=null;
    this.editor = new EditorView({
      doc: this.syncObject[this.syncAttribute],
      parent: this.$refs.parent,
      extensions: [
        EditorView.updateListener.of((update)=>{
          if(!update.docChanged) return;
          if(timer) clearTimeout(timer);
          timer=setTimeout(()=>{
            let code=this.getText();
            if(this.syncAttribute==="html"){
              let tree=update.state.tree;
              this.syncObject.realHtml=createFullHtmlCode(this.$root.getCurrentAB(),code,tree);
            }
            this.syncObject[this.syncAttribute]=code;
            this.$emit("change");
          },500);
        }),
        lang,
        EditorView.lineWrapping,
        // A line number gutter
        lineNumbers(),
        // A gutter with code folding markers
        foldGutter(),
        // Replace non-printable characters with placeholders
        highlightSpecialChars(),
        // The undo history
        history(),
        // Replace native cursor/selection with our own
        drawSelection(),
        // Show a drop cursor when dragging over the editor
        dropCursor(),
        // Allow multiple cursors/selections
        EditorState.allowMultipleSelections.of(true),
        // Re-indent lines when typing specific input
        indentOnInput(),
        // Highlight syntax with a default style
        syntaxHighlighting(defaultHighlightStyle),
        // Highlight matching brackets near cursor
        bracketMatching(),
        // Automatically close brackets
        closeBrackets(),
        // Load the autocompletion system
        autocompletion(),
        // Allow alt-drag to select rectangular regions
        rectangularSelection(),
        // Change the cursor to a crosshair when holding alt
        crosshairCursor(),
        // Style the current line specially
        highlightActiveLine(),
        // Style the gutter for current line specially
        highlightActiveLineGutter(),
        // Highlight text that matches the selected text
        highlightSelectionMatches(),
        keymap.of([
          // Closed-brackets aware backspace
          ...closeBracketsKeymap,
          // A large set of basic bindings
          ...defaultKeymap,
          // Search-related keys
          ...searchKeymap,
          // Redo/undo keys
          ...historyKeymap,
          // Code folding bindings
          ...foldKeymap,
          // Autocompletion keys
          ...completionKeymap,
          // Keys related to the linter system
          ...lintKeymap,
          indentWithTab
        ])
      ],
    });
  },
  methods: {
    getText(){
      return this.editor.state.doc.toString();
    },
    setText(code){
      let view=this.editor;
      view.dispatch({changes: {
        from: 0,
        to: view.state.doc.length,
        insert: code
      }});
    },
    updateText(){
      this.setText(this.syncObject[this.syncAttribute]);
    }
  }
}
</script>

<style scoped>
#wrapper{
  overflow: auto;
  display: flex;
  flex-direction: column;
}

#wrapper>div{
  flex: 1;
}

</style>

<style>
  .cm-editor{
    height: 100%;
  }
</style>