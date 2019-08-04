import React from 'react';

import Layout from "../components/layout/layout"
import SEO from "../components/seo/Seo"
import AboutLayout from '../components/layout/AboutLayout';

const About = () => {
  return(
  <Layout pageTitle="About">
    <SEO title="About" />
    <AboutLayout />
  </Layout>
)}

export default About