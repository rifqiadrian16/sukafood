<template>
  <div class="map-wrapper">
    <router-link to="/" class="btn-home">
      <i class="fas fa-arrow-left"></i>
      <span class="text-home">Beranda</span>
    </router-link>

    <div v-if="infoCuaca.temp !== null" id="weather-widget">
      <img :src="infoCuaca.icon" alt="Ikon Cuaca" />
      <div class="weather-info">
        <span class="temp">{{ infoCuaca.temp }}°C</span>
        <span class="desc">{{ infoCuaca.desc }}</span>
      </div>
    </div>

    <div id="filter-container" ref="filterContainerRef">
      <div v-if="isRainLayerActive" id="legend-rain">
        <div class="legend-header">Intensitas Hujan</div>
        <div class="rain-gradient-bar"></div>
        <div class="legend-labels">
          <span>Ringan</span>
          <span>Sedang</span>
          <span>Lebat</span>
        </div>
      </div>

      <div class="search-box">
        <i class="fas fa-search"></i>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari kuliner"
          @input="onSearchInput"
          @focus="onSearchFocus"
        />
      </div>

      <div
        class="filter-buttons"
        ref="scrollContainer"
        @mousedown="startDrag"
        @mouseleave="stopDrag"
        @mouseup="stopDrag"
        @mousemove="onDrag"
      >
        <button
          class="btn-filter"
          :class="{ active: filterAktif === 'all' }"
          @click="gantiFilter('all')"
        >
          Semua
        </button>
        <button
          v-for="kategori in daftarKategori"
          :key="kategori"
          class="btn-filter"
          :class="{ active: filterAktif === kategori }"
          @click="gantiFilter(kategori)"
        >
          {{ kategori }}
        </button>
      </div>
    </div>

    <div class="map-controls">
      <ChatAI />

      <button class="btn-control" @click="toggleFullscreen" title="Layar Penuh">
        <i class="fas" :class="isFullscreen ? 'fa-compress' : 'fa-expand'"></i>
      </button>

      <button class="btn-control" @click="cariLokasiSaya" title="Lokasi Saya">
        <i class="fas fa-crosshairs"></i>
      </button>
    </div>

    <transition name="fade">
      <button v-if="isRouteActive" class="btn-close-route" @click="hapusRute">
        <i class="fas fa-times"></i> Tutup Rute
      </button>
    </transition>

    <div id="map" ref="mapContainer" :class="zoomClass"></div>
  </div>
</template>

<script setup>
// Expose function ke window agar bisa dipanggil dari string HTML popup
window.panggilRute = (lat, lng) => {
  buatRuteKeTujuan(lat, lng);
};

import { onMounted, onUnmounted, ref } from "vue";
import ChatAI from "./ChatAI.vue";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// --- STATE ---
const routingControl = ref(null);
const isRouteActive = ref(false);
const zoomClass = ref("");
const isFullscreen = ref(false);
const map = ref(null);
const pointsLayer = ref(null);
const filterAktif = ref("all");
const dataKulinerMentah = ref(null);
const searchQuery = ref("");
const daftarKategori = ref([]);
const infoCuaca = ref({ temp: null, desc: "", icon: "" });
const isRainLayerActive = ref(false);

// --- DRAG SCROLL FILTER ---
const filterContainerRef = ref(null);
const scrollContainer = ref(null);
let isDown = false;
let startX;
let scrollLeft;

function startDrag(e) {
  isDown = true;
  startX = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeft = scrollContainer.value.scrollLeft;
  scrollContainer.value.style.cursor = "grabbing";
}

function stopDrag() {
  isDown = false;
  if (scrollContainer.value) scrollContainer.value.style.cursor = "grab";
}

function onDrag(e) {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX) * 2;
  scrollContainer.value.scrollLeft = scrollLeft - walk;
}

// --- KONFIGURASI API ---
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const KOTA_LAT = -6.921;
const KOTA_LON = 106.927;

const iconConfig = {
  iconSize: [32, 32],
  iconAnchor: [14, 28],
  popupAnchor: [0, -25],
  shadowSize: [30, 30],
};
const iconCafe = L.icon({ ...iconConfig, iconUrl: "/images/coffee-cup.png" });
const iconDefault = L.icon({ ...iconConfig, iconUrl: "/images/resto.png" });
const iconUser = L.icon({
  ...iconConfig,
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535137.png",
  className: "marker-user",
});

// --- LIFECYCLE ---
onMounted(() => {
  // Fix Race Condition: Beri jeda agar animasi halaman/fullscreen selesai dulu
  setTimeout(() => {
    initMap();
    loadData();
    loadCuaca();
  }, 500);

  document.addEventListener("fullscreenchange", () => {
    isFullscreen.value = !!document.fullscreenElement;
    // Fix Peta Grey Area saat resize
    setTimeout(() => {
      if (map.value) map.value.invalidateSize();
    }, 200);
  });
});

onUnmounted(() => {
  if (map.value) {
    map.value.remove();
    map.value = null;
  }
});

if (filterContainerRef.value) {
  L.DomEvent.disableScrollPropagation(filterContainerRef.value);
  L.DomEvent.disableClickPropagation(filterContainerRef.value);
}

// --- FUNCTIONS ---

async function loadCuaca() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${KOTA_LAT}&lon=${KOTA_LON}&appid=${API_KEY}&units=metric&lang=id`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.weather && data.weather.length > 0) {
      infoCuaca.value = {
        temp: Math.round(data.main.temp),
        desc: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      };
    }
  } catch (err) {
    console.error("Gagal memuat cuaca:", err);
  }
}

function initMap() {
  map.value = L.map("map", { zoomControl: false, preferCanvas: false }).setView(
    [KOTA_LAT, KOTA_LON],
    14
  );

  // Zoom Control di Kanan Bawah
  L.control.zoom({ position: "bottomright" }).addTo(map.value);

  // Logic Zoom Class (CSS Marker Size)
  map.value.on("zoomend", () => {
    const z = map.value.getZoom();
    if (z >= 16) zoomClass.value = "zoom-large";
    else if (z >= 14) zoomClass.value = "zoom-normal";
    else if (z === 13) zoomClass.value = "zoom-small";
    else zoomClass.value = "zoom-hidden";
  });

  // Layers
  const osm = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    { attribution: "© OpenStreetMap" }
  );
  const darkMap = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    { attribution: "© CARTO", subdomains: "abcd", maxZoom: 20 }
  );
  const rainLayer = L.tileLayer(
    `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`,
    { attribution: "© OpenWeatherMap", maxZoom: 18, opacity: 0.8 }
  );

  osm.addTo(map.value);

  // Layer Groups
  pointsLayer.value = L.layerGroup().addTo(map.value); // Kuliner AKTIF default
  const batasLayer = L.layerGroup(); // Batas wilayah TIDAK AKTIF default

  // Event Listener Legend Hujan
  map.value.on("overlayadd", (e) => {
    if (e.name === "Curah Hujan (Live)") isRainLayerActive.value = true;
  });
  map.value.on("overlayremove", (e) => {
    if (e.name === "Curah Hujan (Live)") isRainLayerActive.value = false;
  });

  // Layer Control
  const baseMaps = { "Peta Jalan": osm, "Peta Malam": darkMap };
  const overlayMaps = {
    "Titik Kuliner": pointsLayer.value,
    "Batas Wilayah": batasLayer,
    "Curah Hujan (Live)": rainLayer,
  };

  function updateLayerPosition() {
    const isMobile = window.innerWidth <= 600;
    // Jika mobile, taruh di kanan bawah (dekat zoom), jika desktop kanan atas
    // Sesuaikan preferensi Anda
    const posisi = isMobile ? "bottomright" : "topright";

    // Hapus control lama jika ada agar tidak duplikat
    // (Implementasi sederhana: overwrite logic control layers leaflet)
    // Disini kita biarkan default leaflet behavior atau update dinamis
    // Untuk simplifikasi, kita pakai topright saja agar konsisten
  }

  L.control
    .layers(baseMaps, overlayMaps, { position: "topright" })
    .addTo(map.value);

  // Load GeoJSON Batas Wilayah
  fetch("/batas_wilayah.geojson")
    .then((res) => res.json())
    .then((data) => {
      L.geoJSON(data, {
        style: { color: "#0000FF", weight: 2, opacity: 0.6, fillOpacity: 0.05 },
        smoothFactor: 1,
        noClip: true,
      }).addTo(batasLayer);
    })
    .catch((err) => console.error("Gagal load batas:", err));
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
    isFullscreen.value = true;
  } else {
    document.exitFullscreen();
    isFullscreen.value = false;
  }
}

function loadData() {
  fetch("/kuliner.geojson")
    .then((res) => res.json())
    .then((data) => {
      dataKulinerMentah.value = data;
      daftarKategori.value = [
        ...new Set(data.features.map((f) => f.properties.Jenis_Kuliner)),
      ];
      tampilkanData(data);
    });
}

function tampilkanData(dataGeoJSON) {
  pointsLayer.value.clearLayers();
  L.geoJSON(dataGeoJSON, {
    pointToLayer: (feature, latlng) => {
      const jenis = (feature.properties.Jenis_Kuliner || "").toLowerCase();
      const isCafe = ["café", "cafe", "kopi", "kue", "roti"].some((k) =>
        jenis.includes(k)
      );
      return L.marker(latlng, { icon: isCafe ? iconCafe : iconDefault });
    },
    onEachFeature: (feature, layer) => {
      const props = feature.properties;
      // Gambar Dummy sesuai kategori
      let gambarUrl =
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400";
      const jenis = (props.Jenis_Kuliner || "").toLowerCase();
      if (jenis.includes("bubur"))
        gambarUrl =
          "https://images.unsplash.com/photo-1563895351829-9231f82173f4?w=400";
      else if (jenis.includes("mi") || jenis.includes("bakso"))
        gambarUrl =
          "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=400";
      else if (jenis.includes("kopi"))
        gambarUrl =
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400";

      const popupContent = `
        <div style="text-align:center; min-width: 180px;">
          <img src="${gambarUrl}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px 8px 0 0; margin-bottom: 5px;">
          <h4 style="color: #ff9f1c; margin: 5px 0; font-size: 1rem;">${props.Nama_Tempat}</h4>
          <span style="background:#eee; padding:2px 8px; border-radius:4px; font-size:0.7rem; color: #555;">${props.Jenis_Kuliner}</span>
          <p style="margin: 8px 0; font-size: 0.85rem;">⭐ <b>${props.Rating}</b> (${props.Jumlah_Review})</p>
          <button onclick="panggilRute(${feature.geometry.coordinates[1]}, ${feature.geometry.coordinates[0]})"
            style="width:100%; background: #2ec4b6; color: white; border:none; padding: 8px; border-radius: 4px; cursor:pointer; margin-top:5px;">
            <i class="fas fa-route"></i> Rute Jalan (In-App)
          </button>
        </div>
      `;
      layer.bindPopup(popupContent);
    },
  }).addTo(pointsLayer.value);
}

function onSearchFocus(event) {
  setTimeout(() => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 300);
}

function onSearchInput() {
  filterAktif.value = "all";
  prosesFilter();
}

function prosesFilter() {
  if (!dataKulinerMentah.value) return;
  const query = searchQuery.value.toLowerCase();
  const kategori = filterAktif.value;

  const hasilFilter = dataKulinerMentah.value.features.filter((feature) => {
    const props = feature.properties;
    const namaTempat = props.Nama_Tempat.toLowerCase();
    const jenisKuliner = props.Jenis_Kuliner;
    const matchSearch = namaTempat.includes(query);
    const matchKategori = kategori === "all" || jenisKuliner === kategori;
    return matchSearch && matchKategori;
  });

  tampilkanData({ type: "FeatureCollection", features: hasilFilter });
}

function gantiFilter(kategori) {
  filterAktif.value = kategori;
  prosesFilter();
}

function cariLokasiSaya() {
  if (!navigator.geolocation) {
    alert("Browser anda tidak mendukung GeoLocation!");
    return;
  }
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    map.value.flyTo([latitude, longitude], 18);
    L.marker([latitude, longitude], { icon: iconUser })
      .addTo(map.value)
      .bindPopup("Lokasi Anda")
      .openPopup();
  });
}

function hapusRute() {
  if (routingControl.value) {
    map.value.removeControl(routingControl.value);
    routingControl.value = null;
    isRouteActive.value = false;
  }
}

function buatRuteKeTujuan(latTujuan, lngTujuan) {
  if (!navigator.geolocation) {
    alert("GPS mati/tidak didukung");
    return;
  }
  navigator.geolocation.getCurrentPosition((pos) => {
    const { latitude, longitude } = pos.coords;
    hapusRute();

    routingControl.value = L.Routing.control({
      waypoints: [
        L.latLng(latitude, longitude),
        L.latLng(latTujuan, lngTujuan),
      ],
      routeWhileDragging: false,
      language: "en",
      show: true,
      lineOptions: {
        styles: [
          { color: "white", opacity: 0.9, weight: 9 },
          { color: "#4285F4", opacity: 1, weight: 6 },
        ],
      },
      serviceUrl: "https://router.project-osrm.org/route/v1",
      createMarker: () => null,
    }).addTo(map.value);

    isRouteActive.value = true;
    map.value.closePopup();
  });
}
</script>

<style scoped>
.map-wrapper {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

#map {
  height: 100%;
  width: 100%;
  z-index: 1;
}

/* --- MAP CONTROLS (Fullscreen & GPS) --- */
.map-controls {
  position: absolute;
  bottom: 100px;
  right: 10px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-control {
  background: white;
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  color: #333;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.btn-control:hover {
  background: #f4f4f4;
  color: #ff9f1c;
}

.btn-control:active {
  background: #e9e9e9;
  transform: scale(0.95);
}

/* --- HOME BUTTON --- */
.btn-home {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: white;
  padding: 10px 15px;
  border-radius: 50px;
  text-decoration: none;
  color: #333;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;
}

.btn-home:hover {
  background: #ff9f1c;
  color: white;
}

/* --- FILTER CONTAINER --- */
#filter-container {
  position: absolute;
  bottom: 25px;
  left: 0;
  z-index: 1000;
  width: 100%;
  padding: 0 15px;
  box-sizing: border-box;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.search-box {
  pointer-events: auto;
  background: white;
  padding: 8px 15px;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 400px;
  transition: 0.3s;
}

.search-box i {
  color: #888;
  margin-right: 10px;
}

.search-box input {
  border: none;
  outline: none;
  width: 100%;
  font-family: "Poppins", sans-serif;
  font-size: 0.95rem;
  color: #333;
}

.filter-buttons {
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto;
  width: 100%;
  max-width: 600px;
  padding-bottom: 5px;
  justify-content: flex-start;
  cursor: grab;
  pointer-events: auto;
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;
  z-index: 1002;
  user-select: none;
  scrollbar-width: none;
}
.filter-buttons::-webkit-scrollbar {
  display: none;
}

.btn-filter {
  pointer-events: auto;
  background: white;
  border: 1px solid #ddd;
  color: #555;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.btn-filter.active {
  background: #ff9f1c;
  color: white;
  border-color: #ff9f1c;
  box-shadow: 0 4px 8px rgba(255, 159, 28, 0.4);
  font-weight: 600;
}

/* --- LEGEND & WEATHER --- */
#legend-rain {
  background: rgba(255, 255, 255, 0.95);
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  width: 160px;
  text-align: center;
  pointer-events: auto;
  margin-bottom: 5px;
}
.legend-header {
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
.rain-gradient-bar {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(to right, #95b6ff, #7d4199, #c93c83, #ffe600);
  margin-bottom: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.legend-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: #666;
}

#weather-widget {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  padding: 5px 15px 5px 5px;
  border-radius: 50px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 5px;
}
#weather-widget img {
  width: 40px;
  height: 40px;
}
.weather-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}
.weather-info .temp {
  font-weight: bold;
  font-size: 1rem;
  color: #333;
}
.weather-info .desc {
  font-size: 0.75rem;
  color: #666;
  text-transform: capitalize;
}

/* --- BUTTON CLOSE ROUTE --- */
.btn-close-route {
  position: absolute;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background-color: #ff9f1c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(230, 151, 4, 0.445);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;
  font-family: "Poppins", sans-serif;
}
.btn-close-route:hover {
  background-color: #cc7e12;
}

/* --- MARKER STYLES (ZOOM) --- */
:deep(.leaflet-marker-icon) {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: bottom center;
}
.zoom-large :deep(.leaflet-marker-icon) {
  width: 36px !important;
  height: 36px !important;
  margin-left: -18px !important;
  margin-top: -36px !important;
  z-index: 1000 !important;
}
.zoom-small :deep(.leaflet-marker-icon) {
  width: 18px !important;
  height: 18px !important;
  margin-left: -9px !important;
  margin-top: -18px !important;
  opacity: 0.8;
}
.zoom-hidden :deep(.leaflet-marker-icon),
.zoom-hidden :deep(.leaflet-marker-shadow) {
  width: 0 !important;
  height: 0 !important;
  opacity: 0;
  pointer-events: none;
}

/* --- RESPONSIVE MOBILE --- */
@media (max-width: 600px) {
  .btn-close-route {
    bottom: 220px; /* Di atas kontrol peta */
    width: auto;
    white-space: nowrap;
  }

  /* Geser kontrol peta agak naik agar tidak tertutup filter */
  .map-controls {
    bottom: 140px;
    right: 10px;
  }

  :deep(.leaflet-control-zoom) {
    display: none !important; /* Hilangkan zoom bawaan di HP */
  }

  :deep(.leaflet-touch .leaflet-control-layers-toggle) {
    width: 35px;
    height: 35px;
  }

  /* Atur posisi tombol layer leaflet */
  :deep(.leaflet-top.leaflet-right) {
    top: 80px; /* Di bawah tombol back */
  }

  .btn-home .text-home {
    display: none;
  }

  #filter-container {
    bottom: 20px;
    gap: 6px;
    padding: 0 10px;
  }
  .btn-filter {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}
</style>
