import React from 'react';

import Layout from '../components/layout/layout';
import Seo from '../components/seo/Seo';

import SinglePostLayout from '../components/layout/SinglePostLayout';

/**
 * Template used by Blog Posts files under posts folder
 */

const singlepost = ({data}) => {

  const{title, description, tags, image, slug, date, update_date} = data.mdx.frontmatter;

  return (
    <Layout>
      <Seo 
        title={title}
        description={description}
        tags={tags}
        image={image.childImageSharp.fluid}
        isBlogPost={true}
        slug={slug}
        date={date}
        update_date={update_date} />
      <SinglePostLayout data={data} />
    </Layout>
  );
}

export default singlepost;