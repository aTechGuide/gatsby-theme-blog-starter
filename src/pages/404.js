import React from "react"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import { Link } from "gatsby";

const NotFoundPage = () => (
  <Layout pageTitle="Oops, Something went wrong">
    <SEO title="404: Not found" />
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <Link className="btn btn-primary text-uppercase" to={'/'}>Go Home</Link>
  </Layout>
)

export default NotFoundPage
