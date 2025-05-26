import React from 'react';
import { Link } from 'react-router-dom';

const CategoryHeader = ({ category }) => {
  if (!category) return null;
  
  return (
    <div className="bg-gray-50 py-6 border-b mb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <nav className="text-sm mb-2">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <Link to="/" className="text-blue-600 hover:underline">Home</Link>
                  <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </li>
                <li className="flex items-center">
                  <span className="text-gray-500">Categories</span>
                  <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
                  </svg>
                </li>
                <li className="text-gray-500">{category.nama_kategori}</li>
              </ol>
            </nav>
            <h1 className="text-3xl font-bold text-gray-800">{category.nama_kategori}</h1>
            {category.deskripsi && (
              <p className="text-gray-600 mt-2 max-w-2xl">{category.deskripsi}</p>
            )}
          </div>
          
          <div className="mt-4 md:mt-0">
            <span className="inline-flex rounded-md shadow-sm">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
              >
                Back to Home
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;