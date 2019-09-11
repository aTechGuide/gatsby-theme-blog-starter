import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import {useStaticQuery, graphql, Link} from 'gatsby';
import {AppBar, Toolbar, Typography, Button, Tooltip, Slide, useScrollTrigger} from '@material-ui/core';
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  homeLink: {
    color: theme.palette.primary.contrastText
  },
  menuLink: {
    color: theme.palette.primary.contrastText,
    margin: theme.spacing(2),
    '&:hover': {
      color: theme.palette.secondary.main
    }
  },
  activeLink: {
    background: theme.palette.primary.light,
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    '&:hover': {
      color: 'white'
    }
  }
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  )

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger} >
      <AppBar position="sticky">
        <Toolbar component="nav">
          <Typography variant="h4" component='h2' className={classes.title}>
            
            <Link className={classes.homeLink} to="/">{site.siteMetadata.title}</Link>
          </Typography>
            {site.siteMetadata.menuLinks.map(link => (
              <Typography key={link.name}>
                <Link key={link.name} className={classes.menuLink} activeClassName={classes.activeLink} to={link.link}>{link.name}</Link>
              </Typography>
            )) }    
          <Typography>
          <Tooltip title="Install App for Offline View">
            <Button 
              {...theme.button}
              style={{display: 'none'}}
              id='a2hs'>
                Install</Button>
          </Tooltip>
          </Typography>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default Header
