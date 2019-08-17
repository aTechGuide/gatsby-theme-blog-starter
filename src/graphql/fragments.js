import { graphql} from "gatsby";

export const postFrontMatter = graphql`
  fragment PostFrontMatter on MarkdownRemarkFrontmatter {
    pagetitle
    summary
    date(formatString: "MMM D, YYYY")
    tags
    slug
    image {
      childImageSharp {
        fixed(width: 350, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
}
`