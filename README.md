# ⚔️ Mobile Legends Winrate Calculator (WR Tracker)

Kalkulator Winrate Mobile Legends modern dengan fitur lengkap, tampilan visual menarik, dan dukungan **PWA (Progressive Web App)** agar bisa diinstall di HP/PC.

## ✨ Fitur Utama (Features)

- 🎯 **Target Winrate**: Hitung berapa kali **Win Streak** yang dibutuhkan untuk mencapai Target WR (misal dari 50% ke 60%).
- 📉 **Lose Streak**: Hitung sisa nyawa (berapa kali boleh kalah) sebelum WR turun ke angka tertentu.
- 📊 **Cek Detail Akun**: Masukkan Total Match & WR untuk mengetahui jumlah **Total Menang** dan **Total Kalah** secara spesifik.
- 🏆 **Sistem Rank Otomatis & Manual**: Badge Rank akan muncul otomatis sesuai WR, atau pilih sendiri Rank asli Anda (Warrior - Mythical Immortal).
- 💾 **Auto-Save (Anti-Reset)**: Data tidak akan hilang saat browser di-refresh atau tab ditutup. Aman!
- 📱 **PWA Support**: Install aplikasi ini ke Home Screen HP Anda. Bisa dibuka **Offline** tanpa internet.
- 📤 **Share Result**: Bagikan hasil perhitungan ke teman mabar via Copy Text.

## 🛠️ Tech Stack

Dibuat dengan teknologi web modern untuk performa maksimal:

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **PWA**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

## 🚀 Cara Menjalankan (Installation)

1.  **Clone Repository**
    ```bash
    git clone https://github.com/username-anda/winrate-mlbb.git
    cd winrate-mlbb
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```
    Buka `http://localhost:5173` di browser.

## 📦 Build untuk Production

Untuk membuat file siap upload (deploy):

```bash
npm run build
```
File hasil build akan ada di folder `dist/`.

## 🌐 Deploy

Projek ini sudah siap dideploy ke **Vercel** atau **Netlify**. Cukup hubungkan repository GitHub Anda, dan setting:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

### Credit
Dibuat dengan 🔥 untuk para Pemburu WR.

**Ivan Edward / github.com/ragepanz**
