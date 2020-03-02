import React from 'react';
import { Link } from 'gatsby'

export default function Header(){
  return (
    <header>
      <Link to='/'>
        <img
          src='./../src/img/LOGO/MattPeetLOGO-500x116px.png'
          id='headerImage'
        />
      </Link>
    </header>
  );
}