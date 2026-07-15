import { createApp, defineCustomElement } from 'vue'
import './style.css';
import App from './App.vue';
const app = createApp(App);
app.mount('#app');

async function fetchFiles(){
  let f;
  f=await fetch("./katex/katex.min.js");
  window.additionalCode="<script>\n"+await f.text()+"\n</script>\n";
  f=await fetch("./katex/katex.min.css");
  window.additionalCode+="<style>\n"+await f.text()+"\n</style>";
  f=await fetch("./katex/fonts.css");
  window.additionalCode+="<style>\n"+await f.text()+"\n</style>";
  f=await fetch("./ab-styles.css");
  window.additionalCode+="<style>\n"+await f.text()+"\n</style>";
}

setTimeout(fetchFiles,100);