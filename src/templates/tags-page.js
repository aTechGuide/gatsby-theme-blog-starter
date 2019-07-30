import React from 'react';
import Layout from '../components/layout/layout';
import {Chip, Badge} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {slugify} from '../util/UtilityFunctions';

import { Link } from 'gatsby';
import PageLayout from '../components/layout/PageLayout';

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

const tagsPage = ({pageContext}) => {

  const classes = useStyles();

  const {tags, tagPostCounts} = pageContext;

  return (
    <Layout>
      <PageLayout title="Tags">
        {tags.map(tag => (
          <Link key={tag} to={`/tag/${slugify(tag)}`}>
            <Badge className={classes.margin} badgeContent={tagPostCounts[tag]} color="secondary">
              <Chip size='small' color='primary' label={tag} />
              {/* <MailIcon /> */}
            </Badge>
            
          </Link>
        ))}
      </PageLayout>
    </Layout>
  );
}

export default tagsPage;