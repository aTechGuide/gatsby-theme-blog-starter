import React from "react"

import Layout from "../components/layout/layout"
import PageLayout from "../components/layout/PageLayout";
import { Typography } from "@material-ui/core";
import Seo from "../components/seo/Seo";
import notFound from './not-found.svg';

import { makeStyles } from '@material-ui/core/styles';
import { Link } from "gatsby";

const useStyles = makeStyles(theme => ({
  svg: {
    maxWidth: '100%',
    marginBottom: '30px'
  }
}));

const NotFoundPage = () => {

  const classes = useStyles();

  return(
    <Layout>
      <Seo 
        title="Oops, Something went wrong"
        description="Invalid URL"
        keywords={["404", "Url Not Found"]}
        slug="404"  />

      <PageLayout>

        <img className={classes.svg} src={notFound} alt="404" />

        <Typography>
          You just hit a page that doesn&#39;t exist... the sadness. <Link to="/"> Go Home </Link> 
        </Typography>
       
      </PageLayout>
  </Layout>
)}

export default NotFoundPage
