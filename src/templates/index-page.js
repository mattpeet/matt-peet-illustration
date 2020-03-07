import React from 'react';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import indexStyle from './index.module.css';

export const IndexPageTemplate = ({ headerLogoUrl, socialLinks = [] }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className={indexStyle.container}>
      <Header logoSrc={headerLogoUrl} />
      <Navigation socialLinks={socialLinks} />
      <footer className={indexStyle.footer}>
        <p>&copy; {currentYear} Matt Peet</p>
      </footer>
    </div>
  );
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const { headerLogo, socialLinks } = frontmatter;
  return (
    <Layout>
      <IndexPageTemplate
        headerLogoUrl={headerLogo.publicURL}
        socialLinks={socialLinks}
      />
    </Layout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
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
`;
