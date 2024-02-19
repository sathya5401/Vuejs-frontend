import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'; // Vue router
import 'bootstrap/dist/css/bootstrap.min.css';

// Creating a Vue application instance
const app = createApp(App)


// Registering Vue Router with the application
app.use(router)


// Mounting the application to an HTML element with id 'app'
app.mount('#app')
