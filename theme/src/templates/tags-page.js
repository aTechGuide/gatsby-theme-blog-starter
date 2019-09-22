import React from 'react';
import {Chip, Badge} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { navigate, useStaticQuery, graphql } from 'gatsby';

import {slugify} from '../util/UtilityFunctions';
import PageLayout from '../components/layout/PageLayout';
import Layout from '../components/layout/layout';
import Seo from "../components/seo/Seo"

/**
 * This template is used generate the page containing all the Tags used in the site
 */
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

const TagsPage = ({pageContext}) => {

  const classes = useStyles();
  const {tags, tagPostCounts} = pageContext;

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  const title = site.siteMetadata.title

  return (
    <Layout>
      <Seo 
        title={`${title} Tags`}
        description={`${title} Tags: ${tags}`}
        tags={[tags]}
        slug={`tags`} />

      <PageLayout title="Tags">
        {tags.map(tag => (
            <Badge key={tag} className={classes.margin} badgeContent={tagPostCounts[tag]} color="secondary">
              <Chip size='small' color='primary' label={tag} 
                clickable onClick={() => navigate(`/tag/${slugify(tag)}/`) } />
            </Badge>
        ))}
      </PageLayout>
    </Layout>
  );
}

export default TagsPage;