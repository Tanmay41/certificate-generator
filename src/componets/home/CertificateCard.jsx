import React from 'react';
import { Link } from 'react-router-dom';

const CertificateCard = ({ certificate }) => {
  const certificateId = certificate.id;

  return (
    <Link to={`/certificate/${certificateId}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-700 mb-3">{certificate.name}</h1>
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
  );
};

export default CertificateCard;