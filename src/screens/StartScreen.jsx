import React from 'react'
import { Link } from 'react-router-dom';
import '../index.css'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StartScreen() {
  return (
    <div className="start-container">
  <div className="d-flex h-100 align-items-center justify-content-center bg-gradient-to-b from-blue-500 to-purple-700 text-white">
    <div className="text-center">
      <h1 className="text-5xl font-extrabold mb-8 animate__animated animate__fadeIn animate__delay-1s">
        Bilgi Yarismasi Oyununa Hosgeldin
      </h1>
      <p className="text-lg mb-10 animate__animated animate__fadeIn animate__delay-2s">
        Bilgini test et ve yeni bilgiler öğren.
      </p>
      <Button
        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:shadow-outline animate__animated animate__fadeIn animate__delay-3s"
        as={Link}
        to="/game"
        style={{ width: '100%' }} // Adjust the width as needed
      >
        Oyunu Başlat
      </Button>
    </div>
  </div>
</div>
  )
}
