import React from 'react';
import { Link } from 'gatsby';
import headerStyle from './header.module.css';

export default function Header({ logoSrc }) {
  return (
    <header>
      <Link to='/'>
        <img className={headerStyle.headerImage} src={logoSrc} alt="Home" />
      </Link>
    </header>
  );
}
