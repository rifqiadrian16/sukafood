import { createRouter, createWebHistory } from "vue-router";
import Beranda from "./components/Beranda.vue";
import PetaWisata from "./components/PetaWisata.vue";

const routes = [
  { path: "/", component: Beranda }, // Halaman awal buka Beranda
  { path: "/peta", component: PetaWisata }, // URL /peta buka PetaWisata
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
