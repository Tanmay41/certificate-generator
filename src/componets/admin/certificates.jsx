import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import CertificateCard from '../home/CertificateCard';
import { Link } from 'react-router-dom';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      const querySnapshot = await getDocs(collection(db, "certificates"));
      const userCertificates = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCertificates(userCertificates);
    };

    fetchCertificates();
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("User logged out");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">Admin Panel - Certificates</h1>
        <div className="flex items-center gap-4">
          <Link to="/" className="bg-black text-white font-bold py-2 px-4 rounded transition duration-300">
              User Dashboard
          </Link>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Logout
          </button>
          </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {certificates.map(certificate => (
            <CertificateCard key={certificate.id} certificate={{id: "/admin/certificate/" + certificate.id, ...certificate}} />
        ))}
      </div>
    </div>
  );
}

export default Certificates;