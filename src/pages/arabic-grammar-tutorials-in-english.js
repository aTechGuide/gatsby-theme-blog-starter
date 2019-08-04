import React from 'react';

import Layout from "../components/layout/layout"
import Seo from "../components/seo/Seo"
import AboutLayout from '../components/layout/AboutLayout';

const About = () => {
  return(
  <Layout pageTitle="About">
    <Seo 
      title="About"
      description="About Page"
      tags={["About Page"]}
      slug="/arabic-grammar-tutorials-in-english"  />
    
    <AboutLayout />
  </Layout>
)}

export default About