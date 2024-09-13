import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, MoreHorizontal } from 'lucide-react';
import { db } from '../../firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';

const CertificateCard = ({ certificate, onDelete, list }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const certificateId = certificate.id;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!confirm('Are you sure you want to delete this certificate?')) // eslint-disable-line
      return;
    try {
      await deleteDoc(doc(db, "certificates", certificateId));
      console.log('Certificate deleted:', certificateId);
      if (onDelete) {
        onDelete(certificateId);
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
    window.location.reload();
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="relative">
      <Link to={`/certificate/${certificateId}`} className="block">
        <div className={`bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${list ? 'p-4' : 'p-6'}`}>
          {list ? (
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center gap-7 w-full">
                <h1 className="text-xl font-bold text-indigo-700">{certificate.name}</h1>
                <p className="text-gray-600 text-sm">{certificate.name} • {certificate.courseName} • {certificate.instructorSignature}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-white p-2 rounded hover:bg-gray-200 transition-colors duration-500 border border-gray-200"
                  onClick={toggleDropdown}
                >
                  <MoreHorizontal size={16} />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
                    <Link to={`/certificate/${certificateId}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Edit size={16} className="inline mr-2" />
                      Edit
                    </Link>
                    <button onClick={handleDelete} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Trash2 size={16} className="inline mr-2" />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-2xl font-bold text-indigo-700">{certificate.name}</h1>
                <button
                  className="bg-white p-2 rounded hover:bg-red-200 transition-colors duration-500 border border-gray-200"
                  onClick={handleDelete}
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-semibold">Course:</span> {certificate.courseName}</p>
                <p className="text-gray-600"><span className="font-semibold">Instructor:</span> {certificate.instructorSignature}</p>
                <p className="text-gray-600"><span className="font-semibold">Director:</span> {certificate.directorSignature}</p>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-semibold text-indigo-600 mb-2">Description:</h2>
                <p className="text-gray-700 text-sm">{certificate.courseDescription}</p>
              </div>
            </>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CertificateCard;