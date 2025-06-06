import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

const RatingPage = () => {
    const { id } = useParams(); // book_id
    const { currentUser, logout } = useAuth();
    const [score, setScore] = useState(5);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log("Sending rating data (auth bypassed):", {
                reviewer_id: currentUser._id,
                book_id: id,
                score,
                Comment: comment
            });
            
            // TEMPORARY: Remove authentication header for testing
            await axios.post(
                'http://localhost:3000/api/rating/review', 
                {
                    reviewer_id: currentUser._id,
                    book_id: id,
                    score,
                    Comment: comment
                }
                // Removed the headers object with Authorization
            );

            navigate(`/book/${id}`);
        } catch (err) {
            console.error('Rating error full details:', err);
            if (err.response) {
                console.log('Error response data:', err.response.data);
                console.log('Error response status:', err.response.status);
                console.log('Error response headers:', err.response.headers);
                setError(`Error: ${err.response.status} - ${err.response.data.message || 'Unknown error'}`);
            } else {
                setError('Gagal mengirim rating. ' + (err.message || ''));
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header currentUser={currentUser} logout={logout} />
            <Sidebar />

            <main className="container mx-auto p-6">
                <div className="bg-white max-w-xl mx-auto p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Beri Rating Buku</h2>

                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-1">Nilai Rating (1–5)</label>
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={score}
                                onChange={(e) => setScore(parseInt(e.target.value))}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">Komentar</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="4"
                                className="w-full p-2 border rounded"
                                placeholder="Tulis komentar Anda..."
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Kirim Rating
                        </button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RatingPage;
