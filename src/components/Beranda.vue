<!-- <template>
  <div>
    <nav>
      <div class="logo"><span>Suka</span>Food</div>

      <div class="menu-toggle" @click="toggleMenu">
        <i class="fas" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </div>

      <div class="nav-links" :class="{ active: isMenuOpen }">
        <a href="#hero">Beranda</a>
        <a href="#about">Tentang</a>
        <router-link to="/peta" @click="tutupMenu">Peta</router-link>
      </div>
    </nav>

    <section id="hero">
      <h1>Jelajahi Cita Rasa<br />Autentik Sukabumi</h1>
      <p>
        Temukan kuliner legendaris dan rencanakan rute wisata kuliner Anda
        dengan efisien. Dari Bubur Ayam hingga Mochi, semua ada di peta ini.
      </p>

      <router-link to="/peta" class="btn-cta">
        Mulai Petualangan Rasa <i class="fas fa-utensils"></i>
      </router-link>
    </section>

    <section id="about">
      <h2>Mengapa Website Ini Dibuat?</h2>
      <p>
        Kota Sukabumi memiliki kekayaan kuliner yang luar biasa. Namun,
        wisatawan sering kesulitan menemukan lokasi terbaik dan merancang
        perjalanan yang efisien. <br /><br />
        <strong>Proyek Sistem Informasi Geografis (SIG)</strong> ini bertujuan
        memetakan destinasi kuliner populer dan membantu Anda memaksimalkan
        pengalaman wisata kuliner tanpa menghabiskan waktu di jalan.
      </p>
    </section>

    <section id="features">
      <div class="feature-card">
        <i class="fas fa-map-marked-alt"></i>
        <h3>Peta Interaktif</h3>
        <p>Lihat sebaran lokasi kuliner secara visual di atas peta digital.</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-star"></i>
        <h3>Rating & Ulasan</h3>
        <p>Data terpercaya berdasarkan rating pengunjung.</p>
      </div>
      <div class="feature-card">
        <i class="fas fa-route"></i>
        <h3>Rute Efisien</h3>
        <p>Rencanakan perjalanan tur kuliner Anda agar hemat waktu.</p>
      </div>
    </section>

    <footer>
      <p>&copy; 2024 Proyek SIG Kota Sukabumi - SukaFood</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function tutupMenu() {
  isMenuOpen.value = false;
}
</script>

<style scoped>
.menu-toggle {
  display: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  transition: 0.3s;
}

.menu-toggle:hover {
  color: #ff9f1c;
}
/* --- VARIABEL WARNA LOKAL --- */
.beranda-container {
  --primary-color: #ff9f1c; /* Oranye Makanan */
  --secondary-color: #2ec4b6; /* Tosca */
  --dark-bg: #1b1b1b;
  --light-bg: #f9f9f9;
  --text-color: #333;
}

/* --- NAVBAR --- */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  box-sizing: border-box; /* Penting agar tidak melebar */
}

.logo {
  font-weight: 700;
  font-size: 1.5rem;
  color: #ff9f1c; /* Gunakan kode hex langsung jika var tidak tembus */
}
.logo span {
  color: black;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a,
.nav-links .router-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: 0.3s;
  cursor: pointer;
}

.nav-links a:hover,
.nav-links .router-link:hover {
  color: #ff9f1c;
}

/* --- HERO SECTION --- */
#hero {
  height: 100vh; /* Full layar */
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 20px;
  box-sizing: border-box;
}

#hero h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  line-height: 1.2;
}

#hero p {
  font-size: 1.2rem;
  max-width: 700px;
  margin-bottom: 30px;
  color: #ddd;
}

/* Tombol CTA (Call to Action) */
.btn-cta {
  padding: 15px 40px;
  background-color: #ff9f1c;
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: transform 0.3s, box-shadow 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.btn-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(255, 159, 28, 0.4);
  background-color: #e88d0c;
}

/* --- ABOUT SECTION --- */
#about {
  padding: 80px 10%;
  background-color: #f9f9f9;
  text-align: center;
}

#about h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #2ec4b6;
}

#about p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  max-width: 800px;
  margin: 0 auto;
}

/* --- FEATURES GRID --- */
#features {
  padding: 60px 10%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  background: white;
}

.feature-card {
  text-align: center;
  padding: 30px;
  border-radius: 15px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
  border: 1px solid #eee;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.feature-card i {
  font-size: 2.5rem;
  color: #ff9f1c;
  margin-bottom: 20px;
}

.feature-card h3 {
  margin-bottom: 10px;
  color: #333;
}

/* --- FOOTER --- */
footer {
  background-color: #1b1b1b;
  color: white;
  text-align: center;
  padding: 20px;
}

/* --- RESPONSIF HP --- */
@media (max-width: 768px) {
  #hero h1 {
    font-size: 2rem;
  }

  .menu-toggle {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%; /* Muncul persis di bawah navbar */
    left: 0;
    width: 100%;
    background-color: white;
    flex-direction: column; /* Susun ke bawah */
    align-items: center;
    padding: 20px 0;
    gap: 25px;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);

    /* Animasi Slide */
    transform: translateY(-150%); /* Sembunyi di atas */
    opacity: 0;
    z-index: -1; /* Supaya ada di belakang navbar saat animasi */
    transition: all 0.4s ease;
  }

  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    z-index: 999;
  }

  nav {
    justify-content: space-between;
  }
}
</style> -->

<template>
  <div class="landing-page">
    <nav :class="{ scrolled: isScrolled }">
      <div class="logo">
        <i class="fas fa-utensils"></i> <span>Suka</span>Food
      </div>

      <div class="menu-toggle" @click="toggleMenu">
        <i class="fas" :class="isMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </div>

      <div class="nav-links" :class="{ active: isMenuOpen }">
        <a href="#hero" @click="tutupMenu">Beranda</a>
        <a href="#sorotan" @click="tutupMenu">Populer</a>
        <a href="#about" @click="tutupMenu">Tentang</a>
        <a href="#faq" @click="tutupMenu">FAQ</a>
        <router-link to="/peta" class="btn-nav-cta" @click="tutupMenu">
          Buka Peta
        </router-link>
      </div>
    </nav>

    <section id="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="badge">Wisata Kuliner Sukabumi</span>
        <h1>
          Rasakan Kelezatan <br />
          <span class="text-highlight">Kota Santri</span>
        </h1>
        <p>
          Dari Mochi legendaris hingga Bubur Ayam yang hangat. Temukan ratusan
          destinasi kuliner tersembunyi dalam satu peta interaktif.
        </p>

        <div class="hero-buttons">
          <router-link to="/peta" class="btn-cta primary">
            Mulai Jelajah <i class="fas fa-map-marked-alt"></i>
          </router-link>
          <a href="#sorotan" class="btn-cta secondary"> Lihat Rekomendasi </a>
        </div>
      </div>

      <div class="scroll-indicator">
        <span>Scroll ke bawah</span>
        <i class="fas fa-chevron-down"></i>
      </div>
    </section>

    <section class="stats-container">
      <div class="stat-item">
        <h3>50+</h3>
        <p>Tempat Kuliner</p>
      </div>
      <div class="stat-item">
        <h3>4.8</h3>
        <p>Rata-rata Rating</p>
      </div>
      <div class="stat-item">
        <h3>1000+</h3>
        <p>Ulasan Pengguna</p>
      </div>
    </section>

    <section id="sorotan">
      <div class="section-header">
        <h2>Kuliner Wajib Coba</h2>
        <p>Jangan ngaku ke Sukabumi kalau belum coba ini!</p>
      </div>

      <div class="grid-card">
        <div
          class="food-card"
          v-for="(item, index) in kulinerPopuler"
          :key="index"
        >
          <div class="card-image">
            <img :src="item.img" :alt="item.nama" />
            <span class="category-tag">{{ item.kategori }}</span>
          </div>
          <div class="card-content">
            <h3>{{ item.nama }}</h3>
            <p>{{ item.desc }}</p>
            <div class="card-footer">
              <span class="price">{{ item.harga }}</span>
              <router-link to="/peta" class="btn-link"
                >Lihat Lokasi &rarr;</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about">
      <div class="about-wrapper">
        <div class="about-image">
          <img
            src="https://images.unsplash.com/photo-1576867757603-05b134ebc379?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            alt="Peta Digital"
          />
        </div>
        <div class="about-text">
          <h2>Kenapa Pakai SukaFood?</h2>
          <p>
            Sering bingung mau makan di mana? Atau kesasar saat cari alamat
            Bubur Bunut? SukaFood hadir sebagai solusi berbasis
            <strong>Sistem Informasi Geografis (SIG)</strong>.
          </p>

          <ul class="feature-list">
            <li>
              <i class="fas fa-check-circle"></i>
              <div>
                <strong>Data Terverifikasi</strong>
                <span>Lokasi akurat dengan koordinat tepat.</span>
              </div>
            </li>
            <li>
              <i class="fas fa-check-circle"></i>
              <div>
                <strong>Fitur Rute Pintar</strong>
                <span
                  >Navigasi langsung dari lokasi Anda tanpa pindah
                  aplikasi.</span
                >
              </div>
            </li>
            <li>
              <i class="fas fa-check-circle"></i>
              <div>
                <strong>Asisten AI Cerdas</strong>
                <span>Tanya rekomendasi makanan ke chatbot AI kami.</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section id="cta-akhir">
      <div class="cta-content">
        <h2>Siap Memanjakan Lidah?</h2>
        <p>Akses peta sekarang dan temukan surga makanan di sekitar Anda.</p>
        <router-link to="/peta" class="btn-cta white">
          Buka Peta Sekarang
        </router-link>
      </div>
    </section>

    <section id="faq">
      <div class="section-header">
        <h2>Sering Ditanyakan</h2>
      </div>
      <div class="faq-wrapper">
        <div
          class="faq-item"
          v-for="(faq, i) in faqs"
          :key="i"
          @click="toggleFaq(i)"
          :class="{ active: activeFaq === i }"
        >
          <div class="faq-question">
            <h4>{{ faq.tanya }}</h4>
            <i class="fas fa-chevron-down"></i>
          </div>
          <div class="faq-answer">
            <p>{{ faq.jawab }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div class="footer-content">
        <div class="footer-brand">
          <h3>SukaFood</h3>
          <p>Panduan wisata kuliner digital terbaik di Kota Sukabumi.</p>
        </div>
        <div class="footer-links">
          <a href="#">Beranda</a>
          <a href="#">Peta</a>
          <a href="#">Kontak</a>
        </div>
        <div class="footer-social">
          <a href="#"><i class="fab fa-instagram"></i></a>
          <a href="#"><i class="fab fa-facebook"></i></a>
          <a href="#"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
      <div class="copyright">
        &copy; 2026 Proyek SIG SukaFood. Dibuat dengan Vue 3 & Leaflet.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// --- STATE ---
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const activeFaq = ref(null);

// --- DATA DUMMY ---
const kulinerPopuler = [
  {
    nama: "Mochi Lampion",
    desc: "Oleh-oleh wajib khas Sukabumi dengan tekstur kenyal dan varian rasa unik.",
    kategori: "Oleh-oleh",
    harga: "Rp 40rb - 60rb",
    img: "https://sukabumizone.com/wp-content/uploads/2023/01/mochi-sukabumi-1.jpg", // Foto ilustrasi mochi/kue
  },
  {
    nama: "Bubur Ayam Bunut",
    desc: "Bubur legendaris dengan topping melimpah dan rasa yang otentik sejak 1980.",
    kategori: "Sarapan",
    harga: "Rp 15rb - 25rb",
    img: "https://sukabumizone.com/wp-content/uploads/2023/01/IMG_20230116_150451_wZ9nkm4Y79.jpeg",
  },
  {
    nama: "Kopi Bumi",
    desc: "Tempat nongkrong hits dengan suasana industrial dan kopi gula aren terbaik.",
    kategori: "Cafe",
    harga: "Rp 25rb - 40rb",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
  },
];

const faqs = [
  {
    tanya: "Apakah data lokasi ini akurat?",
    jawab:
      "Ya, kami melakukan survei dan validasi koordinat menggunakan GPS untuk memastikan akurasi lokasi di peta.",
  },
  {
    tanya: "Apakah aplikasi ini gratis?",
    jawab:
      "100% Gratis untuk digunakan oleh wisatawan maupun warga lokal Sukabumi.",
  },
  {
    tanya: "Bagaimana cara menggunakan fitur Rute?",
    jawab:
      "Cukup pilih tempat makan di peta, lalu klik tombol 'Rute Jalan'. Garis biru akan muncul mengarahkan Anda.",
  },
];

// --- METHODS ---
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function tutupMenu() {
  isMenuOpen.value = false;
}

function toggleFaq(index) {
  activeFaq.value = activeFaq.value === index ? null : index;
}

function handleScroll() {
  isScrolled.value = window.scrollY > 50;
}

// --- LIFECYCLE ---
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* --- VARIABEL GLOBAL --- */
.landing-page {
  --primary: #ff9f1c;
  --secondary: #2ec4b6;
  --dark: #1b1b1b;
  --light: #f8f9fa;
  --text-dark: #333;
  --text-light: #666;
}

/* --- NAVBAR FIX --- */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px 5%; /* Padding kiri kanan 5% */
  box-sizing: border-box; /* PENTING: Agar padding tidak membuat layar melebar */
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  transition: 0.4s ease;
  background: transparent;
  color: white;
}

nav.scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  padding: 15px 5%;
  color: var(--text-dark);
}

.logo {
  font-weight: 800;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--primary);
  z-index: 1001; /* Agar logo selalu di atas */
}
.logo span {
  color: white;
  transition: 0.3s;
}
nav.scrolled .logo span {
  color: var(--text-dark);
}

/* --- HAMBURGER MENU (Default: Hilang di Desktop) --- */
.menu-toggle {
  display: none; /* FIX: Hilangkan di Laptop */
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  z-index: 1001;
  transition: 0.3s;
}
nav.scrolled .menu-toggle {
  color: var(--text-dark);
}

/* --- LINKS DESKTOP --- */
.nav-links {
  display: flex;
  gap: 30px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  transition: 0.3s;
  position: relative;
}
nav.scrolled .nav-links a {
  color: var(--text-dark);
}
.nav-links a:hover {
  color: var(--primary);
}

.btn-nav-cta {
  background: var(--primary);
  color: white !important;
  padding: 10px 25px;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(255, 159, 28, 0.3);
  text-decoration: none;
}
.btn-nav-cta:hover {
  transform: translateY(-2px);
  background: #e88d0c;
}

/* --- HERO SECTION --- */
#hero {
  height: 100vh;
  width: 100%;
  background: url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  /* Tambahkan ini untuk mencegah scroll horizontal jika ada elemen melebar */
  overflow-x: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.4)
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 800px;
  animation: fadeUp 1s ease;
  padding: 0 15px; /* Agar teks tidak mentok pinggir di HP */
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(5px);
  text-transform: uppercase;
  letter-spacing: 1px;
}

#hero h1 {
  font-size: 3.5rem;
  margin: 20px 0;
  line-height: 1.1;
  font-weight: 800;
}
.text-highlight {
  color: var(--primary);
}
#hero p {
  font-size: 1.2rem;
  color: #eee;
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap; /* Agar tombol turun ke bawah di HP kecil */
}

.btn-cta {
  padding: 15px 35px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn-cta.primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 5px 15px rgba(255, 159, 28, 0.4);
}
.btn-cta.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(5px);
}
.btn-cta:hover {
  transform: translateY(-3px);
}
.btn-cta.secondary:hover {
  background: white;
  color: var(--dark);
}

.scroll-indicator {
  position: absolute;
  bottom: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  opacity: 0.8;
  animation: bounce 2s infinite;
}

/* --- STATS SECTION --- */
.stats-container {
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 40px 10%;
  background: white;
  margin-top: -50px;
  position: relative;
  z-index: 3;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.stat-item {
  text-align: center;
}
.stat-item h3 {
  font-size: 2rem;
  color: var(--primary);
  margin: 0;
  font-weight: 800;
}
.stat-item p {
  margin: 5px 0 0;
  color: var(--text-light);
  font-size: 0.9rem;
}

/* --- SECTIONS UMUM --- */
section {
  padding: 80px 5%;
  box-sizing: border-box;
}
.section-header {
  text-align: center;
  margin-bottom: 50px;
}
.section-header h2 {
  font-size: 2.5rem;
  color: var(--dark);
  margin-bottom: 10px;
}
.section-header p {
  color: var(--text-light);
  font-size: 1.1rem;
}

/* --- KULINER SOROTAN --- */
#sorotan {
  background: var(--light);
}
.grid-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}
.food-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
  border: 1px solid #eee;
}
.food-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.card-image {
  position: relative;
  height: 200px;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.category-tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--dark);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}
.card-content {
  padding: 25px;
}
.card-content h3 {
  margin: 0 0 10px;
  font-size: 1.3rem;
}
.card-content p {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 20px;
  line-height: 1.6;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #eee;
  padding-top: 15px;
}
.price {
  font-weight: bold;
  color: var(--primary);
}
.btn-link {
  text-decoration: none;
  color: var(--secondary);
  font-weight: 600;
  font-size: 0.9rem;
}

/* --- ABOUT --- */
.about-wrapper {
  display: flex;
  align-items: center;
  gap: 50px;
}
.about-image {
  flex: 1;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
.about-image img {
  width: 100%;
  display: block;
}
.about-text {
  flex: 1;
}
.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--dark);
}
.feature-list {
  list-style: none;
  padding: 0;
  margin-top: 30px;
}
.feature-list li {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}
.feature-list i {
  font-size: 1.5rem;
  color: var(--secondary);
  margin-top: 5px;
}
.feature-list strong {
  display: block;
  font-size: 1.1rem;
  color: var(--dark);
  margin-bottom: 5px;
}
.feature-list span {
  color: var(--text-light);
}

/* --- CTA AKHIR --- */
#cta-akhir {
  background: linear-gradient(135deg, var(--primary), #ff7b00);
  text-align: center;
  color: white;
  padding: 80px 20px;
}
.btn-cta.white {
  background: white;
  color: var(--primary);
  display: inline-flex;
  margin-top: 30px;
}
.btn-cta.white:hover {
  background: #fff8f0;
}

/* --- FAQ --- */
#faq {
  background: var(--light);
}
.faq-wrapper {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.faq-item {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
  cursor: pointer;
  transition: 0.3s;
}
.faq-question {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}
.faq-answer {
  max-height: 0;
  overflow: hidden;
  padding: 0 20px;
  background: #fafafa;
  color: var(--text-light);
  transition: max-height 0.3s ease, padding 0.3s ease;
}
.faq-item.active .faq-answer {
  max-height: 200px;
  padding: 20px;
  border-top: 1px solid #eee;
}
.faq-item.active i {
  transform: rotate(180deg);
}

/* --- FOOTER --- */
footer {
  background: var(--dark);
  color: white;
  padding: 60px 5% 20px;
}
.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.footer-brand h3 {
  color: var(--primary);
  font-size: 1.8rem;
  margin: 0 0 15px;
}
.footer-links {
  display: flex;
  gap: 20px;
}
.footer-links a {
  color: #aaa;
  text-decoration: none;
  transition: 0.3s;
}
.footer-links a:hover {
  color: white;
}
.footer-social {
  display: flex;
  gap: 20px;
}
.footer-social a {
  color: white;
  font-size: 1.2rem;
  transition: 0.3s;
}
.footer-social a:hover {
  color: var(--primary);
}
.copyright {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin-top: 20px;
}

/* --- ANIMASI --- */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* --- RESPONSIF (HP & TABLET) --- */
@media (max-width: 768px) {
  /* 1. Tampilkan Hamburger di HP */
  .menu-toggle {
    display: block;
  }

  /* 2. Style Menu Dropdown HP */
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;

    flex-direction: column; /* Susun menu ke bawah */
    padding: 30px 0;
    gap: 20px;

    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);

    /* Animasi Buka Tutup */
    transform: translateY(-20px);
    opacity: 0;
    pointer-events: none; /* Agar tidak bisa diklik saat sembunyi */
    transition: 0.3s ease;
  }

  /* Saat menu aktif (diklik) */
  .nav-links.active {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .nav-links a {
    color: var(--dark);
    font-size: 1.1rem;
  }

  /* 3. Penyesuaian Font Hero di HP */
  #hero h1 {
    font-size: 2.2rem;
  }
  .stats-container {
    flex-direction: column;
    gap: 30px;
    padding: 30px;
    margin-top: 20px;
  }

  .about-wrapper {
    flex-direction: column;
  }
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  .footer-links,
  .footer-social {
    justify-content: center;
  }
}
</style>
