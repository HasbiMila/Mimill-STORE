HPKU — DUA WEBSITE: PELANGGAN + ADMIN

Struktur:
- customer/  = website yang dilihat pelanggan
- admin/     = panel untuk mengedit etalase
- data/      = database JSON sederhana
- uploads/   = foto produk yang diupload
- server.js  = server yang menyambungkan keduanya

CARA MENJALANKAN:
1. Install Node.js.
2. Buka terminal di folder ini.
3. Jalankan: npm install
4. Jalankan: npm start
5. Website pelanggan: http://localhost:3000
6. Panel admin: http://localhost:3000/admin
7. Password admin awal: admin123

PENTING UNTUK ONLINE:
Set environment variable ADMIN_PASSWORD dengan password Anda sendiri sebelum dipublish.
Website pelanggan dan admin harus berada pada server yang sama agar perubahan etalase langsung tersimpan.
