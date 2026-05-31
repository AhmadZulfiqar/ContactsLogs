import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Ensure your .env file has VITE_API_URL=http://localhost:3000
const VITE_BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // Fallback to localhost if not set

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  // FETCH DATA
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}/contacts`);
        console.log("Fetched contacts:", res.data);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  // DELETE CONTACT
  const deleteContact = async (id) => {
    // Optimization: Ask for confirmation before deleting
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      await axios.delete(`${VITE_BACKEND_URL}/delete-contact/${id}`);
      // Update UI immediately
      setData((prevData) => prevData.filter((contact) => contact._id !== id));
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact.");
    }
  };

  // EDIT CONTACT
  const editContact = (id) => {
    navigate(`/edit-contact/${id}`);
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex justify-center items-start pt-20">
      <div className="w-96 bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-600 p-4 flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">My Contacts</h1>
          <button
            onClick={() => navigate("/add-contact")}
            className="w-8 h-8 flex justify-center items-center rounded-full bg-white text-blue-600 font-bold hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>

        {/* CONTACT LIST */}
        <div className="max-h-[500px] overflow-y-auto">
          {data.length > 0 ? (
            data.map((item) => (
              <div key={item._id} className="p-2">
                {" "}
                {/* Added Key Prop */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <img
                      src={`${VITE_BACKEND_URL}/${item.img}`}
                      alt={item.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex flex-col">
                      <h2 className="text-sm font-bold text-slate-800 leading-tight">
                        {item.name}
                      </h2>
                      <h3 className="text-sm text-slate-500 font-medium">
                        {item.phone}
                      </h3>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() => editContact(item._id)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        edit
                      </span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteContact(item._id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center">
              <p className="text-gray-500">No contacts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
