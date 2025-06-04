# PeminjamanBuku

PeminjamanBuku adalah Tempat untuk melihat dan meminjam buku yang ada pada sebuah perpustakaan. PeminjamanBuku ini memudahkan pengguna untuk meminjam dan mengembalikan buku ke perpustakaan.

---

## 👥 Group Member

| Nama | NPM |
|---------|---------|
|Naufal Hadi Rasikhin|2306231366|
|Muhamad Rey Kafaka Fadlan|2306250573|
|Fauzan Farras Hakim Budi Handoyo|2306250610|
|Izzan Nawa Syarif|2306266956|

---

### 📚 Features

1. `Lending` : Memungkinkan pengguna meminjam buku dari perpustakaan dengan jangka waktu tertentu.
2. `Rating` : Memungkinkan pengguna untuk menilai sebuah buku.
3. `Searching` : Mencari buku yang tersedia pada Perpustakaan.
4. `Genre` : Pengguna dapat melihat Genre dari buku tersebut dan mencari buku lain dengan genre yang sama.
5. `Rating Leaderboard` : Untuk melihat buku apa saja yang mempunyai Rating terbaik.

---

### 💻 Tutorial
1. Buat file `.env` pada Directory Backend/src/ 
```
SBD-K1G3/  
├── Backend/  
│   ├── src/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── schema/
│   ├── package.json
|   ├── .env
|   ├── .dockerignore
|   ├── dockerfile
│   └── ...
├── Frontend/
│   ├── src/
│   │   ├── utils/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── contexts/
|   |   ├── App.css
|   |   ├── App.jsx
|   |   ├── index.css
|   |   └── main.jsx
│   ├── package.json
|   ├── .dockerignore
|   ├── dockerfile
│   └── ...
└── README.md
```

2. isi `.env` dengan para meter berikut
```
MONGODB_URI= [Isi bagian ini]
JWT_SECRET= [Isi bagian ini]

CLOUDINARY_CLOUD_NAME= [Isi bagian ini]
CLOUDINARY_API_KEY= [Isi bagian ini]
CLOUDINARY_API_SECRET= [Isi bagian ini]
```

3. masuk ke direktori backend dan build container image lalu run image
```
cd backend

docker build -t perpus_backend:1.0 .

docker run -p [port untuk access]:[port pada dockerfile (3000)] [image id] 
```

4. masuk ke direktori frontend dan build container image
```
docker build -t perpus_frontend:1.0 .
docker run -p [port untuk access]:[port pada dockerfile (5173)] [image id] 
```

5. Frontend dan Backend bisa Diakses pada port yang sudah di assigned saat menjalankan image