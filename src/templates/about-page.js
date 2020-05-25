import React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown';
import Layout from '../components/Layout/Layout';
import globalStyles from '../components/global.module.css';

export const AboutPageTemplate = ({ }) => {


  return (
    <>
    </>
  )
}



const AboutPage = ({  }) => {


  return (
    <Layout>
      <AboutPageTemplate
       
      />
    </Layout>
  )
}



export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    about: allMarkdownRemark(filter: { id: { eq: $id } }) {
      nodes {
        frontmatter {
          blurb
        }
      }
    }
    home: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "index-page" } } }
    ) {
      nodes {
        frontmatter {
          headerLogo {
            publicURL
          }
          socialLinks {
            description
            faIcon
            url
          }
        }
      }
    }
  }
`;
