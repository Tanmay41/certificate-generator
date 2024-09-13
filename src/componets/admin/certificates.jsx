import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import CertificateCard from '../home/CertificateCard';
import { Link } from 'react-router-dom';
import { CirclePlus, List, Grid } from "lucide-react";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [viewMode, setViewMode] = useState('list');

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
      <div className="flex justify-between items-center p-4 rounded-lg shadow-md bg-white mb-6">
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
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
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
        <Link to="/certificate/new" className="bg-indigo-600 text-white font-bold py-2 px-4 rounded transition duration-300 flex items-center">
          <CirclePlus size={20} className="mr-2" />
          Create New Certificate
        </Link>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {certificates.map(certificate => (
            <CertificateCard key={certificate.id} certificate={{id: "/admin/certificate/" + certificate.id, ...certificate}} list={true} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {certificates.map(certificate => (
            <CertificateCard key={certificate.id} certificate={{id: "/admin/certificate/" + certificate.id, ...certificate}} list={false} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Certificates;