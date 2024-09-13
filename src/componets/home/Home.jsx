import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { db } from '../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import CertificateCard from './CertificateCard';

function Home({ isAdmin }) {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        fetchCertificates(user.uid);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchCertificates = async (userId) => {
    const q = query(collection(db, "certificates"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const userCertificates = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCertificates(userCertificates);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center p-4 mx-4 mt-5 rounded-lg shadow-md bg-white mb-8">
        <h1 className="text-3xl font-bold">My Certificates</h1>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link to="/admin/certificates" className="bg-black text-white font-bold py-2 px-4 rounded transition duration-300">
              Admin Panel
            </Link>
          )}
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Logout
          </button>
        </div>
      </div>
      <main>
        <div className="py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {certificates.map(certificate => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
