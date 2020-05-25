import React from 'react';
import { AboutPageTemplate } from '../../templates/about-page';

const AboutPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return <AboutPageTemplate content={data.content} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default AboutPagePreview;
