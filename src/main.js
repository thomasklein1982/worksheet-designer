import { createApp, defineCustomElement } from 'vue'
import './style.css';
import App from './App.vue';
const app = createApp(App);
app.mount('#app');

import aufgabeCe from './components/ab-aufgabe.ce.vue';
import AbArbeitsblattCe from './components/ab-arbeitsblatt.ce.vue';
import AbTeilaufgabenCe from './components/ab-teilaufgaben.ce.vue';
import AbFormelCe from './components/ab-formel.ce.vue';


customElements.define("ab-aufgabe",defineCustomElement(aufgabeCe));
customElements.define("ab-arbeitsblatt",defineCustomElement(AbArbeitsblattCe));
customElements.define("ab-teilaufgaben",defineCustomElement(AbTeilaufgabenCe));
customElements.define("ab-formel",defineCustomElement(AbFormelCe));
//customElements.define("ab-grafik",defineCustomElement(AbGrafikCe));
//customElements.define("grafik-kreis",defineCustomElement(GrafikKreisCe));
//customElements.define("ab-strecke",defineCustomElement(AbStreckeCe));
//customElements.define("grafik-karopapier",defineCustomElement(GrafikKaropapierCe));
//customElements.define("grafik-grid",defineCustomElement(GrafikGridCe));
//customElements.define("grafik-achse",defineCustomElement(GrafikAchseCe));
//customElements.define("grafik-system",defineCustomElement(GrafikSystemCe));
