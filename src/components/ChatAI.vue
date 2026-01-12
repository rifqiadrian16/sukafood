<template>
  <div class="chat-wrapper">
    <button
      class="btn-chat"
      :class="{ 'is-active': isOpen }"
      @click="toggleChat"
      title="Tanya AI Asisten"
    >
      <i class="fas" :class="isOpen ? 'fa-times' : 'fa-robot'"></i>
    </button>

    <transition name="slide-up">
      <div v-if="isOpen" class="chat-window">
        <div class="chat-header">
          <div class="header-title">
            <h4><i class="fas fa-robot"></i> Asisten SukaFood</h4>
            <span class="status">Online</span>
          </div>
          <button class="btn-close" @click="toggleChat">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="chat-messages" ref="chatContainer">
          <div class="message bot">
            <div class="bubble">
              Halo! Saya AI Asisten SukaFood. Mau cari kuliner apa hari ini? 🍜
            </div>
          </div>
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message"
            :class="msg.role"
          >
            <div class="bubble" v-html="formatMessage(msg.text)"></div>
          </div>
          <div v-if="isLoading" class="message bot">
            <div class="bubble typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <input
            v-model="userInput"
            @keyup.enter="kirimPesan"
            @focus="onInputFocus"
            placeholder="Tanya rekomendasi..."
            :disabled="isLoading"
          />
          <button
            @click="kirimPesan"
            :disabled="isLoading || !userInput.trim()"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- KONFIGURASI ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// --- STATE ---
const isOpen = ref(false);
const isLoading = ref(false);
const userInput = ref("");
const messages = ref([]);
const chatContainer = ref(null);
const dataKuliner = ref(null); // Menyimpan data GeoJSON

// --- 1. Load Data Kuliner untuk "Otak" AI ---
onMounted(async () => {
  try {
    const response = await fetch("/kuliner.geojson");
    dataKuliner.value = await response.json();
  } catch (error) {
    console.error("Gagal memuat data kuliner untuk AI:", error);
  }
});

function toggleChat() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) scrollToBottom();
}

// --- 2. Logika Kirim Pesan ke Gemini ---
async function kirimPesan() {
  if (!userInput.value.trim() || isLoading.value) return;

  // Simpan pesan user
  const pertanyaaanUser = userInput.value;
  messages.value.push({ role: "user", text: pertanyaaanUser });
  userInput.value = "";
  isLoading.value = true;
  scrollToBottom();

  try {
    // A. Siapkan Model
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // B. Buat "System Prompt" (Instruksi + Data)
    // Kita menyuapkan data JSON ke AI agar dia tahu konteksnya
    const contextData = JSON.stringify(dataKuliner.value);

    const prompt = `
      Anda adalah asisten virtual untuk website wisata kuliner "SukaFood" di Sukabumi.
      Tugas anda adalah menjawab pertanyaan pengunjung dan memberikan rekomendasi kuliner.
      
      DATA KULINER YANG TERSEDIA:
      ${contextData}

      ATURAN MENJAWAB:
      1. Jawablah HANYA berdasarkan data di atas.
      2. Jika user bertanya tempat yang tidak ada di data, katakan mohon maaf data belum tersedia.
      3. Berikan jawaban yang ramah, santai, dan membantu (seperti tour guide).
      4. Jika merekomendasikan tempat, sebutkan Nama Tempat, Harga, dan Alamatnya.
      5. Gunakan emoji agar menarik.
      6. Jangan gunakan format Markdown tebal (**) terlalu banyak.

      PERTANYAAN USER: "${pertanyaaanUser}"
    `;

    // C. Minta Jawaban AI
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Simpan jawaban AI
    messages.value.push({ role: "bot", text: text });
  } catch (error) {
    console.error("Error AI:", error);
    messages.value.push({
      role: "bot",
      text: "Maaf, sirkuit saya sedang sibuk. Coba tanya lagi nanti ya! 🤖",
    });
  } finally {
    isLoading.value = false;
    scrollToBottom();
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}

function onInputFocus(event) {
  // Beri jeda sedikit agar keyboard sempat muncul
  setTimeout(() => {
    event.target.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 300);
}

// Ubah enter (\n) jadi <br> agar rapi
function formatMessage(text) {
  return text.replace(/\n/g, "<br>");
}
</script>

<style scoped>
.btn-chat {
  /* HAPUS: position fixed, bottom, right */
  position: relative;

  /* Samakan style dengan tombol Map Controls (.btn-control) */
  width: 35px;
  height: 35px;
  background: #ff9f1c;
  color: #ffffff; /* Warna default gelap */
  border-radius: 5px; /* Kotak tumpul */
  border: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  font-size: 1.2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.btn-chat:hover {
  transform: scale(1.1);
  background: #ca7a0a;
}

/* --- Animasi Vue Transition --- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* --- Chat Window --- */
.chat-window {
  position: fixed;
  bottom: 20px;
  right: 50px;
  width: 320px;
  height: 450px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
}

/* --- Header Baru (Dengan Tombol Close) --- */
.chat-header {
  background: #ff9f1c;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between; /* Pisahkan Judul & Tombol Close */
  align-items: center;
}

.header-title {
  display: flex;
  flex-direction: column;
}

.header-title h4 {
  margin: 0;
  font-size: 1rem;
}

.status {
  font-size: 0.7rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 10px;
  width: fit-content;
  margin-top: 2px;
}

/* Tombol Close (X) */
.btn-close {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.btn-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* --- Area Pesan --- */
.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Bubbles Chat */
.message {
  display: flex;
}
.message.user {
  justify-content: flex-end;
}
.message.bot {
  justify-content: flex-start;
}

.bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 15px;
  font-size: 0.9rem;
  line-height: 1.4;
  word-wrap: break-word;
}

.message.user .bubble {
  background: #2ec4b6;
  color: white;
  border-bottom-right-radius: 2px;
}

.message.bot .bubble {
  background: white;
  color: #333;
  border: 1px solid #eee;
  border-bottom-left-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Animasi Ngetik */
.typing span {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #ccc;
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1s infinite;
}
.typing span:nth-child(2) {
  animation-delay: 0.2s;
}
.typing span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* --- Input Area --- */
.chat-input {
  padding: 10px;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 0.9rem;
}

.chat-input button {
  background: #ff9f1c;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-input button:disabled {
  background: #ccc;
}

/* --- RESPONSIVE HP --- */
@media (max-width: 600px) {
  .chat-window {
    width: 95%; /* Hampir full lebar */
    right: 2.5%; /* Posisi tengah */
    bottom: 20px; /* Tempel ke bawah sedikit */
    height: 60vh; /* Tinggi 60% layar agar lega */
    border-radius: 15px;
  }
}
</style>
