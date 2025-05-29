import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* About Column */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-bold mb-4">SBD Library</h2>
            <p className="text-gray-400 mb-4">
              Your gateway to knowledge and imagination. Browse our extensive collection of books and 
              resources to expand your horizons.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-cyan-500 transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-cyan-500 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-cyan-500 transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 2.163c-3.204 0-3.584.012-4.849.07-3.26.149-4.771 1.699-4.919 4.92-.058 1.265-.07 1.644-.07 4.849 0 3.204.013 3.583.07 4.849.149 3.225 1.664 4.771 4.919 4.919 1.266.058 1.645.07 4.849.07 3.205 0 3.584-.012 4.85-.07 3.259-.149 4.771-1.699 4.919-4.92.058-1.265.07-1.644.07-4.849 0-3.204-.012-3.583-.07-4.849-.149-3.227-1.664-4.771-4.919-4.919-1.266-.058-1.645-.07-4.85-.07zm0 5.838c-1.457 0-2.642 1.185-2.642 2.642s1.185 2.642 2.642 2.642 2.642-1.185 2.642-2.642-1.185-2.642-2.642-2.642zm0 4.457c-1 0-1.815-.815-1.815-1.815s.815-1.815 1.815-1.815 1.815.815 1.815 1.815-.815 1.815-1.815 1.815zm3.565-4.577c0-.34-.275-.618-.616-.618-.34 0-.616.278-.616.618 0 .34.275.616.616.616.34 0 .616-.276.616-.616z"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Contact Info Column */}
          <div>
            <h2 className="text-xl font-bold mb-4">Contact</h2>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Jl. Rumah Buku No. 123, Jakarta, Indonesia
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                info@sbdlibrary.com
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +62 123 456 7890
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Mon-Fri: 9am-6pm, Sat: 10am-4pm
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-black py-4 text-center">
        <p className="text-gray-400">© {currentYear} Lorem Library. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;