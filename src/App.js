import React, { useState, useEffect } from 'react';
import supabase from './supabaseClient';
import AdminLogin from './AdminLogin';
import Certificates from './Certificates';
import AddCertificate from './AddCertificate';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddCertificate, setShowAddCertificate] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      }
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogin = (user) => {
    setUser(user);  // Set user state after successful login
    setShowLogin(false); // Hide login form after login
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); // Reset user state after logout
    setShowAddCertificate(false); // Hide Add Certificate section after logout
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="spinner-border animate-spin border-4 border-t-4 border-indigo-600 rounded-full w-16 h-16"></div>
    </div>
  );

  return (
    <div>
      {/* Navbar with Mobile Responsiveness */}
      {!showLogin && (
        <nav className="flex justify-between p-4 bg-indigo-900 text-white shadow-md">
          <div className="flex items-center space-x-4">
            {/* Logo or left side content (Optional) */}
            <span className="text-xl font-semibold text-gradient">
              MyCertificatesPortfolio
            </span>

          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  className="p-2 bg-red-400 rounded hover:bg-red-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                <button
                  className="p-2 bg-green-400 rounded hover:bg-green-500"
                  onClick={() => setShowAddCertificate(!showAddCertificate)} // Toggle between Add Certificate and Certificates
                >
                  {showAddCertificate ? 'View Certificates' : 'Add Certificate'}
                </button>
              </>
            ) : (
              <button
                className="p-2 bg-blue-400 rounded hover:bg-blue-500"
                onClick={() => setShowLogin(true)} // Show login form when clicked
              >
                Login
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Show login page if showLogin is true */}
      {showLogin ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <div className="p-4">
          {/* Show Certificates if not adding */}
          {!showAddCertificate && <Certificates user={user} />}
          {/* Show Add Certificate if toggled */}
          {showAddCertificate && <AddCertificate />}
        </div>
      )}
    </div>
  );
};

export default App;
