import React from 'react';
import { Link as GatsbyLink } from "gatsby"

const Link = (props) => {
  
  // Internal link will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(props.to)
  
  if (internal) {
    return (
      <GatsbyLink {...props}>
        {props.children}
      </GatsbyLink>
    )
  }
  return (
    <a href={props.to} className={props.className} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  )
}
export default Link

