// ====== FUNGSI DATABASE — HARUS ADA AGAR DATA MUNCUL ======
window.db = {
  baca: async function(nama) {
    try {
      const data = await window.electronAPI.bacaData(nama);
      return data || [];
    } catch {
      console.warn('Gagal baca, pakai data kosong:', nama);
      return [];
    }
  },
  tulis: async function(nama, isi) {
    try {
      const hasil = await window.electronAPI.tulisData(nama, isi);
      return hasil;
    } catch {
      console.warn('Gagal tulis:', nama);
      return {sukses: false, pesan: 'Tidak terhubung ke database'};
    }
  }
};

// ====== KONTROL SIDEBAR & MENU ======
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const konten = document.getElementById('konten');
const dotsBtn = document.getElementById('dotsBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const tutupSearch = document.getElementById('tutupSearch');

// Toggle sidebar
if (hamburger) hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('tutup');
  konten.classList.toggle('penuh');
});

// Dropdown menu
if (dotsBtn) dotsBtn.addEventListener('click', e => {
  e.stopPropagation();
  dropdownMenu.classList.toggle('buka');
  searchOverlay?.classList.remove('buka');
});
document.addEventListener('click', () => dropdownMenu?.classList.remove('buka'));
dropdownMenu?.addEventListener('click', e => e.stopPropagation());

// Search overlay
if (searchBtn && searchOverlay) {
  searchBtn.addEventListener('click', () => {
    searchOverlay.classList.toggle('buka');
    dropdownMenu?.classList.remove('buka');
    if (searchOverlay.classList.contains('buka')) {
      setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
    }
  });
}
if (tutupSearch) tutupSearch.addEventListener('click', () => {
  searchOverlay?.classList.remove('buka');
});
