import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = ({ bannerData, onTimerFinish }) => {
    const { visible, description, timer, link } = bannerData;
    const [countdown, setCountdown] = useState(timer);

    useEffect(() => {
        if (visible) {
            setCountdown(timer);
        }
    }, [timer, visible]);

    useEffect(() => {
        let intervalId;
        if (visible && countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        } else if (countdown <= 0) {
            setCountdown(0);
            onTimerFinish();
        }

        return () => clearInterval(intervalId);
    }, [visible, countdown, onTimerFinish]);

    if (!visible) return null;

    return (
        <div className="banner">
            <div className="left-content">
                <h2>{description}</h2>
            </div>
            <div className="right-content">
                <div className="countdown-timer">{countdown}</div>
                <a href={link}>Click here</a>
            </div>
        </div>
    );
};

export default Banner;
