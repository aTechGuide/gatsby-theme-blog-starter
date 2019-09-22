import React from "react"

import Layout from "gatsby-theme-blog-starter/src/components/layout/layout"
import Seo from "gatsby-theme-blog-starter/src/components/seo/Seo"
import PageLayout from "gatsby-theme-blog-starter/src/components/layout/PageLayout";

const privacyPolicy = () => {
  return (
    <Layout>
      <Seo 
        title="Privacy Policy"
        description="Privacy Policy of Site"
        tags={["Privacy Policy"]}
        slug="/privacy-policy" />
        
      <PageLayout title="Privacy Policy">
        <p>Last Updated: 03 September 2019</p>
          <p>This privacy policy (&quot;Policy&quot;) describes how Website Operator (&quot;Website Operator&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;) 
            collects, protects and uses the personally identifiable information (&quot;Personal Information&quot;) 
            you (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;) may provide on the <a target="_blank" rel="nofollow noopener noreferrer" href="https://atech.guide">atech.guide</a> 
            website and any of its products or services (collectively, &quot;Website&quot; or &quot;Services&quot;).</p>
      </PageLayout>
    </Layout>
  );
}

export default privacyPolicy;