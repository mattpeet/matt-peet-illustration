import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout/Layout';
import globalStyles from '../components/global.module.css';
import contactStyles from './contact.module.css';

export const ContactPageTemplate = ({ contactLinks = [] }) => {
  const contactListItems = contactLinks.map((link, index) => {
    const { description, visibleText, url, faIcon } = link;
    const key = `contact-link-${index}`;

    return (
      <li key={key} className={contactStyles.contactListItem}>
        <Link to={url} aria-hidden='true' className={contactStyles.iconLink}>
          <i aria-hidden='true' className={`${faIcon} ${contactStyles.icon}`} />
        </Link>
        <Link to={url} aria-label={description}>
          {visibleText}
        </Link>
      </li>
    );
  });

  return (
    <main className={contactStyles.wrapper}>
      <h1 className={globalStyles.visuallyHidden}>Contact</h1>
      <ul className={contactStyles.contactList}>{contactListItems}</ul>
    </main>
  );
};

const ContactPage = ({ data = {} }) => {
  const { contact = { nodes: [] }, home = { nodes: [] } } = data;
  const { frontmatter: homeDetail = {} } = home.nodes[0];
  const { headerLogo, socialLinks } = homeDetail;

  const { frontmatter = {} } = contact.nodes[0];

  return (
    <Layout headerLogoUrl={headerLogo.publicURL} socialLinks={socialLinks}>
      <ContactPageTemplate contactLinks={frontmatter.contactLinks} />
    </Layout>
  );
};

export default ContactPage;

export const contactPageQuery = graphql`
  query ContactPage($id: String!) {
    contact: allMarkdownRemark(filter: { id: { eq: $id } }) {
      nodes {
        frontmatter {
          contactLinks {
            description
            visibleText
            faIcon
            url
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
