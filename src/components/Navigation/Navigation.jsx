import React from 'react';
import { Link } from 'gatsby';
import navigationStyle from './navigation.module.css';
import globalStyle from '../global.module.css';

const socialLinkData = [
  {
    iconClassName: 'fab fa-instagram',
    description: 'Instagram',
    url: 'http://instagram.com/m_r_peet'
  }
];

export default function Navigation() {
  return (
    <>
      <nav aria-labelledby='social-nav-label'>
        <span id='social-nav-label' className={globalStyle.visuallyHidden}>
          Social
        </span>
        <ul className={navigationStyle.navList}>
          <li>
            <a href='http://instagram.com/m_r_peet'>
              <span className={globalStyle.visuallyHidden}>Instagram</span>
              <i className='fab fa-instagram' />
            </a>
          </li>
          <li>
            <a href='http://twitter.com/m_r_peet'>
              <span className={globalStyle.visuallyHidden}>Twitter</span>
              <i className='fab fa-twitter' />
            </a>
          </li>
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
