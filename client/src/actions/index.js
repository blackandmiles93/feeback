import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//action creator
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data }); // return the res.data instead since we only need the user data
};

// async function for retrieving stripe token with user data
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

// action creator for retrieving list of surveys
export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};
