import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VITE_BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // Fallback to localhost if not set

const AddContact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState(null); // Changed to null for file object
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', name);
  formData.append('phone', phone);
  
  // ✨ FIX: Only append if a real file is loaded (avoids passing string "null")
  if (img && img instanceof File) {
    formData.append('img', img);
  }
  
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/add-contact`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("Saved successfully:", response.data);
    navigate('/'); // Smooth redirection back to contact logs list
  } catch (err) {
    console.error("Frontend Submission Error:", err);
  }
};

  return (
    <div className="w-full h-screen bg-slate-900 flex justify-center items-start pt-20 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-50 border-b border-slate-100 p-6">
          <h1 className="text-center text-xl font-bold text-slate-800 tracking-tight">
            Add New Contact
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Zulfiqar Ahmad"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="03XX XXXXXXX"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Profile Image</label>
              <input
                type="file"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none" 
                onChange={(e) => setImg(e.target.files[0])} // Store the file object
              />
            </div>
            <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;