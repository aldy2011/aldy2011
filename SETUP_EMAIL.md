# 📧 SETUP PENGIRIMAN EMAIL (5 MENIT)

## Langkah 1: Buat Akun EmailJS Gratis
👉 Buka: https://www.emailjs.com/
- Klik "Sign Up"
- Isi email dan password Anda
- Cek email dan verifikasi

## Langkah 2: Connect Email Anda (Gmail)
1. Login ke EmailJS Dashboard
2. Klik "Add New Service"
3. Pilih "Gmail"
4. Connect dengan akun rhanariah@gmail.com
5. **COPY Service ID** (nanti digunakan)

## Langkah 3: Buat Email Template
1. Di dashboard, klik "Email Templates"
2. Klik "Create New Template"
3. Isi:
   - **Name**: sekolah_contact_form
   - **From Name**: SMPIT FITHRAH INSANI 2
   - **To Email**: rhanariah@gmail.com
   - **Subject**: Pesan dari {{user_name}}
4. Di bagian "HTML" atau "Text", isi dengan:
```
Nama: {{user_name}}
Email: {{user_email}}
Subjek: {{subject}}

Pesan:
{{message}}
```
5. **COPY Template ID** (nanti digunakan)

## Langkah 4: Dapatkan Public Key
1. Klik menu "Account" di dashboard
2. Scroll ke bawah
3. Lihat kolom "Public Key"
4. **COPY Public Key** (nanti digunakan)

## Langkah 5: Update File script.js
Buka file `script.js` di editor Anda

**Cari baris pertama:**
```javascript
emailjs.init('YOUR_PUBLIC_KEY');
```

**Ganti menjadi:**
```javascript
emailjs.init('PUBLIC_KEY_ANDA_DI_SINI');
```
Contoh: `emailjs.init('HuR_k2p9bj3w-mQ2L');`

---

**Cari baris ini (sekitar baris 45):**
```javascript
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
```

**Ganti menjadi:**
```javascript
emailjs.sendForm('service_xxxxx', 'template_xxxxx', this)
```

Contoh:
```javascript
emailjs.sendForm('service_7g3k4m2', 'template_5h8j2k1', this)
```

## Langkah 6: Test Formulir! ✅
1. Simpan file script.js
2. Refresh website
3. Scroll ke "Hubungi Kami"
4. Isi formulir dan klik "Kirim Pesan"
5. Pesan akan masuk ke rhanariah@gmail.com 📨

## Troubleshooting

### Pesan tidak terkirim?
- Cek kembali Public Key dan Template ID
- Pastikan email service sudah terkoneksi dengan benar
- Lihat console browser (F12) untuk error message

### Limit gratis EmailJS?
- Gratis 200 email/bulan
- Cukup untuk website sekolah

### Ganti email penerima?
Edit di template EmailJS, ubah **To Email** menjadi email yang diinginkan

---
Selesai! Pesan dari website sekarang bisa masuk ke email Anda! 🎉
