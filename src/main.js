import { createApp, defineCustomElement } from 'vue'
import './style.css';
import App from './App.vue'

const app = createApp(App);


createApp(App).mount('#app');

import aufgabeCe from './components/ab-aufgabe.ce.vue';
import AbArbeitsblattCe from './components/ab-arbeitsblatt.ce.vue';
import AbTeilaufgabenCe from './components/ab-teilaufgaben.ce.vue';
import AbFormelCe from './components/ab-formel.ce.vue';

customElements.define("ab-aufgabe",defineCustomElement(aufgabeCe));
customElements.define("ab-arbeitsblatt",defineCustomElement(AbArbeitsblattCe));
customElements.define("ab-teilaufgaben",defineCustomElement(AbTeilaufgabenCe));
customElements.define("ab-formel",defineCustomElement(AbFormelCe));
