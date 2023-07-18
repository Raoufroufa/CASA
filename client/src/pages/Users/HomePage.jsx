import React from 'react'
import HeroSection from '../../components/HeroSection.jsx';
import Contact from "../../components/ContactSection.jsx";
import Categories from '../../components/CategoriesSection.jsx';
import AboutUs from '../../components/AboutUsSection.jsx';


function HomePage() {
  
 return (
   <>
     <HeroSection />
     <Categories id="categories" />
     <AboutUs />
     <Contact />
   </>
 );
}

export default HomePage