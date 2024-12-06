import './styles/tailwind.css';
import './style.css';
import app from './app';
import pinia from './pinia';
import router from './router';

app.use(pinia);
app.use(router);

app.mount('#app');