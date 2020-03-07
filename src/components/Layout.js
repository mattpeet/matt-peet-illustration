import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from './SiteMetadata';
import { withPrefix } from 'gatsby';
import './global.module.css';

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <script
          src='https://kit.fontawesome.com/fabea7ee8e.js'
          crossorigin='anonymous'
        ></script>
        <meta name='description' content={description} />
        <meta name='theme-color' content='#fff' />
        <meta property='og:type' content='business.business' />
        <meta property='og:title' content={title} />
        <meta property='og:url' content='/' />
        <meta
          property='og:image'
          content={`${withPrefix('/')}img/og-image.jpg`}
        />
      </Helmet>
      {children}
    </>
  );
};

export default TemplateWrapper;
