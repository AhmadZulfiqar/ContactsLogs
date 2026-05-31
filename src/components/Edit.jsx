import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Using the variable for consistency
const VITE_BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // Fallback to localhost if not set
const EditContact = () => { // Renamed from AddContact
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState(null); // Optional: If you want to allow image updates

  const navigate = useNavigate();
  const { id } = useParams();
  
  // Fetch the existing data when the component loads
 useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}/contacts/${id}`);
        // SET THE STATE SO THE INPUTS SHOW THE CURRENT DATA
        setName(res.data.name);
        setPhone(res.data.phone);
      } catch (err) {
        console.error("Error fetching contact:", err);
      }
    };
    getData();
  }, [id]); // Added 'id' to dependencies

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("phone", phone);
    if (img) {
      formdata.append("img", img);
    }
    try {
      // Use the VITE_BACKEND_URL variable here
      const res = await axios.put(`${VITE_BACKEND_URL}/update-contact/${id}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }); 
      console.log("Updated:", res.data);
      alert("Contact Updated!");
      navigate("/");
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("Update failed.");
    }
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex justify-center items-start pt-20 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-slate-50 border-b border-slate-100 p-6">
          <h1 className="text-center text-xl font-bold text-slate-800 tracking-tight">
            Edit Contact
          </h1>
          <p className="text-center text-slate-500 text-sm mt-1">
            Update the details below
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Zulfiqar Ahmad"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="03XX XXXXXXX"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="img" className="block text-sm font-semibold text-slate-700 mb-1">
                Profile Image (Optional)
              </label>
              <input
                type="file"
                id="img"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none" 
                onChange={(e) => setImg(e.target.files[0])} // Store the file object
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200"
            >
              Update Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContact;