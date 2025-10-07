import { createPinia } from 'pinia';
import { createApp } from 'vue';

import 'normalize.css';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
const container = document.createElement('div');
const main = () => {
  app.mount(container);
  document.body.appendChild(container);
};

main();
