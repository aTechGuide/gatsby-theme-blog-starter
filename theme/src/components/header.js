import React from "react"

import { makeStyles } from '@material-ui/core/styles';
import {useStaticQuery, graphql} from 'gatsby';
import {AppBar, Toolbar, Typography, Button, Tooltip, Slide, useScrollTrigger, useMediaQuery} from '@material-ui/core';
import { useTheme } from "@material-ui/styles";

import Link from '../util/Link';
import PopupMenu from "./PopupMenu";

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

  const { site : {siteMetadata : {title, menuLinks, options : {basePath}}} } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            options {
              basePath
            }
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

  const matches = useMediaQuery(theme => theme.breakpoints.up('md'));

  return (
    <Slide appear={false} direction="down" in={!trigger} >
      <AppBar position="sticky">
        <Toolbar component="nav">
          <Typography variant="h4" component='h2' className={classes.title}>          
            <Link className={classes.homeLink} to={basePath === "/" ? "/" : `/${basePath}/`}>{title}</Link>
          </Typography>

            {
              matches && (
                menuLinks.map(link => (
                  <Typography key={link.name}>
                    <Link className={classes.menuLink} activeClassName={classes.activeLink} to={link.link}>{link.name}</Link>
                  </Typography>))
                )
            }

          <Typography>
            <Tooltip title="Install App for Offline View">
              <Button 
                {...theme.button}
                style={{display: 'none'}}
                id='a2hs'>
                  Install</Button>
            </Tooltip>
          </Typography>

          {
            !matches && (<PopupMenu menuLinks={menuLinks}/>)
          }

        </Toolbar>
      </AppBar>
    </Slide>
  );
}

export default Header
