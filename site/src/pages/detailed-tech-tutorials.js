import React from 'react';

import Layout from "gatsby-theme-blog-starter/src/components/layout/layout"
import Seo from "gatsby-theme-blog-starter/src/components/seo/Seo"
import AboutLayout from '../components/layouts/AboutLayout';

const About = () => {
  return(
  <Layout pageTitle="About">
    <Seo 
      title="About"
      description="About Page"
      keywords={["About Page"]}
      slug="detailed-tech-tutorials"  />
    
    <AboutLayout />
  </Layout>
)}

export default About