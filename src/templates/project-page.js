import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

const ProjectPage = ({ data }) => {
  const { markdownRemark: project } = data;
  return <h1>{project.frontmatter.title}</h1>;
};

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        seo_keywords
        thumbnail {
          id
          publicURL
        }
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
`;

export default ProjectPage;
