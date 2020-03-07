import React from 'react';
import { IndexPageTemplate } from '../../templates/index-page';

const IndexPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return (
      <IndexPageTemplate
        headerLogoUrl={data.headerLogo}
        socialLinks={data.socialLinks}
      />
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default IndexPagePreview;
