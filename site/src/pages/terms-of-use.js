import React from "react"

import Layout from "gatsby-theme-blog-starter/src/components/layout/layout"
import Seo from "gatsby-theme-blog-starter/src/components/seo/Seo"
import PageLayout from "gatsby-theme-blog-starter/src/components/layout/PageLayout";

const TermsOfUse = () => (
  <Layout pageTitle="Terms of Use">
    <Seo 
      title="Terms Of Use"
      description="Terms Of Use for Site"
      keywords={["Terms Of Use"]}
      slug="terms-of-use" />

    <PageLayout title="Terms of Use">
      <p>Last Updated: 03 September 2019</p>
      
      <h2>Welcome to Site</h2>
      <p>These terms and conditions outline the rules and regulations for the use of Site's Website.</p>

    </PageLayout>
  </Layout>
)

export default TermsOfUse
