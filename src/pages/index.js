import React from 'react'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import { BlogLayout } from '../components/Layout'
import { Header } from '../components/Header';
import SEO from '../components/seo'
import { rhythm } from '../utils/typography'

import './styles.css'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const keywords = data.site.siteMetadata.keywords
    const post = data.allMarkdownRemark && data.allMarkdownRemark.edges[0]
    const credits = post && post.node.frontmatter.credits

    return (
      <BlogLayout credits={credits}>
        <Header />
        <SEO
          title={siteTitle}
          description={post && post.excerpt}
          keywords={keywords}
          type="website"
        />
        {post && <div dangerouslySetInnerHTML={{ __html: post.node.html }} />}
      </BlogLayout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        keywords
      }
    }
    allMarkdownRemark(
      filter: {frontmatter: {defaultPage: {eq: true}}}
      sort: { fields: [frontmatter___date], order: DESC }
      ) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            credits
          }
        }
      }
    }
  }
`
