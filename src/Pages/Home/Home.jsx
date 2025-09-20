import React from 'react';
import BannerSlider from '../../Components/BannerSlider';
import NearlyExpiry from '../NearlyExpiry/NearlyExpiry';
import ExpiredFood from '../ExpiredFood/ExpiredFood';
import FoodTips from '../FoodTips/FoodTips';
import ExpiryStats from '../ExpiryStats/ExpiryStats';

const Home = () => {
    return (
        <div>
            <BannerSlider></BannerSlider>
            <NearlyExpiry></NearlyExpiry>
            <ExpiredFood></ExpiredFood>
            <FoodTips></FoodTips>
            <ExpiryStats></ExpiryStats>
        </div>
    );
};

export default Home;