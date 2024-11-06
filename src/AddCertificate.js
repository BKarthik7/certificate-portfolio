import React, { useState } from 'react';
import supabase from './supabaseClient';

const AddCertificate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [date, setDate] = useState('');
  const [skills, setSkills] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => setImageFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !imageFile) {
      alert('Please fill in all required fields and select an image.');
      return;
    }
    let imageUrl = '';
    const filePath = `${Date.now()}_${imageFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('certificates')
      .upload(filePath, imageFile);
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      setMessage('Failed to upload image. Please try again.');
      return;
    }
    const { data: publicUrlData } = supabase
      .storage
      .from('certificates')
      .getPublicUrl(filePath);
    imageUrl = publicUrlData.publicUrl;

    const skillsArray = skills ? skills.split(',').map(skill => skill.trim()) : [];
    const { data, error } = await supabase
      .from('certificates')
      .insert([{ title, description, image_url: imageUrl, date, skills: skillsArray }]);

    if (error) {
      console.error('Error adding certificate:', error);
      setMessage('Failed to add certificate. Please try again.');
    } else {
      setMessage('Certificate added successfully!');
      setTitle('');
      setDescription('');
      setImageFile(null);
      setDate('');
      setSkills('');
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded shadow-md max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Certificate Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Certificate
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default AddCertificate;
