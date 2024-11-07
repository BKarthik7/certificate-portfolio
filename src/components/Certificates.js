import React, { useEffect, useState } from 'react';
import supabase from '../supabaseClient';

const Certificates = ({ user }) => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('certificates')
        .select('id, title, description, image_url, date, skills');
      if (error) console.log(error);
      setCertificates(data);
      setLoading(false);
    };

    fetchCertificates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('certificates')
        .delete()
        .eq('id', id);

      if (error) {
        console.log("Error deleting certificate:", error);
      } else {
        setCertificates(certificates.filter(cert => cert.id !== id));
      }
    } catch (error) {
      console.log("Error deleting certificate:", error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="spinner-border animate-spin border-4 border-t-4 border-indigo-600 rounded-full w-16 h-16 mr-4"></div>
      <p className="text-xl text-gray-700">Loading certificates...</p>
    </div>
  );

  return (
    <div className="space-y-6 pl-2">
      <h2 className="text-2xl font-bold mb-4">My Certificates</h2>
      {certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificates.map(cert => (
            <div key={cert.id} className="bg-white p-4 rounded-lg shadow-md relative">
              <img
                src={cert.image_url}
                alt={cert.title}
                className="w-full h-auto object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 truncate">{cert.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
              <p className="text-gray-700 mt-2 text-ellipsis overflow-hidden whitespace-nowrap">{cert.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {cert.skills && cert.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full truncate">
                    {skill}
                  </span>
                ))}
              </div>
              {/* Show trash bin icon button only if user is logged in */}
              {user && (
                <button
                  onClick={() => handleDelete(cert.id)}
                  className="absolute bottom-2 right-2 text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
