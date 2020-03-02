import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header'
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import Features from '../components/Features';
import BlogRoll from '../components/BlogRoll';

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  return (
    <>
      <Header logo={frontmatter['header-logo']} />
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        headerLogo
      }
    }
  }
`;
