import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, MoreHorizontal, ShoppingCart, X } from 'lucide-react';
import { db } from '../../firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';

const CertificateCard = ({ certificate, onDelete, list, isAdmin }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
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

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPaywall(true);
  };

  const closePaywall = () => {
    setShowPaywall(false);
  };

  const handlePurchase = () => {
    // Implement purchase logic here
    console.log('Purchase completed for certificate:', certificateId);
    closePaywall();
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
                {!isAdmin && (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart size={16} className="inline mr-2" />
                    Buy Now
                  </button>
                )}
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
                <div className="flex items-center space-x-2">
                  {!isAdmin && (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                      onClick={handleBuyNow}
                    >
                      <ShoppingCart size={20} className="inline mr-2" />
                      Buy Now
                    </button>
                  )}
                  <button
                    className="bg-white p-2 rounded hover:bg-red-200 transition-colors duration-500 border border-gray-200"
                    onClick={handleDelete}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
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

      {showPaywall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-1/2 max-w-[50vw]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-indigo-700">Purchase Certificate</h2>
              <button onClick={closePaywall} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{certificate.name}</h3>
              <p className="text-gray-600 mb-4">{certificate.courseName}</p>
              <p className="text-2xl font-bold text-green-600">$99.99</p>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
              <div className="flex space-x-4">
                <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded" />
                <input type="text" placeholder="CVC" className="w-1/2 p-2 border rounded" />
              </div>
              <button onClick={handlePurchase} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors duration-300">
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;