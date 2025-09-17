import React from 'react';
import BannerSlider from '../../Components/BannerSlider';
import NearlyExpiry from '../NearlyExpiry/NearlyExpiry';

const Home = () => {
    return (
        <div>
            <BannerSlider></BannerSlider>
            <NearlyExpiry></NearlyExpiry>
        </div>
    );
};

export default Home;