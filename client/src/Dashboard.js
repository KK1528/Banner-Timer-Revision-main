import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onBannerUpdate }) => {
    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const [description, setDescription] = useState('Welcome to our website!');
    const [timer, setTimer] = useState(30);
    const [link, setLink] = useState('#');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsBannerVisible(true);

        const bannerData = { description, timer, link };
        onBannerUpdate(bannerData);

        try {
            await fetch('http://localhost:5000/api/banner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bannerData),
            });
        } catch (error) {
            console.error('Error saving banner data:', error);
        }
    };

    return !isBannerVisible ? (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Banner Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Banner Timer (seconds):
                    <input type="number" value={timer} onChange={(e) => setTimer(Number(e.target.value))} />
                </label>
                <label>
                    Banner Link:
                    <input type="url" value={link} onChange={(e) => setLink(e.target.value)} />
                </label>
                <button type="submit">Update Banner</button>
            </form>
        </div>
    ) : null;
};

export default Dashboard;
