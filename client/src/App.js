import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Banner from './Banner';

const App = () => {
    const [bannerData, setBannerData] = useState({ visible: false, description: '', timer: 10, link: '' });

    const handleBannerUpdate = (data) => {
        setBannerData({ ...data, visible: true });
    };

    const handleTimerFinish = () => {
        setBannerData({ ...bannerData, visible: false });
    };

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/banner');
                const data = await response.json();
                setBannerData({ ...data, visible: false });
            } catch (error) {
                console.error('Error fetching banner data:', error);
            }
        };

        fetchBannerData();
    }, []);

    return (
        <div>
            {!bannerData.visible && <Dashboard onBannerUpdate={handleBannerUpdate} />}
            <Banner bannerData={bannerData} onTimerFinish={handleTimerFinish} />
        </div>
    );
};

export default App;
