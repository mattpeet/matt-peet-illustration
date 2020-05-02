import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'gatsby';
import navigationStyle from './navigation.module.css';
import globalStyle from '../global.module.css';

export default function Navigation({ socialLinks }) {
  const dropdownButtonRef = useRef(null);
  const dropdownListRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const wrapKeyHandler = (event) => {
    if (event.key === 'Escape' && isDropdownOpen) {
      setIsDropdownOpen(false);
      dropdownButtonRef.current.focus();
    }
  };

  const dropdownButtonClickHandler = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const clickOutsideDropdownHandler = (event) => {
    const { target } = event;
    if (
      dropdownListRef.current.contains(target) ||
      dropdownButtonRef.current.contains(target)
    ) {
      return;
    }
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mouseup', clickOutsideDropdownHandler);
      dropdownListRef.current.querySelector('a').focus();
    } else {
      document.removeEventListener('mouseup', clickOutsideDropdownHandler);
    }

    return () => {
      document.removeEventListener('mouseup', clickOutsideDropdownHandler);
    };
  }, [isDropdownOpen]);

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
      <div className={navigationStyle.topLevelNavRow}>
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
        <div className={navigationStyle.dropdownWrap} onKeyUp={wrapKeyHandler}>
          <button
            ref={dropdownButtonRef}
            className={navigationStyle.dropdownButton}
            aria-haspopup='true'
            aria-controls='navigation-dropdown'
            onClick={dropdownButtonClickHandler}
          >
            <span className={globalStyle.visuallyHidden}>
              Open main navigation
            </span>
            <i className='fas fa-bars' aria-hidden='true' />
          </button>
          <nav aria-labelledby='main-nav-label'>
            <span id='main-nav-label' className={globalStyle.visuallyHidden}>
              Main
            </span>
            <ul
              id='navigation-dropdown'
              ref={dropdownListRef}
              className={`${navigationStyle.dropdownList} ${
                isDropdownOpen
                  ? navigationStyle.dropdownOpen
                  : navigationStyle.dropdownClosed
              }`}
            >
              <li>
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
        </div>
      </div>
      <nav
        aria-labelledby='main-nav-label'
        className={navigationStyle.sideNavigation}
      >
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
