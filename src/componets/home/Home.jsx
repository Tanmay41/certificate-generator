import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { db } from '../../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { CirclePlus } from "lucide-react"

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
      <div className="flex justify-between items-center p-4 mx-4 mt-5 rounded-lg shadow-md bg-white">
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
              <Link to="/certificate/new" className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-center">
                  <CirclePlus size={200} color='#808080' strokeWidth={0.5} />
                  <div className="font-semibold text-gray-700">Create New Certificate</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
