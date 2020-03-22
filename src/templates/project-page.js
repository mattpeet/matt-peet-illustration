import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import projectStyle from './project.module.css';
import Layout from '../components/Layout/Layout';
import globalStyles from '../components/global.module.css';

export const ProjectPageTemplate = ({ title = '', images = [] }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(images[0]);

  useEffect(() => {
    setActiveImage(images[activeSlideIndex]);
  }, [activeSlideIndex, images]);

  const { altText, description, imageTitle } = activeImage;
  const { publicURL } = activeImage.image;

  return (
    <main>
      <h1 className={globalStyles.visuallyHidden}>{title}</h1>
      <div className={projectStyle.imageContainer}>
        <button
          disabled={activeSlideIndex === 0}
          className={projectStyle.carouselButton}
          onClick={() => {
            setActiveSlideIndex(activeSlideIndex - 1);
          }}
        >
          <span class={globalStyles.visuallyHidden}>Previous image</span>
          <i class='fas fa-chevron-left' />
        </button>
        <img
          alt={altText}
          src={publicURL}
          className={projectStyle.activeImage}
        />
        <button
          disabled={activeSlideIndex === images.length - 1}
          className={projectStyle.carouselButton}
          onClick={() => {
            setActiveSlideIndex(activeSlideIndex + 1);
          }}
        >
          <span class={globalStyles.visuallyHidden}>Next image</span>
          <i class='fas fa-chevron-right' />
        </button>
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
    <Layout headerLogoUrl={headerLogo.publicURL} socialLinks={socialLinks}>
      <ProjectPageTemplate
        title={frontmatter.title}
        images={frontmatter.images}
      />
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
