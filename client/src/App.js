import React, { useState } from 'react';
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

    return (
        <div>
            {!bannerData.visible && <Dashboard onBannerUpdate={handleBannerUpdate} />}
            <Banner bannerData={bannerData} onTimerFinish={handleTimerFinish} />
        </div>
    );
};

export default App;
