import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import ContactUs from './ContactUs';
import Parts from './Parts';
import Youtube from './Youtube';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Parts></Parts>
            <BusinessSummary></BusinessSummary>
            <ContactUs></ContactUs>
            <Youtube></Youtube>
        </div>
    );
};

export default Home;