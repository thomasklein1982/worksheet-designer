import { createApp, defineCustomElement } from 'vue'
import './style.css';
import App from './App.vue'

const app = createApp(App);


createApp(App).mount('#app');

import aufgabeCe from './components/ab-aufgabe.ce.vue';
import AbArbeitsblattCe from './components/ab-arbeitsblatt.ce.vue';
import AbTeilaufgabenCe from './components/ab-teilaufgaben.ce.vue';
import AbFormelCe from './components/ab-formel.ce.vue';
import AbGrafikCe from './components/ab-grafik.ce.vue';
import GrafikKaropapierCe from './components/grafik-karopapier.ce.vue';
import GrafikGridCe from './components/grafik-grid.ce.vue';
import GrafikAchseCe from './components/grafik-achse.ce.vue';
import GrafikSystemCe from './components/grafik-system.ce.vue';
import AbStreckeCe from './components/ab-strecke.ce.vue';

customElements.define("ab-aufgabe",defineCustomElement(aufgabeCe));
customElements.define("ab-arbeitsblatt",defineCustomElement(AbArbeitsblattCe));
customElements.define("ab-teilaufgaben",defineCustomElement(AbTeilaufgabenCe));
customElements.define("ab-formel",defineCustomElement(AbFormelCe));
customElements.define("ab-grafik",defineCustomElement(AbGrafikCe));
customElements.define("ab-strecke",defineCustomElement(AbStreckeCe));
//customElements.define("grafik-karopapier",defineCustomElement(GrafikKaropapierCe));
//customElements.define("grafik-grid",defineCustomElement(GrafikGridCe));
//customElements.define("grafik-achse",defineCustomElement(GrafikAchseCe));
//customElements.define("grafik-system",defineCustomElement(GrafikSystemCe));
