import React from 'react';
import { graphql } from 'gatsby';
import projectStyle from './project.module.css';
import indexStyle from './index.module.css';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';

export const ProjectPageTemplate = ({
  title = '',
  images = [],
  headerLogoUrl = '',
  socialLinks = []
}) => {
  return (
    <main>
      <h1 className={indexStyle.visuallyHidden}>{title}</h1>
      <div className={indexStyle.containerGrid}>
        <div>
          <Header logoSrc={headerLogoUrl} id='header' />
          <Navigation socialLinks={socialLinks} id='navigation' />
        </div>
      </div>
    </main>
  );
};

const ProjectPage = ({ data = {} }) => {
  const { project = { nodes: [] }, home = { nodes: [] } } = data;
  const { frontmatter: homeDetail = {} } = home.nodes[0];
  const { headerLogo, socialLinks } = homeDetail;

  const { frontmatter = {} } = project.nodes[0];

  return (
    <ProjectPageTemplate
      title={frontmatter.title}
      headerLogoUrl={headerLogo.publicURL}
      socialLinks={socialLinks}
    />
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
