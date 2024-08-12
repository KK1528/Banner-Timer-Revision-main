import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ onBannerUpdate }) => {
    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const [description, setDescription] = useState('Welcome to our website!');
    const [timer, setTimer] = useState(30);
    const [link, setLink] = useState('#');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsBannerVisible(true); // This will trigger the banner to show
        onBannerUpdate({ description, timer, link });
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
    ) : null; // Hide the dashboard once the banner is visible
};

export default Dashboard;
