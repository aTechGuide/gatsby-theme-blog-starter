import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import {Chip, Badge} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {slugify} from '../util/UtilityFunctions';

import { Link } from 'gatsby';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));

const tagsPage = ({pageContext}) => {

  const classes = useStyles();

  const {tags, tagPostCounts} = pageContext;

  return (
    <Layout pageTitle="All Tags">
      <SEO title="All Tags" />
      
      {tags.map(tag => (
        <Link key={tag} to={`/tag/${slugify(tag)}`}>
          <Badge className={classes.margin} badgeContent={tagPostCounts[tag]} color="secondary">
            <Chip size='small' color='primary' label={tag} />
            {/* <MailIcon /> */}
          </Badge>
          
        </Link>
      ))}
    </Layout>
  );
}

export default tagsPage;