import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import TutorSection from './TutorSection';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>iLearning | Home</title>
            </Helmet>
            <Banner></Banner>
            <TutorSection></TutorSection>
        </div>
    );
};

export default Home;