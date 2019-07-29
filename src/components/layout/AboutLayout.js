import React from 'react';

import { Grid, Typography, Card, CardContent } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {useStaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';

const useStyles = makeStyles(theme => ({
  postGridItem: {
    padding: theme.postGridItemPadding
  },
  link: {
    color: theme.palette.primary.main
  },
  blogCard: {
    maxWidth: '764px'
  },
  authorCardContent: {
    maxWidth: '500px', 
    padding:'0px' 
  }
}));

const AboutLayout = () => {
  const classes = useStyles();

  const author = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "kamran_ali.jpg" }) {
        childImageSharp {
          fixed(width: 200, height: 300) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  
  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item className={classes.postGridItem} >
        <Typography variant='h1' align='center' >Are you Looking for Arabic Grammar Tutorials in English?</Typography>
      </Grid>
      <Grid item className={classes.postGridItem} >
        <Typography variant='body1' align='center' >You've come to the right place.</Typography>
      </Grid>
      <Grid item className={classes.postGridItem}>
        <Card className={classes.blogCard}>
          <CardContent>
            <Typography variant='h4' component='h2' color='secondary' align='center' > Arabic Blog</Typography>
          </CardContent>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Founded in 2018, the intent of Arabic blog is to help the readers to understand complex Arabic Grammar Jargons in English language.
              <br/>
              We try to cover as much details for a complex topic of Arabic Grammar with examples and I'rab details (when required)
              <br/>
              This main source of contents on this blog are from my classes in {' '}
              <a className={classes.link} href="https://www.qutoofacademy.com/" target="_blank" rel="nofollow noopener noreferrer">Qutoof Academy</a>.
              <br/> <br/> 
              
              Contact us on <a className={classes.link} href="https://www.facebook.com/arabicblog" target="_blank" rel="nofollow noopener noreferrer">FB page</a> or leave a Comment Below for any feedback/suggestions.
            
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item className={classes.postGridItem}>
        <Card >
          <CardContent>
            <Typography variant='h4' component='h2' color='secondary' align='center' > Author</Typography>
          </CardContent>
              <Grid container justify='center' >
                <Grid item className={classes.postGridItem}>
                  <Img fixed={author.file.childImageSharp.fixed} />
                </Grid>
                <Grid item className={classes.postGridItem}>
                  <CardContent className={classes.authorCardContent }>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <a className={classes.link} href="https://kamranali.in/" target="_blank" rel="noopener noreferrer">Kamran Ali</a> started his beautiful journey of learning Arabic Grammar from the online lectures of Brother {' '}
                      <a className={classes.link} href="http://www.lisanulquran.com/" target="_blank" rel="nofollow noopener noreferrer ">Aamir Sohail</a> in Urdu Language.

                      <br/> <br/>

                      Post that, he got to know about Madina Arabic Course on <a href="http://www.lqtoronto.com/videos.html" target="_blank" rel="nofollow noopener noreferrer">LQ Toronto</a> 
                      {' '} taught by brother Asif Mehrali and with the help of Allah he completed the Madina books.

                      <br/> <br/>

                      He then joined <a className={classes.link} href="https://bayyinah.com/" target="_blank" rel="nofollow noopener noreferrer">Bayyinah Institute</a> 
                      {' '} and completed Access 2 and Access 3 program.

                      <br/> <br/>
                      Post completion, he has been continuing his Arabic Studies at {' '}
                      <a className={classes.link} href="https://www.qutoofacademy.com/" target="_blank" rel="nofollow noopener noreferrer">Qutoof Academy</a>.

                    </Typography>
                  </CardContent>
                </Grid>

              </Grid>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AboutLayout;