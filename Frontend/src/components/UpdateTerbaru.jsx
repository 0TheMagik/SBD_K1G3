import React from 'react';

const UpdateTerbaru = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl text-black font-bold mb-4">Update Terbaru</h2>
      <ul className="space-y-3">
        {[
          "Something"
        ].map((update, index) => (
          <li key={index} className="border-b pb-2 last:border-b-0">
            <a href="#" className="hover:text-blue-600 text-sm">{update}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpdateTerbaru;
