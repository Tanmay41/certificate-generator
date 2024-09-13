import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'; // Import Link for the home button
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../../Document';
import { db } from '../../firebase-config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../../firebase-config';

const EditCertificate = ({ isAdmin }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const [instructorSignature, setInstructorSignature] = useState("");
    const [directorSignature, setDirectorSignature] = useState("");
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [selectedLogo, setSelectedLogo] = useState("");
    const [customLogoUrl, setCustomLogoUrl] = useState("");
    const [selectedBorder, setSelectedBorder] = useState("");
    const [customBorderUrl, setCustomBorderUrl] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const logoOptions = [
        { id: "logo1", label: "Harvard University", image: "https://i.ibb.co/kM6mmnj/delete.png" },
        { id: "logo2", label: "Brown University", image: "https://i.ibb.co/nRF8sTQ/delete-png.png" },
        { id: "logo3", label: "Chicago University", image: "https://i.ibb.co/PYHkjJy/delete.png" },
    ];

    const borderOptions = [
        { id: "border1", label: "Border 1", image: "https://i.ibb.co/Hr1Lqrx/Pngtree-luxury-corner-golden-rectangle-certificate-9173186-1.png" },
        { id: "border2", label: "Border 2", image: "https://i.ibb.co/xHCVGbg/delete.jpg" },
        { id: "border3", label: "Border 3", image: "https://i.ibb.co/R3KKYt6/delete.jpg" },
    ];

    useEffect(() => {
        const fetchCertificate = async () => {
            const docRef = doc(db, "certificates", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setName(data.name);
                setInstructorSignature(data.instructorSignature);
                setDirectorSignature(data.directorSignature);
                setCourseName(data.courseName);
                setCourseDescription(data.courseDescription);
                setSelectedLogo(data.selectedLogo);
                setSelectedBorder(data.selectedBorder);
            } else {
                console.log("No such document!");
            }
        };
        fetchCertificate();
    }, [id]);

    const handleLogoChange = (value) => {
        if (value === 'customLogo') {
            setSelectedLogo(customLogoUrl);
        } else {
            setSelectedLogo(value);
        }
    };

    const handleBorderChange = (value) => {
        if (value === 'customBorder') {
            setSelectedBorder(customBorderUrl);
        } else {
            setSelectedBorder(value);
        }
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        const certificateData = {
            name,
            instructorSignature,
            directorSignature,
            courseName,
            courseDescription,
            selectedLogo,
            selectedBorder,
            userId: user ? user.uid : null
        };
        try {
            await updateDoc(doc(db, "certificates", id), certificateData);
            console.log("Certificate Data Updated");
            setIsModalOpen(true);
            navigate(`/certificate/${id}`);
        } catch (e) {
            console.error("Error updating document: ", e);
            alert("Error saving certificate. Please try again.");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='flex flex-col md:flex-row items-start justify-center gap-8 p-4 bg-gradient-to-r from-blue-100 to-purple-100'>
            <div className='w-full md:w-1/2 p-6 rounded-lg shadow-lg bg-white'>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-2xl font-bold text-indigo-800'>Edit Certificate Details</h2>
                    <Link to={isAdmin ? "/admin/certificates" : "/"} className='bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700'>
                        Home
                    </Link>
                </div>
                <form className='space-y-6'>
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium text-indigo-700'>
                            Recipient's Name
                        </label>
                        <input
                            type='text'
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='courseName' className='block text-sm font-medium text-indigo-700'>
                            Course Name
                        </label>
                        <input
                            type='text'
                            id='courseName'
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className='mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='courseDescription' className='block text-sm font-medium text-indigo-700'>
                            Course Description
                        </label>
                        <textarea
                            id='courseDescription'
                            value={courseDescription}
                            onChange={(e) => setCourseDescription(e.target.value)}
                            rows={4}
                            className='mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='instructorSignature' className='block text-sm font-medium text-indigo-700'>
                            Course Instructor Signature
                        </label>
                        <input
                            type='text'
                            id='instructorSignature'
                            value={instructorSignature}
                            onChange={(e) => setInstructorSignature(e.target.value)}
                            className='mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                        />
                    </div>
                    <div>
                        <label htmlFor='directorSignature' className='block text-sm font-medium text-indigo-700'>
                            Program Director Signature
                        </label>
                        <input
                            type='text'
                            id='directorSignature'
                            value={directorSignature}
                            onChange={(e) => setDirectorSignature(e.target.value)}
                            className='mt-1 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-indigo-700 mb-2'>
                            University Logo
                        </label>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                            {logoOptions.map((option) => (
                                <div key={option.id} className='relative'>
                                    <input
                                        type='radio'
                                        id={option.id}
                                        name='universityLogo'
                                        value={option.image}
                                        checked={selectedLogo === option.image}
                                        onChange={(e) => handleLogoChange(e.target.value)}
                                        className='sr-only peer'
                                    />
                                    <label
                                        htmlFor={option.id}
                                        className='flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all h-full peer-checked:border-indigo-500 peer-checked:bg-indigo-50 hover:bg-purple-50'
                                    >
                                        <img src={option.image} alt={option.label} className='w-16 h-16 mb-2 object-contain' />
                                        <span className='text-sm text-center text-indigo-700'>{option.label}</span>
                                    </label>
                                </div>
                            ))}
                            <div className='relative'>
                                <input
                                    type='radio'
                                    id='customLogo'
                                    name='universityLogo'
                                    value='customLogo'
                                    checked={selectedLogo === customLogoUrl}
                                    onChange={() => handleLogoChange('customLogo')}
                                    className='sr-only peer'
                                />
                                <label
                                    htmlFor='customLogo'
                                    className='flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all h-full peer-checked:border-indigo-500 peer-checked:bg-indigo-50 hover:bg-purple-50'
                                >
                                    <span className='text-sm text-center text-indigo-700'>Custom Logo URL</span>
                                </label>
                            </div>
                        </div>
                        {selectedLogo === customLogoUrl && (
                            <input
                                type='text'
                                value={customLogoUrl}
                                onChange={(e) => {
                                    setCustomLogoUrl(e.target.value);
                                    setSelectedLogo(e.target.value);
                                }}
                                placeholder='Enter custom logo URL'
                                className='mt-2 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                            />
                        )}
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-indigo-700 mb-2'>
                            Border Options
                        </label>
                        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                            {borderOptions.map((option) => (
                                <div key={option.id} className='relative'>
                                    <input
                                        type='radio'
                                        id={option.id}
                                        name='borderOption'
                                        value={option.image}
                                        checked={selectedBorder === option.image}
                                        onChange={(e) => handleBorderChange(e.target.value)}
                                        className='sr-only peer'
                                    />
                                    <label
                                        htmlFor={option.id}
                                        className='flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all h-full peer-checked:border-indigo-500 peer-checked:bg-indigo-50 hover:bg-purple-50'
                                    >
                                        <img src={option.image} alt={option.label} className='w-16 h-16 mb-2 object-contain' />
                                        <span className='text-sm text-center text-indigo-700'>{option.label}</span>
                                    </label>
                                </div>
                            ))}
                            <div className='relative'>
                                <input
                                    type='radio'
                                    id='customBorder'
                                    name='borderOption'
                                    value='customBorder'
                                    checked={selectedBorder === customBorderUrl}
                                    onChange={() => handleBorderChange('customBorder')}
                                    className='sr-only peer'
                                />
                                <label
                                    htmlFor='customBorder'
                                    className='flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all h-full peer-checked:border-indigo-500 peer-checked:bg-indigo-50 hover:bg-purple-50'
                                >
                                    <span className='text-sm text-center text-indigo-700'>Custom Border URL</span>
                                </label>
                            </div>
                        </div>
                        {selectedBorder === customBorderUrl && (
                            <input
                                type='text'
                                value={customBorderUrl}
                                onChange={(e) => {
                                    setCustomBorderUrl(e.target.value);
                                    setSelectedBorder(e.target.value);
                                }}
                                placeholder='Enter custom border URL'
                                className='mt-2 block w-full rounded-md border-indigo-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                            />
                        )}
                    </div>
                    <button
                        type='button'
                        onClick={handleSave}
                        className='mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                    >
                        Save Certificate
                    </button>
                </form>
            </div>
            <div className='w-full md:w-1/2 mt-8 md:mt-0'>
                <h2 className='text-2xl font-bold text-indigo-800 mb-6'>Certificate Preview</h2>
                <PDFViewer style={{ width: '100%', height: '75vh' }}>
                    <MyDocument 
                        name={name}
                        courseName={courseName}
                        courseDescription={courseDescription}
                        instructorSignature={instructorSignature}
                        directorSignature={directorSignature}
                        selectedLogo={selectedLogo}
                        selectedBorder={selectedBorder}
                        isAdmin={isAdmin}
                    />
                </PDFViewer>
            </div>

            {/* Modal for Save Confirmation */}
            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-6 rounded-lg shadow-lg'>
                        <h3 className='text-lg font-bold text-indigo-800'>Success!</h3>
                        <p className='mt-2 text-gray-700'>Your certificate has been updated successfully!</p>
                        <button
                            onClick={closeModal}
                            className='mt-4 w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700'
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditCertificate;
