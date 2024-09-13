import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { db } from '../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { CirclePlus, List, Grid } from "lucide-react"

import CertificateCard from './CertificateCard';

function Home({ isAdmin }) {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [viewMode, setViewMode] = useState('grid');

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
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 mx-2 sm:mx-4 mt-5 rounded-lg shadow-md bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0">My Certificates</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {isAdmin && (
            <Link to="/admin/certificates" className="w-full sm:w-auto bg-black text-white font-bold py-2 px-4 rounded transition duration-300 text-center">
              Admin Panel
            </Link>
          )}
          <button onClick={handleLogout} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Logout
          </button>
        </div>
      </div>
      <main>
        <div className="py-6 px-2 sm:px-6 lg:px-8">
          <div className="px-2 sm:px-4 py-6 sm:px-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <div className="flex space-x-2 mb-4 sm:mb-0">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List size={20} />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
              </div>
              <Link to="/certificate/new" className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center justify-center">
                <CirclePlus size={20} className="mr-2" />
                Create New Certificate
              </Link>
            </div>
            {viewMode === 'list' ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {certificates.map(certificate => (
                  <CertificateCard key={certificate.id} certificate={certificate} list={true} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {certificates.map(certificate => (
                  <CertificateCard key={certificate.id} certificate={certificate} list={false} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
