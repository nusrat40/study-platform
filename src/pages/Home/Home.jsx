import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import TutorSection from './TutorSection';
import StudySection from './StudySection';
import CategoriesSection from './CategoriesSection';
import Testimonial from './Testimonial';
import PopularCourse from './PopularCourse';
import StatsSection from './StatsSection';
import Subscribe from './subscribe';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>iLearning | Home</title>
            </Helmet>
            <Banner></Banner>
            <StudySection></StudySection>
            <TutorSection></TutorSection>
            <CategoriesSection></CategoriesSection>
            <PopularCourse></PopularCourse>
            <StatsSection></StatsSection>
            <Testimonial></Testimonial>
            <Subscribe></Subscribe>

           

    
        </div>
    );
};

export default Home;