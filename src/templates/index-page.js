import React from 'react';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import Layout from '../components/Layout';
import { graphql, Link } from 'gatsby';
import indexStyle from './index.module.css';

const getProjectListItems = projectData =>
  projectData.map((x, index) => {
    const key = `project-thumb-${index}`;
    return (
      <li key={key}>
        <Link to={x.fields.slug}>
          <img
            className={indexStyle.thumbnail}
            src={x.frontmatter.thumbnail.publicURL}
            alt={x.frontmatter.title}
          />
        </Link>
      </li>
    );
  });

export const IndexPageTemplate = ({
  headerLogoUrl,
  socialLinks = [],
  projectData = []
}) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <div className={indexStyle.containerGrid}>
        <div>
          <Header logoSrc={headerLogoUrl} id='header' />
          <Navigation socialLinks={socialLinks} id='navigation' />
        </div>
        <ul className={indexStyle.thumbnailGridList} id='thumbnails'>
          {getProjectListItems(projectData)}
        </ul>
      </div>
      <footer className={indexStyle.footer} id='footer'>
        <p>&copy; {currentYear} Matt Peet</p>
      </footer>
    </>
  );
};

const IndexPage = ({ data }) => {
  const { home = {}, projects = {} } = data || {};
  const projectData = projects.nodes || [];
  const { frontmatter: homeDetail = {} } = home.nodes[0];
  const { headerLogo, socialLinks } = homeDetail;
  return (
    <Layout>
      <IndexPageTemplate
        headerLogoUrl={headerLogo.publicURL}
        socialLinks={socialLinks}
        projectData={projectData}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
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
    projects: allMarkdownRemark(
      filter: { frontmatter: { templateKey: { eq: "project-page" } } }
    ) {
      nodes {
        frontmatter {
          title
          thumbnail {
            publicURL
          }
        }
        fields {
          slug
        }
      }
    }
  }
`;
