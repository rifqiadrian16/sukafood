import { createApp } from "vue";
import "leaflet/dist/leaflet.css";
import "./style.css"; // CSS Global Anda (dari style.css lama)
import App from "./App.vue";
import router from "./router"; // Import router

const app = createApp(App);
app.use(router); // Gunakan router
app.mount("#app");
