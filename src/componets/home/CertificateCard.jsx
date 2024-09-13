import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { db } from '../../firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';

const CertificateCard = ({ certificate, isAdmin, onDelete }) => {
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
    // reload the page
    window.location.reload();
  };

  return (
    <div className="relative">
      <Link to={`/certificate/${certificateId}`} className="block">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h1 className="text-2xl font-bold text-indigo-700">{certificate.name}</h1>
              {isAdmin && (
                <button
                  className="bg-white p-2 rounded hover:bg-red-200 transition-colors duration-500 border border-gray-200"
                  onClick={handleDelete}
                >
                  <Trash2 size={20} />
                </button>
              )}
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
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CertificateCard;