import React from "react"

import Layout from "../components/layout/layout"
import PageLayout from "../components/layout/PageLayout";
import { Typography, Button } from "@material-ui/core";
import Seo from "../components/seo/Seo";

const NotFoundPage = () => {

  
  return(
  <Layout pageTitle="Oops, Something went wrong">
    <Seo 
      title="404"
      description="Invalid URL"
      slug="/404"  />

    <PageLayout title="404: Not found">
      <Typography>
        You just hit a page that doesn&#39;t exist... the sadness.
      </Typography>
      <Button
        href='/'
        variant='contained'
        color='primary'>
        Go Home
      </Button>
    </PageLayout>
  </Layout>
)}

export default NotFoundPage
