# Website Profil Sekolah SMPIT FITHRAH INSANI 2

Website profil sekolah responsif dengan desain modern menggunakan HTML, CSS, dan JavaScript.

## Fitur Utama
- 📱 Responsif di semua perangkat (desktop, tablet, mobile)
- 🎨 Desain modern dengan tema oren dan putih
- 📧 Form kontak dengan pengiriman email otomatis
- 🔗 Integrasi media sosial (Instagram, YouTube)
- ✨ Animasi dan transisi smooth
- 📊 Statistik dan pencapaian sekolah

## Struktur File
```
website-profil-sekolah/
├── index.html      # Halaman utama
├── style.css       # Styling
├── script.js       # Interaktivitas
└── README.md       # Dokumentasi
```

## Setup EmailJS (Pengiriman Email)

Untuk mengaktifkan fitur pengiriman email, ikuti langkah berikut:

### 1. Daftar di EmailJS
- Buka https://www.emailjs.com/
- Klik "Sign Up" dan buat akun gratis
- Verifikasi email Anda

### 2. Tambahkan Email Service
- Login ke dashboard EmailJS
- Klik "Add New Service"
- Pilih Gmail atau email provider Anda
- Izinkan akses untuk email rhanariah@gmail.com
- Copy **Service ID** (contoh: `service_xxxxxxx`)

### 3. Buat Email Template
- Di dashboard, klik "Email Templates"
- Klik "Create New Template"
- Nama Template: `sekolah_contact_form` (atau nama lain)
- Atur template dengan field berikut:
  ```
  Name: {{user_name}}
  Email: {{user_email}}
  Subject: {{subject}}
  Message: {{message}}
  ```
- Copy **Template ID** (contoh: `template_xxxxxxx`)

### 4. Dapatkan Public Key
- Di dashboard, klik "Account"
- Copy **Public Key** (contoh: `xxxxxxxxxxxxxxxx`)

### 5. Update script.js
Buka file `script.js` dan ganti baris pertama:
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Ganti dengan Public Key Anda
```

Menjadi:
```javascript
emailjs.init('xxxxxxxxxxxxxxxx'); // Ganti dengan public key asli Anda
```

Juga ganti di baris form submission:
```javascript
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
```

Menjadi:
```javascript
emailjs.sendForm('service_xxxxxxx', 'template_xxxxxxx', this)
```

### 6. Test Formulir
- Buka website Anda
- Scroll ke bagian "Hubungi Kami"
- Isi formulir dan klik "Kirim Pesan"
- Pesan akan dikirim ke rhanariah@gmail.com

## Deployment ke GitHub Pages

### 1. Push ke GitHub
```bash
git remote add origin https://github.com/USERNAME/website-profil-sekolah.git
git branch -M main
git push -u origin main
```

### 2. Aktifkan GitHub Pages
- Buka repository di GitHub
- Settings → Pages
- Source: Deploy from a branch
- Branch: main, folder /(root)
- Save

### 3. Website Live
Website akan tersedia di:
```
https://USERNAME.github.io/website-profil-sekolah/
```

## Kustomisasi

### Mengubah Informasi Sekolah
Edit bagian berikut di `index.html`:
- Nama sekolah
- Alamat dan kontak
- Visi, Misi, Nilai
- Fasilitas
- Prestasi
- Media sosial links

### Mengubah Warna
Edit variabel di `style.css`:
```css
:root {
    --primary-color: #ff8c00;      /* Oren */
    --secondary-color: #ffa500;    /* Oren lebih terang */
    --accent-color: #ffffff;       /* Putih */
    /* ... */
}
```

### Menambah Section Baru
1. Tambahkan HTML untuk section baru
2. Beri ID unik untuk navigasi
3. Tambahkan link di navbar
4. Styling di CSS

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Lisensi
Bebas digunakan untuk keperluan pribadi maupun komersial.

## Kontak
Untuk pertanyaan atau saran, hubungi:
- Email: rhanariah@gmail.com
- Instagram: @smpitfithrahinsani2
- YouTube: @smpitfithrahinsani2653

---
Dibuat dengan ❤️ untuk SMPIT FITHRAH INSANI 2
