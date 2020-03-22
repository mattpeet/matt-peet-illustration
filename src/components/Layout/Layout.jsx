import React from 'react';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import useSiteMetadata from '../SiteMetadata';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import globalStyles from '../global.module.css';

export default function Layout({ children, socialLinks, headerLogoUrl }) {
  const { title, description } = useSiteMetadata();
  const currentYear = new Date().getFullYear();
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
      <div className={globalStyles.containerGrid}>
        <div>
          <Header logoSrc={headerLogoUrl} id='header' />
          <Navigation socialLinks={socialLinks} id='navigation' />
        </div>
        {children}
      </div>
      <footer className={globalStyles.footer} id='footer'>
        <p>&copy; {currentYear} Matt Peet</p>
      </footer>
    </>
  );
}
