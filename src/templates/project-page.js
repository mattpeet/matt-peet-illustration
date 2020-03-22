import React from 'react';
import { graphql } from 'gatsby';
import projectStyle from './project.module.css';
import Layout from '../components/Layout/Layout';
import globalStyles from '../components/global.module.css';

export const ProjectPageTemplate = ({ title = '', images = [] }) => {
  return (
    <main>
      <h1 className={globalStyles.visuallyHidden}>{title}</h1>
    </main>
  );
};

const ProjectPage = ({ data = {} }) => {
  const { project = { nodes: [] }, home = { nodes: [] } } = data;
  const { frontmatter: homeDetail = {} } = home.nodes[0];
  const { headerLogo, socialLinks } = homeDetail;

  const { frontmatter = {} } = project.nodes[0];

  return (
    <Layout headerLogoUrl={headerLogo.publicURL} socialLinks={socialLinks}>
      <ProjectPageTemplate title={frontmatter.title} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    project: allMarkdownRemark(filter: { id: { eq: $id } }) {
      nodes {
        frontmatter {
          title
          seo_keywords
          images {
            alt_text
            description
            image_title
            image {
              publicURL
            }
          }
          social_image
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

export default ProjectPage;
