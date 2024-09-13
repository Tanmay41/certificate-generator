import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './componets/Login';
import Home from './componets/home/Home';
import Certificate from './componets/certificate/CreateCertificate';
import EditCertificate from './componets/certificate/EditCertificate';
import Certificates from './componets/admin/certificates';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import admins from './admins.json';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAdmin(admins.admins.includes(currentUser?.email));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App font-clash-display">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Home isAdmin={isAdmin} /> : <Navigate to="/login" />} />
          <Route path="/certificate/new" element={user ? <Certificate isAdmin={isAdmin} /> : <Navigate to="/login" />} />
          <Route path="/certificate/:id" element={user ? <EditCertificate isAdmin={isAdmin} /> : <Navigate to="/login" />} />
          <Route path="/admin">
            <Route path="certificates" element={isAdmin ? <Certificates /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
