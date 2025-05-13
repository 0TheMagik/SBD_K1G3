import React from 'react';

const KategoriList = ({ kategoriList }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Kategori</h2>
      <ul className="space-y-4">
        {kategoriList.map((kategori) => (
          <li key={kategori._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-gray-800">{kategori.nama}</h3>
            <p className="text-gray-600">{kategori.deskripsi}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KategoriList;
