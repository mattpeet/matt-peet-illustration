import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import projectStyle from './project.module.css';
import Layout from '../components/Layout/Layout';
import globalStyles from '../components/global.module.css';

export const ProjectPageTemplate = ({ title = '', images = [] }) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const infoButtonRef = useRef();
  const closeInfoButtonRef = useRef();

  useEffect(() => {
    setActiveImage(images[activeSlideIndex]);
  }, [activeSlideIndex, images]);

  useEffect(() => {
    if (isDescriptionOpen && closeInfoButtonRef.current) {
      closeInfoButtonRef.current.focus();
    }
    if (!isDescriptionOpen && infoButtonRef.current) {
      infoButtonRef.current.focus();
    }
  }, [isDescriptionOpen, infoButtonRef, closeInfoButtonRef]);

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
          <span className={globalStyles.visuallyHidden}>Previous image</span>
          <i className='fas fa-chevron-left' aria-hidden='true' />
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
          <span className={globalStyles.visuallyHidden}>Next image</span>
          <i className='fas fa-chevron-right' aria-hidden='true' />
        </button>
      </div>
      {isDescriptionOpen && (
        <div
          className={`${projectStyle.description} ${projectStyle.popoverDescription}`}
          id='description-popover'
          aria-describedby='open-description'
        >
          <div>
            <h2 className={projectStyle.descriptionTitle}>{imageTitle}</h2>
            <ReactMarkdown source={description} />
          </div>
          <button
            className={projectStyle.iconButton}
            onClick={() => setIsDescriptionOpen(false)}
            ref={closeInfoButtonRef}
          >
            <span className={globalStyles.visuallyHidden}>
              Close description
            </span>
            <i className='fas fa-times' aria-hidden='true' />
          </button>
        </div>
      )}
      {!isDescriptionOpen && (
        <button
          ref={infoButtonRef}
          onClick={() => setIsDescriptionOpen(true)}
          className={`${projectStyle.infoButton} ${projectStyle.iconButton}`}
        >
          <span className={globalStyles.visuallyHidden} id='open-description'>
            Image information
          </span>
          <i className='fas fa-info-circle' aria-hidden='true' />
        </button>
      )}
      <div
        className={`${projectStyle.staticDescription} ${projectStyle.description}`}
      >
        <h2 className={projectStyle.descriptionTitle}>{imageTitle}</h2>
        <ReactMarkdown source={description} />
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
          seoKeywords
          images {
            altText
            description
            imageTitle
            image {
              publicURL
            }
          }
          socialImage {
            publicURL
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

export default ProjectPage;
