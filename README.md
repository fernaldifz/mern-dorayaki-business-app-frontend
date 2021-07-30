# MERN-Dorayaki-Business-App (Frontend)
Aplikasi MERN bisnis dorayaki terdiri dari [frontend](https://github.com/fernaldifz/mern-dorayaki-business-app-frontend) dan [backend](https://github.com/fernaldifz/mern-dorayaki-business-app-backend) yang dapat dijalankan dengan:
- Menjalankan npm run dev pada folder frontend aplikasi bisnis dorayaki
```
npm run dev
```
- Menjalankan docker-compose up pada folder backend aplikasi bisnis dorayaki
```
docker-compose up
```
Bila setelah menjalankan perintah "docker-compose up" pada folder backend, tetapi hanya keluar kalimat 
```Server is running on port: 5000```, 
sedangkan kalimat 
```MongoDB database connection established successfully```
tidak keluar di CLI Anda, dapat melakukan pengaturan DNS pada koneksi internet Anda. Gunakan Google DNS (8.8.8.8 atau 8.8.4.4) supaya dapat menggunakan layanan database MongoDB. Saya pernah mengalami masalah ini dan dapat memperbaikinya dengan solusi ini.

Kemudian, Anda dapat mengakses ```http://localhost:3000/``` untuk menjalankan aplikasi.

## Menggunakan Aplikasi
Aplikasi MERN bisnis dorayaki yang bernama "Stand With Dorayaki" dimulai dengan keadaan toko dorayaki dan dorayaki berjumlah 0 (Kecuali sebelumnya Anda sudah melakukan Create terhadap dorayaki atau toko dorayaki sebelumnya, maka aplikasi akan dimulai dari keadaan terakhir).

Aplikasi ini terdiri dari 7 bagian utama yang dapat diakses di navigation bar, yaitu:
- Create Toko Dorayaki
- Create Dorayaki
- Add Menu Toko Dorayaki
- Send Dorayaki
- Toko Dorayaki
- Menu Toko
- Dorayaki

## Create Toko Dorayaki
Membuat toko dorayaki dapat dilakukan dengan memilih pilihan "Create Toko Dorayaki" di navigation bar. Di sini, toko dorayaki akan diberikan nama toko, jalan toko, kecamatan toko, provinsi toko, dan tanggal berdirinya toko. Anda dapat menekan tombol "Create Toko Dorayaki" untuk membuat toko dorayaki tersebut, atau menekan tombol "Cancel" untuk membatalkan pembuatan toko. Setelah menekan tombol "Create Toko Dorayaki", Anda dapat melihat data toko dorayaki yang telah dibuat di pilihan "Toko Dorayaki" di navigation bar.

## Create Dorayaki
Membuat dorayaki dapat dilakukan dengan memilih "Create Dorayaki" di navigation bar. Di sini, dorayaki akan diberikan rasa, deskripsi dorayaki, path ke gambar untuk menampilkan gambar dorayaki dan harga dorayaki. Anda dapat menekan tombol "Create Dorayaki" untuk membuat dorayaki tersebut, atau menekan tombol "Cancel" untuk membatalkan pembuatan dorayaki. Setelah menekan tombol "Create Dorayaki", Anda dapat melihat data dorayaki yang telah dibuat di pilihan "Dorayaki" di navigation bar. Gambar dorayaki akan berhasil ditampilkan bila path yang Anda buat benar.

Berikut merupakan list path yang tersedia saat ini untuk menampilkan gambar dorayaki:
- Rasa coklat: /src/components/images/dorayakicoklat.jpeg
- Rasa stroberi: /src/components/images/dorayakistroberi.jpg
- Rasa keju: /src/components/images/dorayakikeju.jpg
- Rasa teh hijau: /src/components/images/dorayakitehhijau.jpg

Anda dapat melakukan penambahan/perubahan/penghapusan gambar di folder /src/components/images.

## Add Menu Toko Dorayaki
Kemudian, Anda dapat menambahkan menu dorayaki suatu toko dorayaki dengan memilih "Add Menu Toko Dorayaki" di navigation bar. Pilih nama toko dan dorayaki yang diinginkan (pastikan sudah melakukan pembuatan toko dan dorayaki terlebih dahulu), kemudian masukkan persediaan dan kapasitas dorayaki rasa yang dipilih yang dimiliki toko tersebut. Pilih tombol "Add Menu Toko Dorayaki" untuk menambahkan menu tersebut ke suatu toko, atau pilih tombol "Cancel" untuk membatalkan penambahan tersebut. Anda dapat melihat data menu dorayaki tersebut di pilihan "Menu Toko" di navigation bar.

## Send Dorayaki
Berikutnya, Anda dapat mengirimkan dorayaki dari suatu toko ke toko lain (pastikan minimal Anda memiliki 2 toko) dengan menggunakan pilihan "Send Dorayaki" di navigation bar. Pilih nama toko pengirim, nama toko penerima, rasa dorayaki yang dikirim dan jumlahnya. Perlu diperhatikan, sistem memiliki dan akan mengecek persyaratan:
- Toko pengirim harus memiliki persediaan dorayaki rasa yang dipilih yang cukup untuk dikirimkan.
- Toko penerima harus memiliki menu dorayaki rasa yang ingin dikirimkan (Bila tidak memiliki menu tersebut, berarti persediaan dan kapasitas untuk dorayaki rasa tersebut adalah 0).
- Toko penerima harus memiliki kapasitas dorayaki rasa tersebut yang cukup untuk menerima pengiriman
Bila tidak memenuhi, sistem akan mengirimkan peringatan. Seperti biasa, Anda dapat memilih tombol "Cancel" untuk membatalkan transaksi pengirim dorayaki.

## Toko Dorayaki
Anda dapat menampilkan data toko dorayaki yang telah dibuat (nama, jalan, kecamatan, provinsi dan tanggal berdiri) di pilihan "Toko Dorayaki" di navigation bar. Di sini, Anda dapat melakukan:
- edit untuk melakukan pembaharuan pada data nama, jalan, kecamatan, provinsi dan tanggal berdiri. Tekan "Edit Toko Dorayaki" untuk memperbaharui atau "Cancel" untuk membatalkan pembaharuan.
- delete pada toko dorayaki yang diinginkan untuk menghapus data toko tersebut.

## Menu Toko
Anda dapat menampilkan data toko dorayaki yang telah dibuat (rasa dorayaki yang disediakan, persediaan dan kapasitasnya) di pilihan "Menu Toko" di navigation bar. Kemudian, Anda dapat melakukan:
- edit menu untuk melakukan pembaharuan menu yang telah dibuat (persediaan dan kapasitasnya). Pilih rasa dorayaki yang ingin diubah persediaan dan kapasitasnya, kemudian pilih tombol "Edit Menu Toko Dorayaki" atau tombol "Cancel" untuk membatalkan pembaharuan.
- delete menu untuk menghapus "suatu" menu.
- delete all menu untuk menghapus seluruh menu.

## Dorayaki
Anda dapat menampilkan data dorayaki yang telah dibuat (rasa, deskripsi, gambarnya dalam format picture dan harga dorayaki) di pilihan "Dorayaki" di navigation bar. Kemudian, Anda dapat melakukan:
- edit untuk melakukan pembaharuan data dorayaki tersebut, pilih tombol "Edit Dorayaki" untuk melakukan pembaharuan atau tombol "Cancel" untuk membatalkan pembaharuan.
- delete untuk menghapus dorayaki tersebut.
