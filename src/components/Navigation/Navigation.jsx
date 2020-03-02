import React from 'react';
import { Link } from 'gatsby';
import navigationStyle from './navigation.module.css';

export default function Navigation() {
  return (
    <nav>
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
  );
}
