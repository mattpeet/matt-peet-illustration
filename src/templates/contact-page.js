import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import '../components/global.module.css';

export const ContactPageTemplate = ({ contactlinks = [] }) => {
  return <h1>contact</h1>;
};

const ContactPage = ({ data = {} }) => {
  const { contact = { nodes: [] }, home = { nodes: [] } } = data;
  const { frontmatter: homeDetail = {} } = home.nodes[0];
  const { headerLogo, socialLinks } = homeDetail;

  const { frontmatter = {} } = contact.nodes[0];

  return (
    <Layout headerLogoUrl={headerLogo.publicURL} socialLinks={socialLinks}>
      <ContactPageTemplate content={frontmatter.contactlinks} />
    </Layout>
  );
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    contact: allMarkdownRemark(filter: { id: { eq: $id } }) {
      nodes {
        frontmatter {
          contactLinks {
            description
            visibleText
            faIcon
            url
          }
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
