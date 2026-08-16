# EduRancher Lab

Website edukasi UAS **Pemrograman Web I**.

Tema: membuat Kubernetes cluster dengan Rancher (contoh 3 VM: master + worker).

## Cara menjalankan

1. Buka lewat **Live Server** atau HTTP lokal (jangan double-click `file://`).
2. Contoh perintah di folder ini:

   ```bash
   python -m http.server 5500
   ```

   Lalu buka [http://localhost:5500](http://localhost:5500).

3. Embed YouTube di `media.html` membutuhkan `http://localhost`.
   Jika dibuka lewat `file://`, iframe sering tampil kotak hitam / Error 153.
4. Tidak perlu build. Bootstrap dan font dimuat dari CDN (perlu internet).
5. Video/audio lokal ada di folder `assets/`.

## Struktur

| File | Keterangan |
|------|------------|
| `index.html` | Beranda |
| `konsep.html` | Teori singkat + details/summary |
| `arsitektur.html` | Diagram, tabel, list |
| `panduan.html` | Langkah instalasi |
| `media.html` | Video & audio |
| `praktik.html` | Form + kuis JavaScript |
| `css/custom.css` | Selektor & warna |
| `js/script.js` | Jam, validasi form, kuis |

## Identitas

- **Nama:** Hanry Roslaw Saputra
- **NIM:** 250401010331
- **Mata kuliah:** Pemrograman Web I

- **Nama:** Iin Wahyuni
- **NIM:** 250401010332
- **Mata kuliah:** Pemrograman Web I