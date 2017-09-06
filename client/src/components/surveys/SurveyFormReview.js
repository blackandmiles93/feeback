//SurveyFormReview shows users their form for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const fieldReview = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>
          {label}
        </label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm the survey.</h5>
      {fieldReview}
      <button
        className="yellow darken-3 btn-flat white-text"
        onClick={onCancel}
      >
        Back
        <i className="material-icons left">arrow_back</i>
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="teal btn-flat right white-text"
      >
        Send Survey
        <i className="material-icons right">send</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
