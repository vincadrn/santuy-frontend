import React from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">
          <img src="logo.png" alt="Travelonika Logo" /> {/* logo */}
        </div>
        <div className="menu-icon">
          <button>☰</button>
        </div>
      </header>

      <main className="content">
        <h1>Hi Angel!</h1>
        <p>Ini daftar trip kamu.. Happy holidayyy !!</p>

        <section className="day-plan">
          <h2>Day 1</h2>
          <div className="upload-container">
            <div className="upload-box">
              <p>upload gambar destinasi</p>
              <button className="upload-button">UPLOAD</button>
            </div>
          </div>
          <div className="schedule">
            <div className="time">07:00 - 08:00</div>
            <div className="activity">Otw Bandara CGK/SMD/BPN</div>
            <div className="time">isi jam</div>
            <div className="activity">isi aktivitas</div>
            {/* Repeat this as necessary for more schedule items */}
          </div>
          <button className="preparation-button">hal yang harus disiapkan</button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
