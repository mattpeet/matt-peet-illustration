import React from 'react';
import { ContactPageTemplate } from '../../templates/contact-page';

const ContactPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return <ContactPageTemplate contactLinks={data.contactLinks} />;
  } else {
    return <div>Loading...</div>;
  }
};

export default ContactPagePreview;
