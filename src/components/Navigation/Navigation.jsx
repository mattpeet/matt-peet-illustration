import React from 'react';
import { Link } from 'gatsby';
import navigationStyle from './navigation.module.css';
import globalStyle from '../global.module.css';

export default function Navigation({ socialLinks }) {
  const socialListItems = socialLinks.map((x, index) => {
    const key = `social-link-${index}`;
    return (
      <li key={key}>
        <a href={x.url}>
          <span className={globalStyle.visuallyHidden}>{x.description}</span>
          <i className={x.faIcon} />
        </a>
      </li>
    );
  });

  return (
    <>
      <nav aria-labelledby='social-nav-label'>
        <span id='social-nav-label' className={globalStyle.visuallyHidden}>
          Social
        </span>
        <ul
          className={`${navigationStyle.navList} ${navigationStyle.socialLinkList}`}
        >
          {socialListItems}
        </ul>
      </nav>
      <nav aria-labelledby='main-nav-label'>
        <span id='main-nav-label' className={globalStyle.visuallyHidden}>
          Main
        </span>
        <ul className={navigationStyle.navList}>
          <li className={navigationStyle.largeNavLink}>
            <Link to='/'>projects</Link>
          </li>
          <li>
            <Link to='/about'>about</Link>
          </li>
          <li>
            <Link to='/contact'>contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
