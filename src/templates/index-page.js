import React from "react";
import Layout from "../components/Layout/Layout";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import indexStyle from "./index.module.css";
import globalStyles from "../components/global.module.css";

const getProjectListItems = (projectData) =>
  projectData.map((x, index) => {
    const key = `project-thumb-${index}`;
    const thumbnail = getImage(x.frontmatter.thumbnail);
    return (
      <li key={key} className={indexStyle.thumbListItem}>
        <Link to={x.fields.slug}>
          <GatsbyImage
            className={indexStyle.thumbnail}
            image={thumbnail}
            alt=""
          />
          <div className={indexStyle.thumbnailOverlay}>
            <p>{x.frontmatter.thumbnailTitle}</p>
          </div>
        </Link>
      </li>
    );
  });

export const IndexPageTemplate = ({ projectData = [] }) => {
  return (
    <main>
      <h1 className={globalStyles.visuallyHidden}>Projects</h1>
      <ul className={indexStyle.thumbnailGridList} id="thumbnails">
        {getProjectListItems(projectData)}
      </ul>
    </main>
  );
};

const IndexPage = ({ data }) => {
  const { home = {}, projects = {} } = data || {};
  const projectData = projects.nodes || [];
  const { frontmatter: homeDetail = {} } = home.nodes[0];
  const { headerLogo, socialLinks } = homeDetail;
  return (
    <Layout headerLogoUrl={headerLogo.publicURL} socialLinks={socialLinks}>
      <IndexPageTemplate projectData={projectData} />
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
            childImageSharp {
              gatsbyImageData(placeholder: DOMINANT_COLOR)
            }
          }
          thumbnailTitle
        }
        fields {
          slug
        }
      }
    }
  }
`;
