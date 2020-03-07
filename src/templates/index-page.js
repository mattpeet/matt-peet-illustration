import React from 'react';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation/Navigation';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import indexStyle from './index.module.css';

const IndexPage = ({ data }) => {
  const currentYear = new Date().getFullYear();

  const { frontmatter } = data.markdownRemark;
  const { headerLogo, socialLinks } = frontmatter;
  return (
    <Layout>
      <div className={indexStyle.container}>
        <Header logoSrc={headerLogo.publicURL} />
        <Navigation socialLinks={socialLinks} />
        <footer className={indexStyle.footer}>
          <p>&copy; {currentYear} Matt Peet</p>
        </footer>
      </div>
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
