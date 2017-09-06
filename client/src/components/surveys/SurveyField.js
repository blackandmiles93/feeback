//SurveyField contains rendering logic for a single label and text input
import React from 'react';
// the input is the props.input
//the ...input below essentially grabs all of the event handlers given by redux-form without you having to specify which
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
