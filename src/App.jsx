import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import AddContact from './components/AddContact'
import './App.css'
import Edit from './components/Edit'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:id" element={<Edit />} />
      </Routes>
    </>
  )
}

export default App
