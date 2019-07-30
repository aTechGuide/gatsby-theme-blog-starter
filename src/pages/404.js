import React from "react"

import Layout from "../components/layout/layout"
import PageLayout from "../components/layout/PageLayout";
import { Typography, Button } from "@material-ui/core";

const NotFoundPage = () => {

  
  return(
  <Layout pageTitle="Oops, Something went wrong">
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
